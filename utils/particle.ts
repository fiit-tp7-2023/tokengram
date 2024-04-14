import type { BgOptions, Vector2 } from '~/types/bg-helper';

export class Particle implements Vector2 {
  x: number;
  y: number;
  color: string;
  radius: number;
  speed: number;
  directionAngle: number;
  vector: Vector2;
  ctx: CanvasRenderingContext2D;
  screenW: number;
  screenH: number;

  constructor(width: number, height: number, options: BgOptions, ctx: CanvasRenderingContext2D) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.color = options.particleColor;
    this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    this.ctx = ctx;
    this.screenW = width;
    this.screenH = height;
  }

  update() {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border() {
    if (this.x >= this.screenW || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= this.screenH || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > this.screenW) this.x = this.screenW;
    if (this.y > this.screenH) this.y = this.screenH;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
