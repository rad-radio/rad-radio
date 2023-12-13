<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div id="spinners">
      <a id="spinner1" href="/about"></a>
      <a id="spinner2" href="https://livepeer.org/" target="_blank"></a>
      <a id="spinner3" href="https://drips.network" target="_blank"></a>
      <a id="spinner4" href="https://streameth.org/" target="_blank"></a>
    </div>

    <div id="tribals">
        <div id="tribal1"></div>
        <div id="tribal2"></div>
        <div id="tribal3"></div>
        <div id="tribal4"></div>
    </div>

    <div id="text">

		<!-- When lineup -->
        <!-- <h2 class="red">Refraction <span class="kalam">Miami</span></h2>
        <h4>Featuring <a href="https://mcr.watch/Miami">Miami Community Radio</a> residents</h4>
        <h1>The Andes Connection</h1>
        <h1>Duality B2B cybashawty</h1>
        <h1>Sad MC’s</h1>
        <h3>Decentralized live-streamed DJ sets</h3>
        <h4>Live A/V performance from</h4>
        <h1 class="small">Albert.DATA and The Glad Scientist</h1> -->
        
        <!-- When no lineup -->
        
        <h3>Decentralized live-streamed DJ sets</h3>
          <h1>RAD</h1>
          <h3>Powered by <a href="https://livepeer.org/" target="_blank">Livepeer</a>, <a href="https://drips.network" target="_blank">Drips</a>, and <a href="https://streameth.org/" target="_blank">StreamETH</a></h3>
          <h1>RADIO</h1>
          <h3><a href="/about">About</a> RAD RADIO</h3>
          
          <!-- <h3 id="timer">
            <vue-countdown :time="(1702062000 * 1000) - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }">
              <span v-if="days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0">{{ days }}D {{ hours }}H {{ minutes }}M {{ seconds }}S</span>
              <button class="watch-button" @click="$router.push('/stream')" v-else>WATCH THE STREAM</button>
            </vue-countdown>
          </h3>
          <h4>Powered by <router-link to="/about">Rad Radio</router-link></h4>
          <h4>Made possible by: <a href="https://sona.stream/">Sona</a>, <a href="https://ra.co/">Resident Advisor</a>, <a href="https://www.fwb.help/">FWB</a>, <a href="https://sonar.es/en">Sonar+D</a>, <a href="https://www.llull.cat/catala/home/index.cfm">Institut Ramon Llull</a></h4> -->
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
/* h1 {
  font-size: 4vw;
  line-height: 85%;
  color:blue;
  margin: 16px 0;
} */

h1.small {
  font-size: 2vw;
}


/* 
When no lineup*/


h1 {
  font-size: 20vw;
  line-height: 65%;
  color:blue;
  margin: 16px 0;
}


h2 {
  font-size: 4vw;
  line-height: 120%;
}

.kalam {
  font-family: "Kalam";
  font-size: 7vw;
}

.red  {
  color: red;
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

h4 a:hover {
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
  margin-top: 8px;
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
    font-size: 20vw;
	  line-height: 50%;
  }

  h1.small {
    font-size: 4vw;
  }

  h2 {
    font-size: 9vw;
  }

  h3 {
    font-size: 4vw;
  }
  .kalam {
    font-size: 14vw;
  }
}
</style>