<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Hls from 'hls.js';

  const videoEl = ref<HTMLVideoElement | null>(null);

  const SRC = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8";

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
  <video ref="videoEl" autoplay muted/>
</template>

<style>
video {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}
</style>
