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
        <h1>YUI</h1>
        <h3>Presented by <a href="https://radicle.xyz/" target="_blank">Radicle</a></h3>
        <h1>Yha Yha b2b<br>Jasmine Infiniti</h1>
        <h3>Streamed with <a href="https://livepeer.org/" target="_blank">Livepeer</a></h3>
        <h1>Bauernfeind</h1>
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
  font-size: 10vw;
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