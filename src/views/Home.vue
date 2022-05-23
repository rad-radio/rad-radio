<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div id="spinners">
      <a id="spinner1" href="https://hoerberlin.com/" target="_blank"></a>
      <div id="spinner2"></div>
      <a id="spinner3" href="https://livepeer.org/" target="_blank"></a>
      <a id="spinner4" href="https://radicle.xyz/" target="_blank"></a>
    </div>

    <div id="tribals">
        <div id="tribal1"></div>
        <div id="tribal2"></div>
        <div id="tribal3"></div>
        <div id="tribal4"></div>
    </div>

    <div id="text">
        <!-- <h2>RAD RADIO</h2> -->
        <h3>Hosted by <a href="https://hoerberlin.com/" target="_blank">Hör</a></h3>
        <h1>RAD</h1>
        <h3>Presented by <a href="https://radicle.xyz/" target="_blank">Radicle</a></h3>
        <h1>RADIO</h1>
        <h3>Streamed with <a href="https://livepeer.org/" target="_blank">Livepeer</a></h3>
        <h2 id="timer">
          <vue-countdown :time="(1653508800 * 1000) - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }">
            {{ days }}D {{ hours }}H {{ minutes }}M {{ seconds }}S
          </vue-countdown>
        </h2>
    </div>
  </div>
</template>

<style scoped>
*::selection {
  background: rgba(255, 255, 255, 0.75);
}

.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
}

#text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

h1,
h2,
h3 {
  margin: 0;
  cursor: default;
}

h1 {
  /* font-size: 11vw; smaller headline for when the DJs are announced*/
  font-size: 18vw;
  line-height: 85%;
  color:blue
}

h2 {
  font-size: 4vw;
  line-height: 120%;
}

h3 {
  font-size: 2vw;
  color: red;
  z-index: 100;
}

h3 a {
  border: 2px solid transparent;
}

h3 a:hover {
  border-radius: 100%;
  border: 2px solid red;
}

* {
  --spinner-margin: 20px;
}

#spinners > * {
  width: 150px;
  height: 150px;
  animation: spin 10s linear 0s infinite;
  background-size: contain;
  background-repeat: no-repeat;
  position: fixed;
}

#spinner1 {
  background-image: url(/spinner1.png);
  top: var(--spinner-margin);
  left: var(--spinner-margin);
}

#spinner2 {
  background-image: url(/spinner2.png);
  top: var(--spinner-margin);
  right: var(--spinner-margin);
}

#spinner3 {
  background-image: url(/spinner3.png);
  bottom: var(--spinner-margin);
  left: var(--spinner-margin);
}

#spinner4 {
  background-image: url(/spinner4.png);
  bottom: var(--spinner-margin);
  right: var(--spinner-margin);
}

* {
  --tribal-width: 300px;
  --tribal-height: 80px;
}

#tribals > * {
  background-size: contain;
  background-repeat: no-repeat;
  position: fixed;
}

#tribal1 /* top */ {
  width: var(--tribal-width);
  height: var(--tribal-height);
  background-image: url(/tribal1.png);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

#tribal2 /* right */ {
  height: var(--tribal-width);
  width: var(--tribal-height);
  background-image: url(/tribal2.png);
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  right: 0;
}

#tribal3 {
  width: var(--tribal-height);
  height: var(--tribal-width);
  background-image: url(/tribal3.png);
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  left: 0;
}

#tribal4 /* bottom */ {
  height: var(--tribal-height);
  width: var(--tribal-width);
  background-image: url(/tribal4.png);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>