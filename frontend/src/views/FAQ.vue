<template>
  <!--  sm:py-24-->
  <div class="lg:pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pixelated">
    <div class="max-w-2xl lg:mx-auto lg:text-center">
      <h2
        class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl pixelated"
      >
        Frequently Asked Questions
      </h2>
    </div>
    <div class="mt-20">
      <dl
        class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10"
      >
        <SlideFadeDownContainer>
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Can I connect multiple MetaMask wallets?
            </dt>
            <dd class="mt-3 text-gray-300">
              Yes, you can connect as many wallets as you want. However, note
              that
              <span class="highlighted"
                >you can only mint one NFT per wallet</span
              >
              to somewhat ensure that CryptoCocks are distributed fairly.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer>
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Can I connect some other wallet?
            </dt>
            <dd class="mt-3 text-gray-300">
              No, for now, only MetaMask is supported.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.1">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How are cock lengths calculated?
            </dt>
            <dd class="mt-3 text-gray-300">
              There are <span class="highlighted">10 different lengths</span>.
              When minting, we compare your wallet with that of all other
              minters. Depending on where you score on the scoreboard and in
              which <span class="highlighted">percentile</span> you fall into,
              you get one out of the 10 possible cock lengths. For example, if
              at the time of minting your CryptoCock NFT you have more Ether in
              your account than 80% of all minters who have minted a cock before
              at the time they have minted their CryptoCock, then you will
              receive a cock of length 8 out of 10. This means
              <span class="highlighted"
                >it is easier to mint a larger cock the earlier you start
                minting</span
              >.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.1">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              What features do you have?
            </dt>
            <dd class="mt-3 text-gray-300">
              CryptoCocks come in a variety of forms and shapes like piercings,
              condoms and cumshots. Some cocks have
              <span class="highlighted"
                >unique features like laser bursts, flames, holy aura, slime,
                cobwebs with a tiny spidey for the incels and a halo</span
              >
              for the virgins out there. There is even a “boner” out there!
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.2">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              What is the total NFT supply?
            </dt>
            <dd class="mt-3 text-gray-300">
              In total, only
              <span class="highlighted">10,000 CryptoCocks NFTs</span> to be
              minted. First cum, first serve!
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.2">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              When will be the pre-sale?
            </dt>
            <dd class="mt-3 text-gray-300">
              The pre-sale will kickoff at
              <span class="highlighted">14st of February</span> and will last
              for one week.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.3">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              When is the public launch?
            </dt>
            <dd class="mt-3 text-gray-300">
              The public launch will be
              <span class="highlighted">21th of February in 2022</span>.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.3">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Which communities can participate in the pre-sale vote?
            </dt>
            <dd class="mt-3 text-gray-300">
              Seven competing communities:
              <span class="highlighted"
                >CyberKongz, NeoTokyo, LobsterDAO, DuckDAO, Kryptonauten and
                DAOMaker</span
              >
              will get the chance to vote for their community on this voting
              page. The winners will have the opportunity to mint cocks before
              public launch around end of December.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.4">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Which advantages do voters have?
            </dt>
            <dd class="mt-3 text-gray-300">
              The advantage for the most voted communities is to
              <span class="highlighted"
                >avoid gas wars, be early and hence have it easier to mint a
                large cock</span
              >, to drive demand in each community's token and eventually
              <span class="highlighted"
                >earning revenue shares for the DAOs of the communities</span
              >
              with the most votes.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.4">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How is the allocation of pre-sale slots divided between
              communities in the vote?
            </dt>
            <dd class="mt-3 text-gray-300">
              <div class="text-md">
                <div>
                  <ol class="list-inside list-decimal">
                    <li class="highlighted">
                      <span class="text-gray-300">400 slots</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">250 slots</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">150 slots</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">100 slots</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">50 slots</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"> 20 slots</span>
                    </li>
                  </ol>
                </div>
              </div>
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.5">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How is the allocation of pre-sale revenue shares divided between
              communities in the vote?
            </dt>
            <dd class="mt-3 text-gray-300">
              <div class="text-md">
                <div>
                  <ol class="list-inside list-decimal">
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >10% of all primary market sales</span
                      >
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >5% of all primary market sales</span
                      >
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >3% of all primary market sales</span
                      >
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >2% of all primary market sales</span
                      >
                    </li>
                  </ol>
                </div>
              </div>
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.5">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Which tokens and in which quantity do you have to hold for the
              pre-sale?
            </dt>
            <dd class="mt-3 text-gray-300">
              <div class="text-md">
                <div>
                  <ol class="list-inside list-decimal">
                    <li class="highlighted">
                      <span class="text-gray-300">DuckDao / $DDIM: 29</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >NeoTokyo / NeoTokyo NFT: 1</span
                      >
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">Kryptonauten / NFT: 1</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">CyberKongz / $KONGZ: 1</span>
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300"
                        >LobsterDAO / LobsterDAO NFT: 1</span
                      >
                    </li>
                    <li class="highlighted">
                      <span class="text-gray-300">DAOMaker / $DAO: 260</span>
                    </li>
                  </ol>
                </div>
              </div>
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.6">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How is the price of minting a cock calculated?
            </dt>
            <dd class="mt-3 text-gray-300">
              To allow fair pricing depending on your Ethereum wealth
              <span class="highlighted"
                >we charge 1% of your current wallet balance</span
              >. If you want to pay less, you might want to send part of your
              funds to a new wallet and decrease the costs. We have a
              <span class="highlighted">minimum charge of ETH 0.02 (~$85)</span>
              for those with low balances.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.6">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How do we offset the CO2 produced during minting?
            </dt>
            <dd class="mt-3 text-gray-300">
              In order to overcompensate the project's CO2 emissions, we raise
              money for the reforestation project
              <a class="underline text-blueish italic" href="https://trees.org/"
                >Trees for the Future</a
              >
              via the crypto charity
              <a
                class="underline text-blueish italic"
                href="https://thegivingblock.com/donate/trees-for-the-future/"
                >The Giving Block</a
              >.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.7">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              How can I increase my size?
            </dt>
            <dd class="mt-3 text-gray-300">
              Come back with a new wallet if you already have one minted, and
              fill them with more Ether! Some smart apes out there might use
              (flash) loans to show off with someone else’s supply.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.7">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              Why variable pricing?
            </dt>
            <dd class="mt-3 text-gray-300">
              For those that want to flex the most, like whales who want to have
              the largest cock, pricing should be different than for krills who
              just like the meme. Also, we think this way we can raise more
              funds for the reforestation project
              <a class="underline text-blueish italic" href="https://trees.org/"
                >Trees for the Future</a
              >
              if we can convince large ETH holders to participate.
              <span>You can always send a lower balance to a fresh wallet</span>
              and use it to mint for less.
            </dd>
          </div>
        </SlideFadeDownContainer>

        <SlideFadeDownContainer :delay="0.1">
          <div>
            <dt class="font-semibold" style="color: #701fe8">
              What terms and conditions do apply to the minting a cock and to
              the sale?
            </dt>
            <dd class="mt-3 text-gray-300">
              You can check our terms and conditions
              <router-link class="underline text-blueish italic" to="/terms"
                >here</router-link
              >. Have fun!
            </dd>
          </div>
        </SlideFadeDownContainer>
      </dl>
    </div>
  </div>
</template>
<script>
import SlideFadeDownContainer from "@/components/singles/SlideFadeDownContainer";
export default {
  components: { SlideFadeDownContainer },
};
</script>
