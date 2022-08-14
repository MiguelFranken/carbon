<template>
  <div v-if="!isLoading && decentiles && decentiles.length > 0">
    <div class="pixelated w-full mt-5">
      <table class="mx-0 px-0 w-full">
        <tr>
          <th>Size</th>
          <th class="pl-4">Balance</th>
          <th class="pl-4">No. NFTs</th>
        </tr>
        <tr
          v-for="decentile in decentiles"
          :key="decentile.rank"
          class="text-sm"
        >
          <td>{{ decentile.rank * 10 }}%</td>
          <td class="pl-4">
            {{ toEth(decentile.min) }}Ξ - {{ toEth(decentile.max) }}Ξ
          </td>
          <td class="pl-4">
            {{ computedCounts[decentile.rank] }}x
            <span v-if="decentile.rank === '10'"
              >({{ computedCounts[11] }}x)</span
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div v-if="isLoading" class="pt-4 highlighted">
    Loading balance intervals...
  </div>
</template>
<script>
import useDecentiles from "@/modules/decentiles";
import { mapGetters } from "vuex";
import { computed, onMounted, ref } from "vue";

const BN = require("bn.js");

export default {
  name: "LeaderboardTable",

  computed: {
    ...mapGetters("accounts", ["getWeb3"]),
  },

  methods: {
    toEth(wei) {
      const split = this.getWeb3.utils.fromWei(wei, "ether").split(".");
      return split.length > 1
        ? `${split[0]}.${split[1].substr(0, 4)}`
        : split[0];
    },
  },

  setup() {
    const {
      getDecentiles,
      fetchCountPerSize,
      counts,
      isLoading,
    } = useDecentiles();
    const decentiles = ref([]);
    fetchCountPerSize();

    const computedCounts = computed(() => {
      let values = {};
      if (counts.value) {
        for (let i = 1; i <= 11; i++) {
          const count = counts.value.find((count) => count.size === i);
          if (count) {
            if (i === 11) {
              values[10] =
                values[10] > 0 ? values[10] + +count.count : +count.count;
            }
            values[i] =
              values[i] > 0 ? values[10] + +count.count : +count.count;
          } else {
            values[i] = 0;
          }
        }
        return values;
      }
      return null;
    });

    onMounted(async () => {
      const data = await getDecentiles();
      if (data.length === 10) {
        decentiles.value = data.reverse();
      } else {
        decentiles.value = data.reverse().map((decentile, index) => {
          decentile.rank = 10 - index;
          return decentile;
        });
      }

      decentiles.value = decentiles.value.map((decentile, index) => {
        if (index < 9) {
          const value = decentiles.value[index];
          const max = value.max;
          const maxBn = new BN(max);
          decentile.min = maxBn.add(new BN("100000000000000"));
        }
        return decentile;
      });
    });

    return {
      decentiles,
      computedCounts,
      isLoading,
    };
  },
};
</script>

<style scoped>
table {
  color: white;
  border-collapse: collapse;
  margin: 0 auto;
}

th,
td {
  /*padding: 0 15px;*/
  text-align: left;
}

th {
  border-bottom: 1pt solid white;
}
</style>
