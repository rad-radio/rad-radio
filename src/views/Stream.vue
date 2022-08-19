<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEthers } from 'vue-dapp';
import DonateButton from '../components/DonateButton.vue';
import DonateModal from '../components/DonateModal.vue';
import VideoPlayer from '../components/VideoPlayer.vue';
import LayoutHeader from '../components/LayoutHeader.vue'
import useLiveDoc from '../db/useLiveDoc';
import useRealtimeDbValue from '../db/useRealtimeDbValue';
import { increment } from '@firebase/firestore';
import { increment as rtDbIncrement } from '@firebase/database';

const modalShown = ref(false);

const { isActivated } = useEthers();

const donate = async () => {
  modalShown.value = true;
}

const closeModal = () => {
  modalShown.value = false;
}

interface Reactions {
  heart: number;
  music: number;
  alien: number;
}

const reactions = useLiveDoc<Reactions>("reactions", "reactions");

function react(key: keyof Reactions) {
  console.log('reacting');
  reactions.update({
    [key]: increment(1),
  });
}

const viewCounter = useRealtimeDbValue<number>("viewersCount");

onMounted(() => {
  viewCounter.set(rtDbIncrement(1));

  viewCounter.setOnDisconnect(rtDbIncrement(-1));
});
</script>

<template>
  <LayoutHeader />
  <div id="spinners">
    <a id="spinner1" href="https://hoerberlin.com/" target="_blank"></a>
    <a id="spinner3" href="https://livepeer.org/" target="_blank"></a>
    <a id="spinner4" href="https://radicle.xyz/" target="_blank"></a>
  </div>

  <div id="tribals">
    <div id="logo">RAD RADIO</div>
    <div id="tribal2"></div>
    <div id="tribal3"></div>
    <div id="tribal4"></div>
  </div>

  alien: {{ reactions.doc?.value?.alien }}
  music: {{ reactions.doc?.value?.music }}
  heart: {{ reactions.doc?.value?.heart }}
  currentViewers: {{ viewCounter.val }}

  <div class="reaction-buttons">
    <button @click="() => react('alien')">👽</button>
    <button @click="() => react('music')">🎶</button>
    <button @click="() => react('heart')">❤️</button>
  </div>


  <div class="stream">
    <DonateModal @close="closeModal" :show="modalShown" />
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
  z-index: -1;
}

.reaction-buttons {
  position: fixed;
  z-index: 100;
  top: 24px;
  left: 0px;
  display: flex;
  gap: 8px;
  background-color: green;
}

.reaction-buttons>button {
  background-color: red;
  font-size: 32px;
}

@media (max-width: 691px) {
  #logo {
    display: none;
  }
}
</style>
