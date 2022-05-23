<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div id="spinners">
        <div id="spinner1"></div>
        <div id="spinner2"></div>
        <div id="spinner3"></div>
        <div id="spinner4"></div>
    </div>

    <div id="tribals">
        <div id="tribal1"></div>
        <div id="tribal2"></div>
        <div id="tribal3"></div>
        <div id="tribal4"></div>
    </div>

    <div id="text">
        <!-- <h2>RAD RADIO</h2> -->
        <h3>Hosted by Hör</h3>
        <h1>RAD</h1>
        <h3>Presented by Radicle</h3>
        <h1>RADIO</h1>
        <h3>Made possible by Livepeer</h3>
        <h2 id="timer">
          <!--1653508800-->
          <vue-countdown :time="(1653311699 * 1000) - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }">
            <span v-if="days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0">{{ days }}D {{ hours }}H {{ minutes }}M {{ seconds }}S</span>
            <button class="watch-button" @click="$router.push('/stream')" v-if="(days === 0 && hours === 0 && minutes === 0 && seconds === 0)">WATCH THE STREAM</button>
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
}

h1 {
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

.watch-button {
  margin-top: 16px;
  font-feature-settings: "ss02" off;
  font-weight: bold;
  padding: 2vw;
  border-radius: 128px;
  outline: 2px solid blue;
}
</style>