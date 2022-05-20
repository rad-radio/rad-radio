<script setup lang="ts">
import { BigNumber, Contract, ethers } from 'ethers';
import { markRaw, ref, watch } from 'vue'
import {
  useBoard,
  useEthers,
  useWallet,
  displayChainName,
  displayEther,
  shortenAddress,
  ChainId,
  useEthersHooks,
  MetaMaskProvider,
  Metamask,
} from 'vue-dapp'

import daiAbi from '../eth/abis/Dai.abi.json';
import dripsTokenAbi from '../eth/abis/DripsToken.abi.json';

const { status, disconnect, error, walletName } = useWallet()
const { address, balance, chainId, isActivated, provider, signer } = useEthers()
const { onActivated, onChanged } = useEthersHooks()

const communityContractAddress = '0x89eb58c8598d07f14852ad74e242187dbcbdf7ec';
// const daiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContractAddress = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea';

const selectedChainId = ref(0)

watch(status, () => {
  console.log(status.value);
});

onActivated(() => {
  selectedChainId.value = chainId.value as number
})

onChanged(() => {
  selectedChainId.value = chainId.value as number
})

const donate = async () => {
  const allowance = await checkAllowance();

  console.log(allowance);

  if (allowance.isZero()) {
    await approve();
  }

  const receipt = await mint();

  console.log(receipt);
}

const checkAllowance = async (): Promise<BigNumber> => {
  if (!provider.value || !address.value) throw new Error("Not connected to wallet");
  const daiContract = markRaw(new Contract(daiContractAddress, daiAbi, provider.value));

  return await daiContract.allowance(address.value, communityContractAddress);
}

const approve = async () => {
  if (!signer.value || !address.value) throw new Error("Not connected to wallet");
  const daiContract = markRaw(new Contract(daiContractAddress, daiAbi, signer.value));
  const amount = ethers.constants.MaxUint256;

  const tx = await daiContract.approve(communityContractAddress, amount);
  const receipt = await tx.wait(1);

  return receipt;
}

const mint = async () => {
  if (!signer.value || !address.value) throw new Error("Not connected to wallet");
  const communityContract = markRaw(new Contract(communityContractAddress, dripsTokenAbi, signer.value));

  const tx = await communityContract['mint(address,uint128,uint128)'](address.value, 0, '5000000000000000000');
  const receipt = await tx.wait(1);

  return receipt;
}
</script>

<template>
  <div class="stream">
    <button v-if="status === 'connected'" @click="donate">Donate</button>
  </div>
</template>

<style>
.stream {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
