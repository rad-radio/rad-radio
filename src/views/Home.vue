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
        <h2>RAD RADIO</h2>
        <h3>Hosted by Hör</h3>
        <h1>Yha Yha</h1>
        <h3>Presented by Radicle</h3>
        <h1>DJ Heartstring</h1>
        <h3>Made possible by Livepeer</h3>
        <h2 id="timer">7D 4H 28M 5S</h2>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Maxi";
  src: url(/maxi.ttf) format("truetype");
}

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
  font-size: 11vw;
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
</style>