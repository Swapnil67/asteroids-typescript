import './style.css'
import { Key, Keyboard } from './keyboard';
import { Vec2 } from './vec2';

const canvas = document.querySelector<HTMLCanvasElement>('#game')!;
const ctx = canvas.getContext('2d')!;

const input = new Keyboard(window)

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FIXED_DELTA_TIME = 1000 / 120;


const player = {
  angle: 0,
  pos: new Vec2(100, 100),
  vel: new Vec2(0.2, 0)
}

function drawPlayer(p: typeof player) {
  const height = 15
  const width = 10

  const vertices = [
    new Vec2(height, 0),
    new Vec2(-height, -width),
    new Vec2(-height, width),
  ].map(v => v.rotate(player.angle))

  ctx.save()
  ctx.strokeStyle = 'white'
  // * initial points
  ctx.translate(p.pos.x, p.pos.y)
  ctx.beginPath()
  const [tip, ...tail] = vertices
  // * Move initial point to
  ctx.moveTo(tip.x, tip.y)
  for (let vertex of tail) {
    // console.log(vertex);
    ctx.lineTo(vertex.x, vertex.y)
  }
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function clearScreen() {
  ctx.fillStyle = '#222222'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

function update(p: typeof player, dt: number) {
  if(input.isKeyDown(Key.ArrowLeft)) {
    p.angle--;
  } else if(input.isKeyDown(Key.ArrowRight)) {
    p.angle++;
  }
  // console.log(p.angle);
  
  p.pos.x += p.vel.x * dt;
  p.pos.y += p.vel.y * dt;
  p.pos.x %= WIDTH;
}

let lag = 0                   // * Accumlation of dt
let lastTime = 0

function loop(now: number) {
  // console.log("now ", now);
  let deltaTime = now - lastTime
  // console.log("deltaTime ", deltaTime.toFixed(2));
  lag += deltaTime
  // console.log("lag ", lag.toFixed(2));
  lastTime = now

  // * update             [Physics & Rendering]
  clearScreen()
  while (lag >= FIXED_DELTA_TIME) {
    update(player, deltaTime)
    lag -= FIXED_DELTA_TIME
  }
  drawPlayer(player)

  // * 16.666ms           [For 60 FPS display => 1000 / 60]
  requestAnimationFrame(loop)
}

loop(performance.now())
