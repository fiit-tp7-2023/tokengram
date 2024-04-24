<template>
  <div class="wrapper">
    <div class="inner-content" @mousemove="updateMousePoint">
      <h1 id="typewriter-title">T</h1>
      <h2 id="typewriter-subtext">&nbsp;</h2>
      <NuxtLink to="/home" class="main-link">Explore more</NuxtLink>
    </div>
    <canvas id="background"></canvas>
  </div>
</template>

<script lang="ts" setup>
import type { BgOptions, Vector2 } from '~/types/bg-helper';
import { Particle } from '~/utils/particle';
definePageMeta({
  layout: 'plain',
});

const initTypingEffect = (elem: string, text: string, speed: number, finishCb?: Function) => {
  let index = 0;
  const element = document.querySelector(elem)!;
  const typing = () => {
    if (index < text.length) {
      // Random erase effect
      if (Math.random() < 0.07 && element.innerHTML.length > 1) {
        element.innerHTML = element.innerHTML.slice(0, -1);
        index--;
      } else {
        element.innerHTML += text.charAt(index);
        index++;
      }
      setTimeout(typing, speed);
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
  particleAmount: 50,
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
const mousePoint = ref<Vector2>({ x: 0, y: 0 });
const d = ref(0);

onMounted(() => {
  init();
  initTypingEffect('#typewriter-title', 'okenGram', 100, () => {
    initTypingEffect('#typewriter-subtext', 'Welcome to the decentralized social network', 50);
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

function updateMousePoint(e: MouseEvent) {
  if (!canvas.value) return;
  d.value = Math.min(Math.max(Math.abs(mousePoint.value.x - e.x), 10), 20);
  mousePoint.value = { x: e.x - canvas.value.offsetLeft, y: e.offsetY };
}

function resizeReset() {
  if (!canvas.value) return;
  bgWidth.value = canvas.value.width = document.body.clientWidth;
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
  setTimeout(() => {
    id.value = requestAnimationFrame(animationLoop);
  }, 1000 / 60);
}

function drawScene() {
  drawLine();
  drawParticle();
}

function drawParticle() {
  if (!ctx.value) return;
  for (const particle of particles.value) {
    particle.update();
    particle.draw();
  }
  // Draw mouse point
  ctx.value.strokeStyle = 'rgba(255,255,255)';
  ctx.value.lineWidth = 2;
  ctx.value.beginPath();
  ctx.value.arc(mousePoint.value.x, mousePoint.value.y, d.value, 0, Math.PI * 2);
  ctx.value.closePath();
  ctx.value.stroke();
}

function drawLine() {
  for (const particle of particles.value) {
    linkPoints(particle, particles.value);
  }
}

function linkPoints(point: Particle, hubs: Vector2[]) {
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
