<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

let speed = 10;

let buttonProps = reactive({
    x: 200,
    y: 300,
    xspeed: 1,
    yspeed: 1,
    color: 'rgb(0,0,0)',
});

const tvScreen = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!tvScreen.value) return;
  pickColor();
  update();
})

function update() {
  setTimeout(() => {
    buttonProps.x += buttonProps.xspeed;
    buttonProps.y += buttonProps.yspeed;
    checkHitBox();
    update();   
  }, speed)
}

//Check for border collision
function checkHitBox(){
  if(buttonProps.x + tvScreen.value?.getBoundingClientRect().width! >= window.innerWidth && buttonProps.xspeed > 0 || buttonProps.x <= 0) {
    buttonProps.xspeed *= -1;
    pickColor();
  }
      
  if(buttonProps.y + tvScreen.value?.getBoundingClientRect().height! >= window.innerHeight && buttonProps.yspeed > 0 || buttonProps.y <= 0) {
    buttonProps.yspeed *= -1;
    pickColor();
  }    
}

function pickColor(){
    const r = Math.random() * (254 - 0) + 0;
    const g = Math.random() * (254 - 0) + 0;
    const b = Math.random() * (254 - 0) + 0;

    buttonProps.color = 'rgb('+r+','+g+', '+b+')';
}

</script>

<template>
  <div class="button" ref="tvScreen" :style="{ transform: `translate(${buttonProps.x}px, ${buttonProps.y}px)`, backgroundColor: buttonProps.color }">Donate and get an NFT</div>
</template>

<style scoped>
.button {
  transition: .5s box-shadow ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px;
  border-radius: 48px;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  text-transform: uppercase;
  font-feature-settings: "ss02" off;
  letter-spacing: .1em;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.4), 0px 11px 26px rgba(0, 0, 0, 0.25), inset 0px -4px 30px rgba(0, 0, 0, 0.8);
}

.button:hover {
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.6), 0px 22px 50px rgba(0, 0, 0, 0.5), inset 0px -4px 30px rgba(0, 0, 0, 0.8);
}
</style>
