<template>
  <router-view />
  <vdapp-board />
</template>

<style>
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

#logo {
  width: var(--tribal-width);
  height: var(--tribal-height);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 40px;
  padding-top: 8px;
  color:blue;
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
