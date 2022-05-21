<script setup lang="ts">
import { ref } from 'vue'
import { useEthers } from 'vue-dapp';
import DonateButton from '../components/DonateButton.vue';
import DonateModal from '../components/DonateModal.vue';
import VideoPlayer from '../components/VideoPlayer.vue';

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
  <div class="stream">
    <DonateModal @close="closeModal" :show="modalShown"/>
    <VideoPlayer />
    <DonateButton @click="donate" v-if="isActivated" />
  </div>
</template>

<style>
.stream {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
