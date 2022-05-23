<script setup lang="ts">
import { ref } from 'vue'
import { useEthers } from 'vue-dapp';
import DonateButton from '../components/DonateButton.vue';
import DonateModal from '../components/DonateModal.vue';
import VideoPlayer from '../components/VideoPlayer.vue';
import LayoutHeader from '../components/LayoutHeader.vue'

const modalShown = ref(false);

const { isActivated } = useEthers();

const donate = async () => {
  modalShown.value = true;
}

const closeModal = () => {
  modalShown.value = false;
}
</script>

<template>
  <LayoutHeader />
  <div id="spinners">
      <a id="spinner1" href="https://hoerberlin.com/" target="_blank"></a>
      <div id="spinner2"></div>
      <a id="spinner3" href="https://livepeer.org/" target="_blank"></a>
      <a id="spinner4" href="https://radicle.xyz/" target="_blank"></a>
  </div>

  <div id="tribals">
      <div id="tribal1"></div>
      <div id="tribal2"></div>
      <div id="tribal3"></div>
      <div id="tribal4"></div>
  </div>
  
  <div class="stream">
    <DonateModal @close="closeModal" :show="modalShown"/>
    <VideoPlayer />
    <DonateButton class="donate-button" @click="donate" v-if="isActivated && !modalShown" />
  </div>
</template>

<style scoped>
.stream {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
