<template>
  <!--  class="pointer-events-none"-->
  <div aria-hidden="true">
    <div class="grid grid-cols-3 gap-x-8 h-full">
      <div class="flex items-center w-full">
        <div class="h-full w-full flex justify-center flex-col space-y-8">
          <BounceContainer :delay="0.1">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/1.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.2">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/2.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.3">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/3.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.4">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/4.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
        </div>
      </div>
      <div class="flex items-center w-full">
        <div class="h-full w-full flex justify-center flex-col space-y-8">
          <BounceContainer>
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/16.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.1">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/6.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.2">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/12.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.3">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/14.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.4">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/24.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
        </div>
      </div>
      <div class="flex items-center w-full">
        <div class="h-full w-full flex justify-center flex-col space-y-8">
          <BounceContainer :delay="0.1">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/17.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.2">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/21.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.3">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/20.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
          <BounceContainer :delay="0.4">
            <div class="cock-image">
              <img
                src="/landing/cock-gallery/23.svg"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>
          </BounceContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BounceContainer from "@/components/singles/BounceContainer";
export default {
  name: "MintImages",
  components: { BounceContainer },
};
</script>

<style scoped>
.cock-image {
  /*@apply w-64 h-44 rounded-lg overflow-hidden;*/
  @apply w-full aspect-w-10 aspect-h-5 rounded-md overflow-hidden;
}
</style>
