<script setup lang="ts">
import { ref } from "vue";
import { useEthers } from "vue-dapp";
import {
  LensClient,
  production,
  development,
  isRelayerResult,
} from "@lens-protocol/client";

const props = defineProps({
  show: Boolean,
});

const lensClient = new LensClient({
  environment: production,
});

enum Step {
  Intro,
  Follow,
  Claim,
  Success,
  Error,
}

const step = ref(Step.Intro);
const buttonDisabled = ref(false);
const emit = defineEmits(["close"]);
const { address, provider, signer } = useEthers();

const getDefaultLensProfile = async () => {
  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address.value],
    limit: 1,
  });
  try {
    return allOwnedProfiles.items[0];
  } catch (e) {
    return [];
  }
  // defaultProfile is a ProfileFragment
};

const lensLogin = async () => {
  const lensProfile = await getDefaultLensProfile();

  if (!lensProfile) {
    step.value = Step.Claim;
    return;
  }

  const challenge = await lensClient.authentication.generateChallenge(
    address.value
  );
  const signature = await signer.value.signMessage(challenge);
  await lensClient.authentication.authenticate(address.value, signature);
  step.value = Step.Follow;
};

const followOnLens = async () => {
  // request follow typed data
  const followTypedDataResult = await lensClient.profile.createFollowTypedData({
    follow: [
      {
        // raave id
        profile: "0x86b4",
      },
      {
        // radradio
        profile: "0x01c992",
      },
      // {
      //   profile: "0x7fc8",
      // },
      // {
      //   profile: "0x03",
      // },
    ],
  });

  // sign and broadcast the typed data
  const data = followTypedDataResult.unwrap();
  if (!signer.value || !address.value)
    throw new Error("Not connected to wallet");

  // sign with the wallet
  const signedTypedData = await signer.value._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcast({
    id: data.id,
    signature: signedTypedData,
  });

  // broadcastResult is a Result object
  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelayerResult(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    step.value = Step.Error;
    return;
  }

  console.log(
    `Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}`
  );

  step.value = Step.Success;
};

const clickCheers = () => {
  emit("close");
};
</script>

<template>
  <Transition>
    <div class="wrapper" v-if="props.show">
      <div class="background" v-if="props.show" @click="emit('close')"></div>
      <div id="modal">
        <div class="step" v-if="step === Step.Intro">
          <button :disabled="buttonDisabled" @click="lensLogin">Sign in with Lens</button>
        </div>
        <div class="step" v-if="step === Step.Follow">
          <h1>Follow rAAVE and RadRadio on Lens</h1>
          <p>If you do, you’ll be able to collect the recording of the livestream afterwards!</p>
          <button :disabled="buttonDisabled" @click="followOnLens">
            Follow
          </button>
        </div>
        <div class="step" v-if="step === Step.Claim">
          <h1>No handle found!</h1>
          <p>
            Claim a Lens handle at
            <a href="https://claim.lens.xyz/" target="_blank">claim.lens.xyz</a>
          </p>
          <button :disabled="buttonDisabled" @click="emit('close')">
            Close
          </button>
        </div>
        <div class="step" v-else-if="step === Step.Success">
          <h1>Success!</h1>
          <p>
            You have successfully followed rAAVE and RadRadio on Lens. You will
            be able to collect the recording of the livestream afterwards!
            <a
              href="https://lenster.xyz/?text=Watching%20live%20now!&url=https://rad.lol&via=MyCoolApp&hashtags=radRadio,rAAVE"
            >
              Share on Lens</a
            >
          </p>
          <button :disabled="buttonDisabled" @click="clickCheers">
            Cheers
          </button>
        </div>
        <div class="step" v-else-if="step === Step.Error">
          <h1>Something went wrong!</h1>
          <p>Please try again later</p>
          <button :disabled="buttonDisabled" @click="emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
*::selection {
  background: rgba(179, 255, 0, 0.75);
}

.wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 0.5s linear;
}

.v-leave-to #modal {
  transform: translateY(100vh) rotate(160deg);
}

.v-enter-from #modal {
  transform: translateY(100vh) rotate3d(1, 1, 1, 180deg);
}

.v-leave-to .background {
  opacity: 0;
}

.v-enter-from .background {
  opacity: 0;
}

.background {
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  transition: all 0.5s linear;
}

#modal {
  background-color: red;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.4), 0px 11px 26px rgba(0, 0, 0, 0.25),
    inset 0px -4px 30px rgba(0, 0, 0, 0.8);
  padding: 32px;
  width: calc(100vw - 16px);
  margin: 16px;
  max-width: 576px;
  border-radius: 48px;
  z-index: 10;
  transition: all 0.5s;
}

.step {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.step > h1 {
  font-size: 32px;
  font-feature-settings: "ss02" off;
}

.step > p {
  font-size: 18px;
  font-feature-settings: "ss02" off;
}

#donate-amount {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
}

#dai-label {
  margin-left: -120px;
}

button {
  display: block;
  padding: 8px 32px;
  font-size: 32px;
  color: red;
  background-color: white;
  border-radius: 45px;
}

button:disabled {
  color: white;
  border: white solid;
  background: transparent;
  cursor: not-allowed;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

input {
  color: white;
  padding: 8px;
  box-sizing: border-box;
  width: 110px;
  font-size: 32px;
  background: transparent;
  border: 1px solid;
  border-radius: 50px;
  padding: 8px 24px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input:focus {
  outline: none;
}

#nft-art {
  border-radius: 16px;
  transform: rotate(-5deg);
  box-shadow: 0px 1px 6px rgb(0 0 0 / 40%), 0px 11px 26px rgb(0 0 0 / 25%),
    inset 0px -4px 30px rgb(0 0 0 / 80%);
  margin-top: -120px;
}
</style>
