<template>
  <div class="wrapper">
    <div class="chill">CHILL</div>
  </div>
</template>

<style scoped>
.wrapper {
  user-select: none;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.chill {
  border-radius: 24vw;
  padding: 0 4vw;
  background-color: rgba(255,0,0,0.5);
  color: white;
  font-size: 16vw;
  animation: blink 0.5s steps(1, end) infinite, zoom 0.5s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoom {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(0.5);
  }
  75% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
