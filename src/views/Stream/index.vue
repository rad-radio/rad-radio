<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEthers } from 'vue-dapp';
import DonateButton from '../../components/DonateButton.vue';
import DonateModal from '../../components/DonateModal.vue';
import VideoPlayer from '../../components/VideoPlayer.vue';
import LayoutHeader from '../../components/LayoutHeader.vue'
import useLiveDoc from '../../db/useLiveDoc';
import useRealtimeDbValue from '../../db/useRealtimeDbValue';
import { increment } from '@firebase/firestore';
import { increment as rtDbIncrement } from '@firebase/database';
import bus from './reactionEventBus';
import { Reaction } from './types';
import ReactionFountain from '../../components/ReactionFountain.vue';
import Chill from '../../components/Chill.vue';

const modalShown = ref(false);

const { isActivated } = useEthers();

const donate = async () => {
  modalShown.value = true;
}

const closeModal = () => {
  modalShown.value = false;
}

interface Reactions {
  [key: keyof Reaction]: number;
}

const reactions = useLiveDoc<Reactions>("reactions", "reactions");

const THROTTLE_PERIOD_SECS = 5;
const throttled = ref(false);
let reactionsInLastThrottlePeriod: number | undefined;

function updateThrottle() {
  if (reactionsInLastThrottlePeriod === undefined) {
    reactionsInLastThrottlePeriod = 0;

    setTimeout(() => {
      reactionsInLastThrottlePeriod = undefined;
      throttled.value = false;

    }, THROTTLE_PERIOD_SECS * 1000);
  }

  reactionsInLastThrottlePeriod++;

  if (reactionsInLastThrottlePeriod > 10) {
    throttled.value = true;
  }
}

function react(key: Reaction) {
  updateThrottle();

  reactions.update({
    [key]: increment(1),
  });
}

reactions.registerListener((doc, prevDoc) => {
  if (!prevDoc) return;

  let increasedReaction: Reaction | undefined = undefined;

  for (const reaction: Reaction in doc) {
    const prevAmount = prevDoc[reaction];

    if (prevAmount < doc[reaction]) {
      increasedReaction = reaction as Reaction;
    }
  }

  if (increasedReaction) bus.emit('reaction', increasedReaction);
});

const viewCounter = useRealtimeDbValue<number>("viewersCount");

onMounted(() => {
  viewCounter.set(rtDbIncrement(1));

  viewCounter.setOnDisconnect(rtDbIncrement(-1));
});
</script>

<template>
  <Chill v-if="throttled" />
  <LayoutHeader />
  <ReactionFountain />
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

  <div class="reactions" v-if="reactions.doc?.value">
    <div class="reaction" v-for="(val, key) in reactions.doc.value">
      {{key}}: {{val}}
    </div>
  </div>
  currentViewers: {{ viewCounter.val }}

  <div class="reaction-buttons" :class="{ throttled }">
    <button @click="() => react(Reaction.Alien)">👽</button>
    <button @click="() => react(Reaction.Music)">🎶</button>
    <button @click="() => react(Reaction.Heart)">❤️</button>
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

.throttled {
  pointer-events: none;
  opacity: .5;
}

.reactions {
  display: flex;
  gap: 8px;
}

.reaction-buttons {
  position: fixed;
  z-index: 100;
  top: 48px;
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
