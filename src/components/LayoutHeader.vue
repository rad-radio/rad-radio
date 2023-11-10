<script setup lang="ts">
import { ref } from 'vue';
import { useBoard, useEthers, displayEther, shortenAddress, useWallet } from 'vue-dapp'

const { open } = useBoard()
const { address, balance, isActivated } = useEthers()
const { disconnect } = useWallet()

const hover = ref(false);
</script>

<template>
  <header class="w-full px-4">
    <div class="flex justify-between p-4 px-3">
      <nav class="w-full">
        <div class="flex flex-row-reverse">
          <div class="flex items-center space-x-10">
            <div v-if="isActivated" @click="disconnect" @mouseenter="hover = true" @mouseleave="hover = false" class="flex items-center disconnect">
              <!-- Account -->
              <div class="disconnect-overlay" v-if="hover">Disconnect</div>
              <div class="sm:hidden py-2 px-3 rounded-2xl inline-block bg-gray-100">
                {{ shortenAddress(address) }}
              </div>
              <div id="wallet-container" class="hidden sm:flex py-1 px-2 flex items-center rounded-3xl border border-solid">
                <div class="px-1 mr-1">{{ displayEther(balance) }} <span id="eth">ETH</span></div>
                <div id="small-wallet" class="py-2 px-3 rounded-2xl inline-block">
                  {{ shortenAddress(address) }}
                </div>
              </div>
            </div>

            <button v-else @click="open" class="btn">👛 Connect Wallet</button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style>
header {
  position: fixed;
  z-index: 10;
}

#wallet-container {
  border:red solid;
  color: red;
  border-radius: 40px;
  padding: 8px 8px 8px 16px;
}

#small-wallet {
  background:transparent;
  color: red;
  border-radius: 40px;
  padding: 8px 16px;
  border: 1.5px solid red;
}

.disconnect {
  position: relative;
}

.btn {
  color: white !important;
  border: 2px solid white;
  background-color: rgba(0,0,0,0.5) !important;
  border-radius: 48px !important;
  text-transform: uppercase;
  font-feature-settings: "ss02" off;
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.modal {
  background-color: transparent !important;
}

.logo {
  border-radius: 48px !important;
}

.item {
  color: white !important;
}

.line {
  display: none !important;
}

.wallet-item:hover {
  background-color: #C5FF29 !important;
}

.wallet-item:hover .item {
  color: red !important;
}

.modal-inner {
  background: red !important;
}

.disconnect-overlay {
  background-color: red;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-feature-settings: "ss02" off;
}

#eth {
  font-feature-settings: "ss02" off;
}
</style>
