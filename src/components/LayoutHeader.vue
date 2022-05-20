<script setup lang="ts">
import { useBoard, useEthers, displayEther, shortenAddress } from 'vue-dapp'

const { open } = useBoard()
const { address, balance, isActivated } = useEthers()
</script>

<template>
  <header class="w-full px-4">
    <div class="flex justify-between p-4 px-3">
      <nav class="w-full">
        <div class="flex flex-row-reverse">
          <div class="flex items-center space-x-10">
            <div v-if="isActivated" class="flex items-center">
              <!-- Account -->
              <div class="sm:hidden py-2 px-3 rounded-2xl inline-block bg-gray-100">
                {{ shortenAddress(address) }}
              </div>

              <div class="hidden sm:flex py-1 px-2 flex items-center rounded-3xl border border-solid">
                <div class="px-1 mr-1">{{ displayEther(balance) }} ETH</div>
                <div class="py-2 px-3 rounded-2xl inline-block bg-gray-100">
                  {{ shortenAddress(address) }}
                </div>
              </div>
            </div>

            <button v-else @click="open" class="btn">Connect Wallet</button>
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
</style>
