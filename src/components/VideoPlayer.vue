<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Hls from 'hls.js';
  import mux from 'mux-embed';

  const videoEl = ref<HTMLVideoElement | null>(null);
  const muted = ref(true);

  const SRC = "https://livepeercdn.com/hls/3841ort45mi0gnds/index.m3u8";
  const MUX_ENV = process.env.NODE_ENV === 'development' ? '7fau5vqe6508ki9ffst4qdl77' : 'mdahi90bvpttt7l6tkburhld9';

  window.muxPlayerInitTime = Date.now();

  const init = () => {
    if (!videoEl.value) throw new Error("Player not initialized");

    if (videoEl.value.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.value.src = SRC;

      videoEl.value.addEventListener('error', (e) => {
        if (videoEl.value?.error?.code === 4) {
          setTimeout(init, 2000);
        } 
      });

      mux.monitor(videoEl.value, {
        debug: false,
        disableCookies: true,
        data: {
          env_key: MUX_ENV, // required
          player_name: 'Main Player', // any arbitrary string you want to use to identify this player
          player_init_time: window.muxPlayerInitTime,
        }
      });
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(SRC);
      hls.attachMedia(videoEl.value);

      mux.monitor(videoEl.value, {
        debug: false,
        disableCookies: true,
        hlsjs: hls,
        Hls: Hls,
        data: {
          env_key: MUX_ENV, // required
          player_name: 'Main Player',
          player_init_time: window.muxPlayerInitTime,
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.type === 'networkError') {
          setTimeout(init, 2000);
        }
      });
    } else {
      console.error("This is a legacy browser that doesn't support MSE");
    }
  }

  onMounted(() => {
    if (!videoEl.value) throw new Error("Unable to initialize player");
    init();
  });
</script>

<template>
  <video ref="videoEl" id="videoEl" autoplay :muted="muted" @click="muted = true"/>
  <Transition>
    <div class="muted-overlay" v-if="muted" @click="muted = false">
      <div class="content">
        <h1>🔊</h1>
        UNMUTE
      </div>
    </div>
  </Transition>
</template>

<style scoped>
video {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  background-color: black;
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
  background: red;
  padding: 32px;
  border-radius: 100%;
  font-feature-settings: "ss02" off;
}

.content h1 {
  font-size: 48px;
}
</style>
