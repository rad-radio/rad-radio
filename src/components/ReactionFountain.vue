<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bus from '../views/Stream/reactionEventBus';
import { Reaction } from '../views/Stream/reactions';
import { emojiMap } from '../views/Stream/reactions';

const particlesParent = ref(null);

bus.on('reaction', (reaction) => {
  spawnParticle(reaction);
});

interface Particle {
  yPos: number;
  xOffset: number;
  swayOffset: number;
  swayDirection: 'left' | 'right';
  opacity: number;
  text: string;
}

const particles = ref<Particle[]>([]);

function spawnParticle(reaction: Reaction) {
  particles.value = [
    {
      yPos: 0,
      opacity: 1,
      xOffset: Math.random() * 256 - 64,
      swayOffset: 0,
      swayDirection: Math.random() > 0.5 ? 'left' : 'right',
      text: emojiMap[reaction],
    },
    ...particles.value,
  ];
}

const MAX_SWAY = 16;

function frame() {
  particles.value = particles.value.map((particle) => {
    particle.yPos += 1.5;
    particle.opacity = 1 - particle.yPos / (window.innerHeight / 2);

    if (particle.swayOffset >= MAX_SWAY) {
      particle.swayDirection = 'left';
    } else if (particle.swayOffset <= -MAX_SWAY) {
      particle.swayDirection = 'right';
    }

    particle.swayOffset = particle.swayDirection === 'left' ? particle.swayOffset -= 0.5 : particle.swayOffset += 0.5;

    return particle;
  }).filter((particle) => particle.yPos < window.innerHeight && particle.opacity >= - 256);

  if (particles.value.length > 32) {
    particles.value = particles.value.slice(undefined, 32);
  }

  requestAnimationFrame(frame);
}

onMounted(() => {
  frame();
})
</script>

<template>
  <div class="particles" ref="particlesParent">
    <div class="particle-wrapper" v-for="particle in particles" :style="{
      transform: `translate(${particle.xOffset + particle.swayOffset}px, -${128 + particle.yPos}px`,
      opacity: particle.opacity,
    }"><div class="particle">{{particle.text}}</div></div>
  </div>
</template>

<style>
.particles {
  position: fixed;
  bottom: 0;
  left: calc(50vw - 64px);
  width: 128px;
}

.particle-wrapper {
  pointer-events: none;
  user-select: none;
  position: absolute;
}

.particle {
  font-size: 64px;
}
</style>