<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Hls from 'hls.js';

  const videoEl = ref<HTMLVideoElement | null>(null);
  const muted = ref(true);

  const SRC = "https://livepeercdn.com/hls/3841ort45mi0gnds/index.m3u8";

  onMounted(() => {
    if (!videoEl.value) throw new Error("Unable to initialize player");
  
    if (videoEl.value.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.value.src = SRC;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(SRC);
      hls.attachMedia(videoEl.value);
    } else {
      console.error("This is a legacy browser that doesn't support MSE");
    }
  });
</script>

<template>
  <video ref="videoEl" autoplay :muted="muted" @click="muted = true"/>
  <Transition>
    <div class="muted-overlay" v-if="muted" @click="muted = false">
      <div class="content">
        <img width="48" height="48"  src="/volume-mute.svg" class="mute-icon"/>
        Click to jam
      </div>
    </div>
  </Transition>
</template>

<style scoped>
video {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}

.v-leave-to {
  opacity: 0;
}

.v-leave-to .content {
  opacity: 0;
  transform: rotate(500deg) scale(3);
}

.v-enter-from {
  opacity: 0;
}

.v-enter-from .content {
  transform: rotate(500deg) scale(3);
}

.muted-overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 24px;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  flex-direction: column;
  gap: 16px;
  transition: all .3s;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  transition: all .3s;
}
</style>
