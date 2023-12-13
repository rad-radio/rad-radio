<script lang="ts" setup>
  // App.vue
  import { MetaMaskConnector, WalletConnectConnector, CoinbaseWalletConnector } from 'vue-dapp'
  import { WalletConnectModal } from '@walletconnect/modal'
  console.log(WalletConnectModal)

  const infuraId = '1c7ce1644b5b46f5a19028f13de996e4';

  const connectors = [
    new MetaMaskConnector({
      appUrl: 'http://rad.lol/',
    }),
    new WalletConnectConnector({
      projectId: '39a3e5b79543dc8196b1893d2ebb68c1',
      chains: [1],
      showQrModal: true,
    }),
    new CoinbaseWalletConnector({
      appName: 'Rad Radio',
      jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
    }),
  ]

  function connectErrorHandler(error: Error) {
    console.error(error)
  }
</script>

<template>
  <router-view />
  <vd-board :connectErrorHandler="connectErrorHandler" :connectors="connectors" dark />
</template>

<style>
* {
  --spinner-margin: 20px;
}

#spinners > * {
  width: 50px;
  height: 50px;
  animation: spin 10s linear 0s infinite;
  background-size: contain;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 100;
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
/* 
#spinner5 {
  background-image: url(/spinner3.png);
  bottom: var(--spinner-margin);
  right: var(--spinner-margin);
} */

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
  top: -30px;
}

#tribal2 /* right */ {
  height: var(--tribal-width);
  width: var(--tribal-height);
  background-image: url(/tribal2.png);
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  right: -40px;
}

#tribal3 {
  width: var(--tribal-height);
  height: var(--tribal-width);
  background-image: url(/tribal3.png);
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  left: -32px;
}

#tribal4 /* bottom */ {
  height: var(--tribal-height);
  width: var(--tribal-width);
  background-image: url(/tribal4.png);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: -30px;
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
