<script setup lang="ts">
import { BigNumber, Contract } from 'ethers';
import { markRaw, ref, watch } from 'vue';
import { useEthers } from 'vue-dapp';

import daiAbi from '../eth/abis/Dai.abi.json';
import dripsTokenAbi from '../eth/abis/DripsToken.abi.json';
import AddressCopyButton from './AddressCopyButton.vue';

const props = defineProps({
  show: Boolean,
});

const COMMUNITY_CONTRACT_ADDRESS = '0x0d5241b0896f7d7302a840c4dca8f5b7cf22de14';
// rinkeby: const COMMUNITY_CONTRACT_ADDRESS = '0x89eb58c8598d07f14852ad74e242187dbcbdf7ec';
const DAI_CONTRACT_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
// rinkeby: const DAI_CONTRACT_ADDRESS = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea';

const emit = defineEmits(['close']);

enum Step {
  Intro,
  ERC20,
  SetAmount,
  ApproveContract,
  Mint,
  Success,
  Error,
}

const { address, provider, signer } = useEthers();

const step = ref(Step.Intro);
const buttonDisabled = ref(false);
const txPending = ref(false);
const donateAmount = ref<number>(5);

watch(props, (v) => {
  if (v.show === true) {
    step.value = Step.Intro;
    txPending.value = false;
    buttonDisabled.value = false;
    donateAmount.value = 5;
  }
});

const checkAllowance = async (): Promise<BigNumber> => {
  if (!provider.value || !address.value) throw new Error("Not connected to wallet");
  const daiContract = markRaw(new Contract(DAI_CONTRACT_ADDRESS, daiAbi, provider.value));

  return await daiContract.allowance(address.value, COMMUNITY_CONTRACT_ADDRESS);
}

const approve = async (amount: BigNumber) => {
  if (!signer.value || !address.value) throw new Error("Not connected to wallet");

  const daiContract = markRaw(new Contract(DAI_CONTRACT_ADDRESS, daiAbi, signer.value));

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
    await approve(toWei(BigNumber.from(donateAmount.value)));
    step.value = Step.Mint;
    buttonDisabled.value = false;
  } catch (e) {
    console.error(e);
    step.value = Step.Error;
    buttonDisabled.value = false;
  }
}

const clickTakeMyMoney = async () => {
  buttonDisabled.value = true;
  try {
    await mint(toWei(BigNumber.from(donateAmount.value)));
    buttonDisabled.value = false;
    step.value = Step.Success;
  } catch (e) {
    console.error(e);
    step.value = Step.Error;
    buttonDisabled.value = false;
  }
}

const clickCheers = () => {
  emit('close');
}

const clickRetry = () => {
  step.value = Step.Intro;
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
      <div id="modal">
        <div class="step" v-if="step === Step.Intro">
          <h1>Support the DJs</h1>
          <button :disabled="buttonDisabled" @click="clickGetAnNft">Donate 5 DAI for the NFT</button>
          <p @click="step = Step.ERC20" class="link">Or send plain ETH or ERC-20</p>
        </div>
        <div class="step" v-if="step === Step.ERC20">
          <h1>💰 Donate ETH or ERC-20 💰</h1>
          <p>It'll go straight to the artists!</p>
          <img src="/address.svg" />
          <AddressCopyButton address="0x1665f71Ca63cd880A6294a16F4342485bAc12A46" />
          <button :disabled="buttonDisabled" @click="$emit('close')">Done</button>
        </div>
        <div class="step" v-else-if="step === Step.SetAmount">
          <h1>Choose your donation.<br>The minimum is 5 DAI.</h1>
          <div id="donate-amount">
            <input type="number" min="5" v-model="donateAmount" />
            <button :disabled="buttonDisabled || donateAmount < 5" @click="clickSetAmount">{{buttonText('Continue', true)}}</button>
          </div>
          <p>(Make sure you have enough DAI in your wallet!)</p>
        </div>
        <div class="step" v-else-if="step === Step.ApproveContract">
          <h1>Approve the Radicle Drips contract to take {{donateAmount}} of your DAI. You’ll need to open your wallet to do this.</h1>
          <p>Please note that you'll need to send another transaction to mint the NFT after this.</p>
          <button :disabled="buttonDisabled" @click="clickApprove">{{buttonText('Approve')}}</button>
        </div>
        <div class="step" v-else-if="step === Step.Mint">
          <img id="nft-art" src="../assets/nft.png" alt="">
          <p>Now, send your donation of {{donateAmount}} DAI to the artists and get the above NFT sent to your wallet!</p>
          <button :disabled="buttonDisabled" @click="clickTakeMyMoney">{{buttonText('Take my money')}}</button>
        </div>
        <div class="step" v-else-if="step === Step.Success">
          <h1>Success!</h1>
          <p>Your NFT has been minted and put into your wallet. Thanks for your donation and enjoy the music.</p>
          <button :disabled="buttonDisabled" @click="clickCheers">{{buttonText('Cheers')}}</button>
        </div>
        <div class="step" v-else-if="step === Step.Error">
          <h1>😩 Oops!</h1>
          <p>The transaction failed. Maybe you rejected it, or you don't have enough DAI in your wallet?</p>
          <button :disabled="buttonDisabled" @click="clickRetry">{{buttonText('Retry')}}</button>
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
  transition: all .5s linear;
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
  transition: all .5s linear;
}

#modal {
  background-color: red;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.4), 0px 11px 26px rgba(0, 0, 0, 0.25), inset 0px -4px 30px rgba(0, 0, 0, 0.8);
  padding: 32px;
  width: calc(100vw - 16px);
  margin: 16px;
  max-width: 576px;
  border-radius: 48px;
  z-index: 10;
  transition: all .5s;
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

input[type=number] {
  -moz-appearance: textfield;
}

input:focus {
  outline: none;
}

#nft-art {
  border-radius: 16px;
  transform: rotate(-5deg);
  box-shadow: 0px 1px 6px rgb(0 0 0 / 40%), 0px 11px 26px rgb(0 0 0 / 25%), inset 0px -4px 30px rgb(0 0 0 / 80%);
  margin-top: -120px;
}
</style>
