<template>
  <div class="wrapper">
    <div class="chill">CHILL</div>
  </div>
</template>

<style>
.wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chill {
  border-radius: 24vw;
  padding: 0 4vw;
  background-color: rgba(255,0,0,0.5);
  color: white;
  font-size: 16vw;
  animation: blink 0.5s steps(1, end) infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
