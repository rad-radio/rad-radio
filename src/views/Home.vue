<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div id="spinners">
      <a id="spinner1" href="https://lenster.xyz/u/letsraave" target="_blank"></a>
      <a id="spinner2" href="https://twitter.com/letsraave/" target="_blank"></a>
      <a id="spinner3" href="https://livepeer.org/" target="_blank"></a>
      <a id="spinner4" href="https://www.drips.network/" target="_blank"></a>
    </div>

    <div id="tribals">
        <div id="tribal1"></div>
        <div id="tribal2"></div>
        <div id="tribal3"></div>
        <div id="tribal4"></div>
    </div>

    <div id="text">

		<!-- When lineup -->
        <h2>RAD RADIO</h2>
        <h1>Jimi Jules</h1>
		<h3>Decentralized live-streamed DJ sets</h3>
        <h1>Henri Bergmann b2b Jamie</h1>
		<h3>Powered by <a href="https://livepeer.org/" target="_blank">Livepeer</a> and <a href="https://drips.network" target="_blank">Drips</a></h3>
		<h1>Gallivanter</h1>
		<h3>Made in Berlin</h3>
		<h1>Veronika Fleyta</h1>

		<!-- 
		When no lineup
			
		<h3>Decentralized live-streamed DJ sets</h3>
        <h1>RAD</h1>
		<h3>Powered by <a href="https://livepeer.org/" target="_blank">Livepeer</a> and <a href="https://drips.network" target="_blank">Drips</a></h3>
        <h1>RADIO</h1>
		<h3>Made in Berlin</h3> -->

        <!-- <h2 id="timer">
          <vue-countdown :time="(1684082700 * 1000) - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }">
            <span v-if="days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0">{{ days }}D {{ hours }}H {{ minutes }}M {{ seconds }}S</span>
            <button class="watch-button" @click="$router.push('/stream')" v-else>WATCH THE STREAM</button>
          </vue-countdown>
        </h2> -->
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

/* When lineup */
h1 {
  font-size: 6.5vw;
  line-height: 65%;
  color:blue;
  margin: 16px 0;
}

/* 
When no lineup

h1 {
  font-size: 20vw;
  line-height: 65%;
  color:blue;
  margin: 16px 0;
} */

h2 {
  font-size: 2vw;
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

.watch-button:hover {
  animation: jiggle .2s linear infinite;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.6), 0px 22px 50px rgba(0, 0, 0, 0.5), inset 0px -4px 30px rgba(0, 0, 0, 0.8);
}

.watch-button {
  margin-top: 32px;
  padding: 2vw 3vw;
  border-radius: 100px;
  font-feature-settings: "ss02" off;
  background-color: red;
  color: white;
  transition: box-shadow .4s;
}

#timer {
  margin-top: 32px;
}

@keyframes jiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@media (max-width: 534px) {
  #tribal2, #tribal3 {
    display: none;
  }

  h1 {
    font-size: 11vw;
	  line-height: 110%;
  }

  h2 {
    font-size: 5vw;
  }

  h3 {
    font-size: 4vw;
  }
}
</style>