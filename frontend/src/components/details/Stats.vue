<template>
  <dl class="flex flex-wrap text-gray-200">
    <dt class="space-y-2 mr-12 mb-12" v-for="item in stats" :key="item.id">
      <div>{{ item.name }}</div>
      <div class="highlighted">{{ item.value }}</div>
    </dt>
  </dl>
</template>

<script>
const traitKeyMap = {
  background: "Background",
  type: "Type",
  ader: "Vein",
  hair: "Hair",
  eichel_piercing_type: "Eichel Piercing",
  eichel_piercing_color: "Eichel Piercing Color",
};

// value map
const traitValueMap = {
  // background: {
  //   blau: "Blue",
  // },
  // type: {
  //   orange: "Orange",
  // },
  // hair: {
  //   hairy: "Hairy",
  // },
  // eichel_piercing_type: {
  //   septum: "Septum",
  // },
  // eichel_piercing_color: {
  //   silver: "Silver",
  // },
};

export default {
  props: ["traits"],

  data() {
    return {
      stats: [],
    };
  },

  mounted() {
    const stats = [];

    const filterOut = ["length", "background_color", "color", "top"];
    Object.keys(this.traits)
      .filter((traitKey) => {
        return !filterOut.includes(traitKey);
      })
      .forEach((traitKey) => {
        if (traitKey !== "id") {
          const traitValue = this.traits[traitKey];

          stats.push({
            id: traitKey,
            trait: traitKey,
            name: this.getHumanReadableTraitKey(traitKey.toLowerCase()),
            value: this.getHumanReadableTraitValue(
              traitKey.toLowerCase(),
              traitValue.toLowerCase()
            ),
          });
        }
      });

    this.stats = this.mergeEichelRing(stats);
  },

  methods: {
    getHumanReadableTraitKey(traitKey) {
      if (traitKey in traitKeyMap) {
        return traitKeyMap[traitKey.toLowerCase()];
      } else {
        return traitKey
          .split("_")
          .map((str) => this.capitalizeFirstLetter(str))
          .join(" ");
      }
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getHumanReadableTraitValue(traitKey, traitValue) {
      if (traitKey === "length") {
        return `${traitValue}%`;
      }

      if (traitKey in traitValueMap) {
        if (traitValue in traitValueMap[traitKey]) {
          return traitValueMap[traitKey][traitValue];
        } else {
          return traitValue;
        }
      } else {
        return traitValue
          .split(" ")
          .map((str) => this.capitalizeFirstLetter(str))
          .join(" ");
      }
    },

    mergeGeneric(traitKey1, traitKey2, statsArray, transformer) {
      const stats = [...statsArray];
      const traitKey1Index = stats.findIndex(
        (stat) => stat.trait === traitKey1
      );

      const traitKey2Index = stats.findIndex(
        (stat) => stat.trait === traitKey2
      );

      if (traitKey1Index !== -1) {
        const eichel_piercing_type = stats[traitKey1Index].value;
        const eichel_piercing_color = stats[traitKey2Index].value;

        delete stats[traitKey1Index];
        delete stats[traitKey2Index];

        stats.push(transformer(eichel_piercing_type, eichel_piercing_color));
      }

      return stats.filter((trait) => trait !== undefined);
    },

    mergeEichelRing(array) {
      return this.mergeGeneric(
        "eichel_piercing_type",
        "eichel_piercing_color",
        array,
        (type, color) => ({
          id: "eichel_piercing",
          trait: "eichel_piercing",
          name: "Eichel Piercing",
          value: `${color} ${type}`,
        })
      );
    },
  },
};
</script>
