<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div id="spinners">
      <a id="spinner1" href="/about"></a>
      <a id="spinner2" href="https://livepeer.org/" target="_blank"></a>
      <a id="spinner3" href="https://www.drips.network/" target="_blank"></a>
      <a id="spinner4" href="https://streameth.org/" target="_blank"></a>
    </div>

    <div id="tribals">
        <div id="tribal1"></div>
        <div id="tribal2"></div>
        <div id="tribal3"></div>
        <div id="tribal4"></div>
    </div>

    <div id="text">
      <h3>A live music streaming platform built on <br class="desktop-break" /><a href="https://livepeer.org/" target="_blank">Livepeer</a>, <a href="https://drips.network" target="_blank">Drips Network</a>, and <a href="https://streameth.org/" target="_blank">StreamETH.</a></h3>
      <h1>RAD</h1>
      <h3>We built it because we’re tired of the middlemen.</h3>
      <h1>RADIO</h1>
      <h3>Want to stream with us? <a href="mailto:radradiolive@gmail.com" target="_blank">Contact us.</a></h3>
      <h3>Follow us on <a href="https://x.com/RadRadioLive" target="_blank">X</a>.</h3>
      <h3><a href="/">← Back</a> to home.</h3>

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

#social {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75%;
}


h1,
h2,
h3 {
  margin: 0;
  cursor: default;
}

/* When lineup */
h1 {
  font-size: 20vw;
  line-height: 85%;
  color:blue;
  margin: 16px 0;
}

h1.small {
  font-size: 2vw;
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
  text-align: center;
}

h3 a {
  border: 2px solid transparent;
}

h3 a:hover {
  border-radius: 100%;
  border: 2px solid red;
}

h4 {
  font-size: 2vw;
  color: black;
  z-index: 100;
  text-align: center;
  width: 60%;
  margin: 0 auto;
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
  .desktop-break {
  display: none;
}
}
</style>