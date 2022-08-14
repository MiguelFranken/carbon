<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="captcha" v-if="noRobotConfirm">
        <p class="captcha-header">
          Please click each image that does not contain a cock:
        </p>
        <div class="flex justify-center items-center w-full">
          <div class="grid grid-cols-2 relative">
            <div
              class="flex justify-center"
              v-for="img in captchaImages"
              :key="img.id"
            >
              <CryptoImage
                :src="img.src"
                imgClass="captcha-img nes-pointer rounded-md"
                alt="Gallery"
                @click="evaluateChoice(img)"
              />
            </div>
          </div>
        </div>
        <img
          src="/landing/captcha/refresh.png"
          class="captcha-repeat nes-pointer"
          @click="refreshImages"
        />
      </div>
      <div class="captcha pre-confirm flex items-center" v-else>
        <div class="pre-confirm-check nes-pointer" @click="confirmNoRobot">
          <div class="pulse-circle" v-if="pulse"></div>
        </div>
        <span>I'm not a Robot</span>
        <span class="tm">CockCaptcha©</span>
      </div>
    </transition>
  </div>
</template>
<script>
import CryptoImage from "@/components/globals/CryptoImage";
export default {
  data() {
    return {
      captchaImages: [],
      pulse: false,
      noRobotConfirm: false,
    };
  },
  components: {
    CryptoImage,
  },
  watch: {
    captchaImages: {
      deep: true,
      handler() {
        const done =
          this.captchaImages.filter((obj) => obj.type === "nonCock").length ===
          0;
        if (this.captchaImages.length && done) {
          this.$emit("validated");
        }
      },
    },
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
    shuffleImages() {
      this.captchaImages = this.captchaImages.sort(() => Math.random() - 0.5);
    },
    confirmNoRobot() {
      this.pulse = true;
      setTimeout(() => {
        this.noRobotConfirm = true;
      }, 700);
    },
    generateCaptchaImages() {
      this.captchaImages = [];
      const cocks = this.getRandomInt(4, 6);
      const nonCocks = 8 - cocks;

      for (var i = 0; i < cocks; i++) {
        let rand = this.getRandomInt(1, 24);
        let randCock = rand < 10 ? `0${rand}` : rand;
        this.captchaImages.push({
          id: `c${this.getRandomInt(0, 1000000)}`,
          src: `/landing/cock-gallery/${randCock}.png`,
          type: "cock",
        });
      }

      for (var u = 0; u < nonCocks; u++) {
        let randNonCock = this.getRandomInt(1, 9);
        this.captchaImages.push({
          id: `n${this.getRandomInt(0, 1000000)}`,
          src: `/landing/captcha/${randNonCock}.png`,
          type: "nonCock",
        });
      }

      this.shuffleImages();
    },
    refreshImages() {
      this.captchaImages.forEach((imgObj) => {
        let rand = this.getRandomInt(1, 24);
        let randCock = rand < 10 ? `0${rand}` : rand;
        if (imgObj.type === "cock") {
          imgObj.src = `/landing/cock-gallery/${randCock}.png`;
        }
      });
      this.shuffleImages();
    },
    evaluateChoice(obj) {
      if (obj.type === "nonCock") {
        let rand = this.getRandomInt(1, 24);
        let randCock = rand < 10 ? `0${rand}` : rand;
        const index = this.captchaImages.indexOf(obj);
        this.captchaImages[index].src = `/landing/cock-gallery/${randCock}.png`;
        this.captchaImages[index].type = "cock";
        // this.captchaImages[index] = {
        //   id: `c${this.getRandomInt(0,1000000)}`,
        //   src: `/landing/cock-gallery/${randCock}.png`,
        //   type: "cock",
        // }
      } else {
        this.shuffleImages();
      }
    },
  },
  mounted() {
    this.generateCaptchaImages();
  },
};
</script>
<style>
.captcha {
  background-color: #fafafa;
  border: 1px solid #94a3b8;
  margin: 0 auto;
  max-width: 400px;
  border-radius: 5px;
  margin-top: 25px;
}

.pre-confirm {
  min-height: 90px;
  color: #212529;
}

.pre-confirm-check {
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-style: solid;
  border-color: #919191;
  border-radius: 5px;
  background-color: transparent;
  margin: 0 15px;
}

.captcha-img {
  width: 75%;
  margin: 10px;
}

.captcha-header {
  color: #212529;
  text-align: center;
  margin: 20px 0;
}

.captcha-repeat {
  margin: 10px auto;
  width: 70px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tm {
  font-size: 40%;
  text-align: right;
  align-self: flex-end;
}

.pulse-circle {
  background: transparent;
  border-radius: 50%;
  margin: 8px;
  height: 20px;
  width: 20px;
  box-shadow: 0 0 0 0 rgb(112 31 232);
  transform: scale(1);
  -webkit-animation: pulse-circle 0.4s infinite;
  animation: pulse-circle 1s infinite;
}

@keyframes pulse-circle {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(112, 31, 232, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(112, 31, 232, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(112, 31, 232, 0);
  }
}
</style>
