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
        <!-- <h2>RAD RADIO presents</h2> -->
        <h3>RAD RADIO presents</h3>
        <h1>Veronika Fleyta</h1>
        <h3>Hosted by <a href="https://twitter.com/letsraave?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">rAAVE</a></h3>
        <h1>Parallelle</h1>
        <h3>Made possible by <a href="https://www.drips.network/" target="_blank">Drips</a>, <a href="https://livepeer.org/" target="_blank">Livepeer</a>, and <a href="https://streameth.org/" target="_blank">StreamETH</a></h3>
        <h1>Xinobi Jamiie</h1>
        <h3>Featuring <a href="https://www.lens.xyz/" target="_blank">Lens</a></h3>
        
        <h2 id="timer">
          <vue-countdown :time="(1653510600 * 1000) - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }">
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
  cursor: default;
}

h1 {
  /* font-size: 11vw; smaller headline for when the DJs are announced*/
  font-size: 8vw;
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
</style>