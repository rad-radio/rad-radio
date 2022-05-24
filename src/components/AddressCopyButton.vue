<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  address: String,
});

const parts = computed(() => [
  props.address?.replace('0x', '').substring(0, 4),
  props.address?.replace('0x', '').substring(36,40)
]);

const copyAddress = async () => {
  const type = 'text/plain';
  const blob = new Blob([props.address!], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  await navigator.clipboard.write(data);

  buttonText.value = '✅ COPIED';

  setTimeout(() => {
    buttonText.value = 'COPY';
  }, 1000)
}

const buttonText = ref('COPY');
</script>

<template>
  <div class="address-copy-button">
    <div class="address">
      {{parts[0]}}—{{parts[1]}}
    </div>
    <button @click="copyAddress">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
  .address-copy-button {
    display: flex;
    gap: 8px;
  }
  .address {
    font-size: 24px;
  }

  button {
    outline: 1px solid white;
    padding: 0 8px;
    border-radius: 64px;
  }
</style>
