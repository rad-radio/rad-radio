<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Hls, { ErrorDetails, ErrorTypes, Events as HlsEvents } from "hls.js";
import mux from "mux-embed";

const videoEl = ref<HTMLMediaElement | null>(null);
const muted = ref(true);

const SOURCES = [
  "https://livepeercdn.studio/hls/9c73muynt36mmi8j/index.m3u8", // PRIMARY
  "https://livepeercdn.studio/hls/52b984114n3qoxs6/index.m3u8", // BACKUP
];
const src = computed(() => SOURCES[srcIndex.value]);
const srcIndex = ref(0);

const MUX_ENV =
  process.env.NODE_ENV === "development"
    ? "7fau5vqe6508ki9ffst4qdl77"
    : "mdahi90bvpttt7l6tkburhld9";

window.muxPlayerInitTime = Date.now();

const init = () => {
  if (!videoEl.value) throw new Error("Player not initialized");

  const waitingFailoverTimeout = ref<ReturnType<typeof setTimeout>>();

  if (videoEl.value.canPlayType("application/vnd.apple.mpegurl")) {
    videoEl.value.src = src.value;

    videoEl.value.onerror = (e) => {
      if (!videoEl.value) return;

      const errorsToRetry = [
        "NETWORK_NO_SOURCE",
        "MEDIA_ERR_ABORTED",
        "MEDIA_ERR_DECODE",
      ];

      if (
        videoEl.value.networkState === videoEl.value.NETWORK_NO_SOURCE ||
        errorsToRetry.includes(videoEl.value.error?.message || "")
      ) {
        console.error("Error loading stream, retrying in two seconds");

        clearTimeout(waitingFailoverTimeout.value);

        setTimeout(() => {
          failover();
          videoEl.value!.src = src.value;

          videoEl.value?.load();
        }, 2000);
      } else {
        console.error("unknown error", videoEl.value.error);
      }
    };

    const handlePlaybackProblem = () => {
      console.info("Playback stalled, scheduling failover in fifteen seconds…");

      clearTimeout(waitingFailoverTimeout.value);

      waitingFailoverTimeout.value = setTimeout(() => {
        failover();
        videoEl.value!.src = src.value;
        videoEl.value?.load();
      }, 15000);
    };

    videoEl.value.onwaiting = handlePlaybackProblem;
    videoEl.value.onstalled = handlePlaybackProblem;

    videoEl.value.onprogress = () => {
      console.info("Loading progress, clearing failover timeout");

      clearTimeout(waitingFailoverTimeout.value);
    };

    mux.monitor(videoEl.value, {
      debug: false,
      disableCookies: true,
      data: {
        env_key: MUX_ENV, // required
        player_name: "Main Player", // any arbitrary string you want to use to identify this player
        player_init_time: window.muxPlayerInitTime,
      },
    });
  } else if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src.value);
    hls.attachMedia(videoEl.value as HTMLMediaElement);

    hls.on(HlsEvents.ERROR, (e, d) => {
      switch (d.type) {
        case ErrorTypes.NETWORK_ERROR: {
          const errorsToRetry = [
            ErrorDetails.MANIFEST_PARSING_ERROR,
            ErrorDetails.MANIFEST_LOAD_ERROR,
            ErrorDetails.MANIFEST_LOAD_TIMEOUT,
          ];

          if (errorsToRetry.includes(d.details)) {
            console.error("Error loading stream, retrying in two seconds", d);

            setTimeout(() => {
              failover();

              hls.loadSource(src.value);
            }, 2000);
          } else {
            console.error(d);
          }
        }
      }
    });

    mux.monitor(videoEl.value, {
      debug: false,
      disableCookies: true,
      hlsjs: hls,
      Hls: Hls,
      data: {
        env_key: MUX_ENV, // required
        player_name: "Main Player",
        player_init_time: window.muxPlayerInitTime,
      },
    });
  } else {
    console.error("This is a legacy browser that doesn't support MSE");
  }
};

function failover() {
  const currentIndex = srcIndex.value;
  let newIndex = currentIndex + 1;

  if (!SOURCES[newIndex]) newIndex = 0;

  srcIndex.value = newIndex;

  console.info("Failed over, new source index is", srcIndex.value);
}

onMounted(() => {
  if (!videoEl.value) throw new Error("Unable to initialize player");
  init();
});
</script>

<template>
  <video
    ref="videoEl"
    id="videoEl"
    autoplay
    :muted="muted"
    @click="muted = true"
  />
  <Transition>
    <div class="muted-overlay" v-if="muted" @click="muted = false">
      <div class="content">🔊 UNMUTE</div>
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
  user-select: none;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 2px solid white;
  padding: 0.25rem 0.75rem;
  border-radius: 24px;
  font-feature-settings: "ss02" off;
}

.content h1 {
  font-size: 24px;
}
</style>
