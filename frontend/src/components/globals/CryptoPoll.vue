<template>
  <div class="flex justify-center items-center w-full mt-6">
    <div class="crypto-poll">
      <h1 class="pixelated uppercase text-2xl text-white animate-pulse">
        {{ question }}
      </h1>
      <transition name="fade" mode="out-in">
        <div class="answer-content" v-if="!showCaptcha">
          <div
            v-for="(a, index) in calcAnswers"
            :key="index"
            :class="{ answer: true, [a.custom_class]: a.custom_class }"
          >
            <template v-if="!finalResults">
              <div
                v-if="!visibleResults"
                class="nes-pointer"
                :class="{ 'answer-no-vote noselect': true, active: a.selected }"
                @click.prevent="handleVote(a)"
              >
                <span>{{ a.text }}</span>
              </div>
              <div
                v-else
                :class="{ 'answer-voted': true, selected: a.selected }"
              >
                <span v-if="a.percent" class="percent">{{ a.percent }}</span>
                <span class="txt">{{ a.text }}</span>
              </div>

              <span
                class="bg"
                :style="{ width: visibleResults ? a.percent : '0%' }"
              ></span>
            </template>
            <template v-else>
              <div class="answer-voted final">
                <span v-if="a.percent" class="percent">{{ a.percent }}</span>
                <span class="txt">{{ a.text }}</span>
              </div>
              <span
                :class="{ bg: true, selected: mostVotes == a.votes }"
                :style="{ width: a.percent }"
              ></span>
            </template>
          </div>
          <div
            class="votes"
            v-if="showTotalVotes && (visibleResults || finalResults)"
          >
            {{ totalVotesFormatted + " votes" }}
          </div>
        </div>
        <CryptoCaptcha @validated="sendFormData" v-else />
      </transition>
    </div>
  </div>
</template>

<script>
import CryptoCaptcha from "@/components/globals/CryptoCaptcha";

export default {
  name: "CryptoPoll",
  components: {
    CryptoCaptcha,
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    showResults: {
      type: Boolean,
      default: false,
    },
    showTotalVotes: {
      type: Boolean,
      default: true,
    },
    finalResults: {
      type: Boolean,
      default: false,
    },
    gFormEntryId: {
      type: String,
      required: true,
    },
    gFormUrl: {
      type: String,
      required: true,
    },
    gFormUniqueIdEntry: {
      type: String,
      required: true,
    },
    gFormUniqueId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visibleResults: false,
      showCaptcha: false,
      formData: null,
    };
  },
  computed: {
    totalVotes() {
      let totalVotes = 0;
      this.answers.filter((a) => {
        if (!isNaN(a.votes) && a.votes > 0) totalVotes += parseInt(a.votes);
      });
      return totalVotes;
    },
    totalVotesFormatted() {
      return this.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    mostVotes() {
      let max = 0;
      this.answers.filter((a) => {
        if (!isNaN(a.votes) && a.votes > 0 && a.votes >= max) max = a.votes;
      });

      return max;
    },
    calcAnswers() {
      if (this.totalVotes === 0)
        return this.answers.map((a) => {
          a.percent = "0%";
          return a;
        });

      return this.answers.filter((a) => {
        if (!isNaN(a.votes) && a.votes > 0)
          a.percent =
            Math.round((parseInt(a.votes) / this.totalVotes) * 100) + "%";
        else a.percent = "0%";

        return a;
      });
    },
    totalSelections() {
      return this.calcAnswers.filter((a) => a.selected).length;
    },
  },
  methods: {
    handleVote(a) {
      a.votes++;
      a.selected = true;
      this.visibleResults = true;
      this.$emit("addvote", {
        value: a.value,
        votes: a.votes,
        totalVotes: this.totalVotes,
      });

      this.formData = new FormData();
      this.formData.append(this.gFormEntryId, a.value);
      this.formData.append(this.gFormUniqueIdEntry, this.gFormUniqueId);
      this.showCaptcha = true;
    },
    sendFormData() {
      let request = new XMLHttpRequest();
      request.open("POST", this.gFormUrl, true);
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      request.send(this.formData);
      event.preventDefault();
      localStorage.setItem("PreSaleVote", true);
      this.showCaptcha = false;
    },
  },
};
</script>

<style>
.crypto-poll {
  padding-top: 50px;
}

.crypto-poll .noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.crypto-poll .answer-content {
  margin: 20px auto;
  max-width: 500px;
}
.crypto-poll .answer-content .answer {
  position: relative;
  margin-top: 10px;
}
.crypto-poll .answer-content .answer:first-child {
  margin-top: 0;
}

.crypto-poll .answer-content .answer-no-vote {
  color: #fff;
  background-color: #b296cd;
  text-align: center;
  border: 2px solid #b296cd;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 0;
  transition: background 0.2s ease-in-out;
  -webkit-transition: background 0.2s ease-in-out;
  -moz-transition: background 0.2s ease-in-out;
}

.answer-no-vote:hover {
  filter: brightness(90%);
}

.crypto-poll .answer-content .answer-no-vote .txt {
  color: #b296cd;
  transition: color 0.2s ease-in-out;
  -webkit-transition: color 0.2s ease-in-out;
  -moz-transition: color 0.2s ease-in-out;
}

.crypto-poll .answer-content .answer-no-vote.active {
  background: #b296cd;
}

.crypto-poll .answer-content .answer-no-vote.active .txt {
  color: #b296cd;
}

.crypto-poll .answer-content .answer-voted {
  padding: 5px 0;
}

.crypto-poll .answer-content .answer-voted .percent,
.crypto-poll .answer-content .answer-voted .txt {
  position: relative;
  z-index: 1;
}
.crypto-poll .answer-content .answer-voted .percent {
  font-weight: bold;
  min-width: 51px;
  display: inline-block;
  margin: 0 10px;
}

.crypto-poll .answer-content .answer .bg {
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #b296cd;
  border-top-radius: 5px;
  border-radius: 5px;
  transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -webkit-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -moz-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
}

.crypto-poll .answer-content .answer .bg.selected {
  background-color: #b296cd;
}

.crypto-poll .votes {
  font-size: 14px;
  color: #8899a6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
