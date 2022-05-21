<script setup lang="ts">
import { BigNumber, Contract, ethers } from 'ethers';
import { markRaw, ref, watch } from 'vue';
import { useEthers, useWallet } from 'vue-dapp';

import daiAbi from '../eth/abis/Dai.abi.json';
import dripsTokenAbi from '../eth/abis/DripsToken.abi.json';

const props = defineProps({
  show: Boolean,
});

const COMMUNITY_CONTRACT_ADDRESS = '0x89eb58c8598d07f14852ad74e242187dbcbdf7ec';
const DAI_CONTRACT_ADDRESS = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea';

const emit = defineEmits(['close']);

enum Step {
  Intro,
  ERC20,
  SetAmount,
  ApproveContract,
  Mint,
}

const { status, disconnect, error, walletName } = useWallet()
const { address, balance, chainId, isActivated, provider, signer } = useEthers()

const step = ref(Step.Intro);
const buttonDisabled = ref(false);
const txPending = ref(false);
const donateAmount = ref<number>(5);

watch(props, (v) => {
  if (v.show === true) {
    step.value = Step.Intro;
  }
});

const checkAllowance = async (): Promise<BigNumber> => {
  if (!provider.value || !address.value) throw new Error("Not connected to wallet");
  const daiContract = markRaw(new Contract(DAI_CONTRACT_ADDRESS, daiAbi, provider.value));

  return await daiContract.allowance(address.value, COMMUNITY_CONTRACT_ADDRESS);
}

const approve = async () => {
  if (!signer.value || !address.value) throw new Error("Not connected to wallet");

  const daiContract = markRaw(new Contract(DAI_CONTRACT_ADDRESS, daiAbi, signer.value));
  const amount = ethers.constants.MaxUint256;

  const tx = await daiContract.approve(COMMUNITY_CONTRACT_ADDRESS, amount);
  txPending.value = true;
  const receipt = await tx.wait(1);
  txPending.value = false;

  return receipt;
}

const mint = async (amount: BigNumber) => {
  if (!signer.value || !address.value) throw new Error("Not connected to wallet");
  const communityContract = markRaw(new Contract(COMMUNITY_CONTRACT_ADDRESS, dripsTokenAbi, signer.value));

  const tx = await communityContract['mint(address,uint128,uint128)'](address.value, 0, amount);
  txPending.value = true;
  const receipt = await tx.wait(1);
  txPending.value = false;

  return receipt;
}

const toWei = (dai: BigNumber) => dai.mul('1000000000000000000');

const clickGetAnNft = () => {
  step.value = Step.SetAmount;
}

const clickSetAmount = async () => {
  if (!donateAmount.value) throw new Error("Expected donate amount");

  if (donateAmount.value < 5) {
    return;
  }

  buttonDisabled.value = true;

  const allowance = await checkAllowance();
  const donateAmtBigNumber = BigNumber.from(donateAmount.value);

  if (allowance.lt(toWei(donateAmtBigNumber))) {
    buttonDisabled.value = false;
    step.value = Step.ApproveContract;
  } else {
    buttonDisabled.value = false;
    step.value = Step.Mint;
  }
}

const clickApprove = async () => {
  buttonDisabled.value = true;

  try {
    await approve();
    step.value = Step.Mint;
    buttonDisabled.value = false;
  } catch (e) {
    console.error(e);
    buttonDisabled.value = false;
  }
}

const clickTakeMyMoney = async () => {
  buttonDisabled.value = true;
  try {
    await mint(toWei(BigNumber.from(donateAmount.value)));
    emit('close');
  } catch (e) {
    console.error(e);
    buttonDisabled.value = false;
  }
}

const buttonText = (text: string, noUser?: true) => {
  if (txPending.value) {
    return 'Waiting for tx confirmation…'
  }

  if (buttonDisabled.value && !noUser) {
    return 'Confirm in your wallet'
  }

  return text;
}
</script>

<template>
  <Transition>
    <div class="wrapper" v-if="props.show">
    <div class="background" v-if="props.show" @click="$emit('close')"></div>
      <div class="modal">
        <div class="step" v-if="step === Step.Intro">
          <h1>Donate to the DJs</h1>
          <button :disabled="buttonDisabled" @click="clickGetAnNft">Donate DAI & get NFT</button>
          <p class="link">Or send plain ETH or ERC-20</p>
        </div>
        <div class="step" v-else-if="step === Step.SetAmount">
          <h1>Choose donation amount</h1>
          <p>Donate at least 5 DAI to get the NFT!</p>
          <input type="number" min="0" v-model="donateAmount" />
          <button :disabled="buttonDisabled" @click="clickSetAmount">{{buttonText('Donate', true)}}</button>
        </div>
        <div class="step" v-else-if="step === Step.ApproveContract">
          <h1>Approve the Radicle Drips contract to take {{donateAmount}} of your DAI. You’ll need to open your wallet to do this.</h1>
          <button :disabled="buttonDisabled" @click="clickApprove">{{buttonText('Approve')}}</button>
        </div>
        <div class="step" v-else-if="step === Step.Mint">
          <button :disabled="buttonDisabled" @click="clickTakeMyMoney">{{buttonText('Take my money')}}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
  transition: all .5s linear;
}

.v-leave-to .modal {
  transform: translateY(100vh) rotate(160deg);
}

.v-enter-from .modal {
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
  background-color: rgba(0,0,0,.5);
  position: fixed;
  transition: all .5s linear;
}

.modal {
  background-color: red;
  padding: 32px;
  width: calc(100vw - 16px);
  margin: 16px;
  max-width: 576px;
  border-radius: 16px;
  z-index: 10;
  transition: all .5s;
}

.step {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  text-align: center;
}

.step > h1 {
  font-size: 32px;
}

.step > p {
  font-size: 18px;
}

button {
  display: block;
  height: 90px;
  padding: 0 32px;
  font-size: 32px;
  color: red;
  background-color: white;
  border-radius: 45px;
}

button:disabled {
  opacity: .5;
}

.link {
  text-decoration: underline;
}

input {
  color: red;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100px;
  font-size: 32px;
}
</style>
