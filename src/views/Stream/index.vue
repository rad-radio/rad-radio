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
import { Reaction, emojiMap } from './reactions';
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

type Reactions = {
  [key in Reaction]: number;
}

const reactions = useLiveDoc<Reactions>("reactions", "reactions");

const THROTTLE_PERIOD_SECS = 5;
const THROTTLE_TIMEOUT_SECS = 10;
const throttled = ref(false);
let reactionThrottleCount: number = 0;
let throttleResetInterval: ReturnType<typeof setTimeout> | undefined;

function updateThrottle() {
  reactionThrottleCount++;

  clearInterval(throttleResetInterval);
  throttleResetInterval = setTimeout(() => {
    reactionThrottleCount = 0;
  }, THROTTLE_TIMEOUT_SECS * 1000);

  if (reactionThrottleCount >= 5) {
    throttled.value = true;

    setTimeout(() => {
      reactionThrottleCount = 0;
      throttled.value = false;
    }, THROTTLE_PERIOD_SECS * 1000);
  }
}

function react(key: Reaction) {
  updateThrottle();

  if (throttled.value) return;

  reactions.update({
    [key]: increment(1),
  });
}

reactions.registerListener((doc, prevDoc) => {
  if (!prevDoc) return;

  let increasedReaction: Reaction | undefined = undefined;

  for (const reaction in doc) {
    const prevAmount = prevDoc[reaction as Reaction];

    if (prevAmount < doc[reaction as Reaction]) {
      increasedReaction = reaction as Reaction;
    }
  }

  if (increasedReaction) bus.emit('reaction', increasedReaction);
});

function getReactionCount(reaction: Reaction) {
  return reactions.doc?.value?.[reaction];
}

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
    <a id="spinner3" class="hideOnMobile" href="https://livepeer.org/" target="_blank"></a>
    <a id="spinner4" class="hideOnMobile" href="https://radicle.xyz/" target="_blank"></a>
  </div>

  <div id="tribals">
    <div id="logo">RAD RADIO</div>
    <div id="tribal2"></div>
    <div id="tribal3"></div>
  </div>

  <div class="stats">
    <div class="donated">
      <span class="count" v-if="viewCounter.val">1000 DAI</span>
      <span class="label">DONATED</span>
    </div>
    <div class="online">
      <span class="count" v-if="viewCounter.val">{{viewCounter.val}}</span>
      <span class="label">WATCHING NOW</span>
    </div>
  </div>

  <div class="reaction-buttons">
    <div class="reaction" @click="() => react(reaction)" :class="{ throttled }" v-for="(emoji, reaction) in emojiMap">
      <span>{{emoji}}</span>
      <span class="count" v-if="reactions.doc?.value">{{getReactionCount(reaction)}}</span>
    </div>
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
  opacity: .5;
}

.stats {
  position: fixed;
  bottom: 128px;
  border: 2px solid red;
  border-radius: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  display: flex;
}

.stats > div {
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
}

.stats > div > .count {
  font-size: 24px;
}

.stats > div:not(:last-child) {
  border-right: 2px solid red;
}

.reactions {
  display: flex;
  gap: 8px;
}

.reaction-buttons {
  position: fixed;
  z-index: 100;
  bottom: 2vh;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
}

.reaction {
  display: flex;
  width: 12vw;
  max-width: 64px;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  transition: transform .3s, opacity .3s;
  transform-origin: 50% 100%;
  user-select: none;
  cursor: pointer;
}

.reaction:not(.throttled):hover {
  transform: scale(1.3);
}

.reaction:not(.throttled):active {
  transform: scale(1.4);
}

.reaction > .count {
  font-size: 16px;
  color: red;
}

.reaction-buttons > div {
  font-size: 32px;
}

@media (max-width: 691px) {
  #logo {
    display: none;
  }

  .hideOnMobile {
    display: none;
  }

  .reaction:not(.throttled):hover {
    transform: scale(1);
  }
}
</style>
