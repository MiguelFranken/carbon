<template>
  <CryptoContainer>
    <CryptoPoll v-bind="pollOptions" />
  </CryptoContainer>
</template>

<script>
import CryptoContainer from "@/components/globals/CryptoContainer";
import CryptoPoll from "@/components/globals/CryptoPoll";
import { encrypt } from "@/services/encrypt";

export default {
  name: "CryptoPollWrapper",
  components: {
    CryptoPoll,
    CryptoContainer,
  },
  data() {
    return {
      gSheetUrl:
        "https://sheet-sucker.herokuapp.com/1VwXzzHsKq58krIGiKR_8SHz2ytdPDjLJUhb2Kt_cGSA/sheet_one",
      pollOptions: {
        question: "Vote for your favorite crypto community:",
        answers: [
          { value: "DuckDAO", text: "DuckDAO", votes: 1 },
          { value: "RedKite", text: "RedKite", votes: 1 },
          { value: "Launchpool", text: "Launchpool", votes: 1 },
          { value: "NeoTokyo", text: "NeoTokyo", votes: 1 },
          { value: "CyberKongz", text: "CyberKongz", votes: 1 },
          { value: "LobsterDAO", text: "LobsterDAO", votes: 1 },
          { value: "DAOMaker", text: "DAOMaker", votes: 1 },
          { value: "Kryptonauten", text: "Kryptonauten", votes: 1 },
        ],
        finalResults: false,
        showResults: false,
        gFormEntryId: "entry.1942543329",
        gFormUniqueId: "",
        gFormUniqueIdEntry: "entry.520793072",
        gFormUrl:
          "https://cocks-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLSclehk0zqMD1vgz3qO8fO6XquxafYaQ7w-2OjzN6cmHP6o_SA/formResponse",
      },
    };
  },
  created() {
    this.pollOptions.finalResults = localStorage.getItem("PreSaleVote");
    fetch(this.gSheetUrl)
      .then((res) => res.json())
      .then((data) => {
        this.pollOptions.answers.map((answer) => {
          answer.votes = data.filter(
            (obj) => obj[this.pollOptions.question] === answer.value
          ).length;
          return answer;
        });

        fetch("https://api.ipify.org?format=json")
          .then((x) => x.json())
          .then(({ ip }) => {
            const encryptedIP = encrypt(process.env.VUE_APP_COCK_CID, ip);
            this.pollOptions.gFormUniqueId = encryptedIP;
            this.pollOptions.finalResults =
              data.filter((obj) => obj["UniqueId"] === encryptedIP).length > 0;
          });
      });
  },
};
</script>
