<template>
  <div class="wrapper">
    <div class="inner-content">
      <h1 id="typewriter-title">T</h1>
      <h2 id="typewriter-subtext">&nbsp;</h2>
      <NuxtLink to="/home" class="main-link">Explore more</NuxtLink>
    </div>
    <canvas id="background"></canvas>
  </div>
</template>

<script lang="ts" setup>
import type { BgOptions } from '~/types/bg-helper';
import { Particle } from '~/utils/particle';
definePageMeta({
  layout: 'plain',
});

const initTypingEffect = (elem: string, text: string, finishCb?: Function) => {
  let index = 0;
  const element = document.querySelector(elem)!;
  const typing = () => {
    if (index < text.length) {
      // Random erase effect
      if (Math.random() < 0.1) {
        element.innerHTML = element.innerHTML.slice(0, -1);
        index--;
      } else {
        element.innerHTML += text.charAt(index);
        index++;
      }
      setTimeout(typing, 80);
    } else if (finishCb) {
      finishCb();
    }
  };
  typing();
};

// Inspired by: https://www.youtube.com/watch?v=m9fXNVFC1qI

const OPTIONS: BgOptions = {
  particleColor: 'rgba(255,255,255)',
  lineColor: 'rgba(245, 40, 145, 0.8)',
  particleAmount: 100,
  defaultRadius: 2,
  variantRadius: 2,
  defaultSpeed: 1,
  variantSpeed: 1,
  linkRadius: 300,
};

const RGB = OPTIONS.lineColor.match(/\d+/g) as string[];

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const bgWidth = ref(0);
const bgHeight = ref(0);
const particles = ref<Particle[]>([]);
const loopId = ref<number | null>(null);
const id = ref<number | null>(null);

onMounted(() => {
  init();
  initTypingEffect('#typewriter-title', 'okenGram', () => {
    initTypingEffect('#typewriter-subtext', 'Welcome to the decentralized social network');
  });

  addEventListener('resize', () => {
    if (loopId.value) {
      cancelAnimationFrame(loopId.value);
    }
    if (id.value) {
      cancelAnimationFrame(id.value);
    }
    resizeReset();
    initializeElements();
    startAnimation();
  });
});

function init() {
  canvas.value = document.getElementById('background') as HTMLCanvasElement;
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext('2d');
  resizeReset();
  initializeElements();
  startAnimation();
}

function resizeReset() {
  if (!canvas.value) return;
  bgWidth.value = canvas.value.width = window.outerWidth;
  bgHeight.value = canvas.value.height = window.innerHeight;
}

function initializeElements() {
  if (!ctx.value) return;
  particles.value = [];
  for (let i = 0; i < OPTIONS.particleAmount; i++) {
    particles.value.push(new Particle(bgWidth.value, bgHeight.value, OPTIONS, ctx.value));
  }
}

function startAnimation() {
  loopId.value = requestAnimationFrame(animationLoop);
}

function animationLoop() {
  if (!ctx.value) return;
  ctx.value.clearRect(0, 0, bgWidth.value, bgHeight.value);
  drawScene();

  id.value = requestAnimationFrame(animationLoop);
}

function drawScene() {
  drawLine();
  drawParticle();
}

function drawParticle() {
  for (const particle of particles.value) {
    particle.update();
    particle.draw();
  }
}

function drawLine() {
  for (const particle of particles.value) {
    linkPoints(particle, particles.value);
  }
}

function linkPoints(point: Particle, hubs: Particle[]) {
  if (!ctx.value) return;
  for (let i = 0; i < hubs.length; i++) {
    const distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
    const opacity = 1 - distance / OPTIONS.linkRadius;
    if (opacity > 0) {
      ctx.value.lineWidth = 0.5;
      ctx.value.strokeStyle = 'rgba(' + RGB[0] + ',' + RGB[1] + ',' + RGB[2] + ',' + opacity + ')';
      ctx.value.beginPath();
      ctx.value.moveTo(point.x, point.y);
      ctx.value.lineTo(hubs[i].x, hubs[i].y);
      ctx.value.closePath();
      ctx.value.stroke();
    }
  }
}

function checkDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
</script>

<style scoped>
.wrapper {
  @apply w-full h-full flex flex-col items-center justify-center relative bg-black;

  canvas {
    @apply absolute top-0 left-0 opacity-15 z-0;
  }

  .inner-content {
    @apply w-full h-full flex flex-col items-center justify-center gap-10 z-10;

    h1 {
      @apply text-8xl font-bold text-pink-500;
    }

    h2 {
      @apply text-xl font-semibold text-purple-200;
    }

    .main-link {
      @apply px-4 py-2 mt-4 text-white bg-purple-500 rounded-md w-1/4 text-center;
    }
  }
}
</style>
