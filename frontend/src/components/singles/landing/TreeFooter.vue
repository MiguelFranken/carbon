<template>
  <div>
    <div class="relative mx-auto px-4 pb-20">
      <CryptoSectionCentered
        title="diamonds for the rainforest"
        subtitle='30% of all primary market sales will be donated to "Trees for the
      Future"'
      >
        Storing and verifying your diamond size on-chain consumes a lot of
        energy, therefore 30% of all primary market sales will be donated to the
        <a
          class="underline text-blueish italic"
          href="https://trees.org/"
          target="_blank"
          >Trees for the Future</a
        >
        reforestation project via the crypto charity
        <a
          class="underline text-blueish italic"
          href="https://thegivingblock.com/donate/trees-for-the-future/"
          target="_blank"
          >The Giving Block</a
        >.
      </CryptoSectionCentered>
    </div>

    <div class="relative inset-0">
      <CryptoImage
        imgClass="tree w-full object-cover"
        src="/landing/trees.png"
        alt="Trees"
      />
      <div class="absolute inset-0" />
    </div>
  </div>
</template>

<script>
import CryptoSectionCentered from "@/components/landing/CryptoSectionCentered";
import CryptoImage from "@/components/globals/CryptoImage";
export default {
  name: "TreeFooter",
  components: {
    CryptoSectionCentered,
    CryptoImage,
  },
};
</script>

<style>
.tree {
  height: 30vh;
}

@media (min-width: 768px) {
  .tree {
    height: unset;
  }
}
</style>
