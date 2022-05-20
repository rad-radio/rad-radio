<template>
  <div class="home">
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
        <h3>Hosted by Hör</h3>
        <h1>RAD</h1>
        <h3>Presented by Radicle</h3>
        <h1>RADIO</h1>
        <h3>Made possible by Livepeer</h3>
        <h2 id="timer">7d 4h 28m 5s</h2>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Maxi";
  src: url(maxi.ttf) format("truetype");
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
  font-size: 19vw;
  line-height: 85%;
}

h2 {
  font-size: 5vw;
  line-height: 120%;
}

h3 {
  font-size: 2vw;
  color: red;
}

#spinners > * {
  width: 150px;
  height: 150px;
  animation: spin 10s linear 0s infinite;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
}

#spinners #spinner1 {
  background-image: url(spinner1.png);
  top: 2px;
  left: 2px;
}

#spinners #spinner2 {
  background-image: url(spinner2.png);
  top: 2px;
  right: 2px;
}

#spinners #spinner3 {
  background-image: url(spinner3.png);
  bottom: 2px;
  left: 2px;
}

#spinners #spinner4 {
  background-image: url(spinner4.png);
  bottom: 2px;
  right: 2px;
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