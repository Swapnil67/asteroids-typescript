import './style.css'
import { Key, Keyboard } from './keyboard';
import { Vec2 } from './vec2';
import { HEIGHT, WIDTH } from './view';
import { clearScreen, drawShape } from './draw';


const input = new Keyboard(window)

const FIXED_DELTA_TIME = 1000 / 120;

const PLAYER_THRUST = 0.5; 
const PLAYER_MAX_SPEED = 0.3; 
const PLAYER_DRAG = 0.015; 
const PLAYER_FLAME_PULSE_INTERVAL = 100;

export const player = {
  angle: 0,
  thrust: 0,
  lastPulseTime: 0,
  pulse: false,
  pos: new Vec2(100, 100),
  vel: new Vec2(0.2, 0),

  dir(): Vec2 {
    const angleRadians = (this.angle * Math.PI) / 180
    const x = Math.cos(angleRadians)
    const y = Math.sin(angleRadians)
    // console.log(x, y)
    return new Vec2(x, y)
  },
}


function drawPlayer(p: typeof player) {
  const height = 15
  const width = 10

  const vertices = [
    new Vec2(height, 0),
    new Vec2(-height, -width),
    new Vec2(-height + width / 3, -width / 2),
    new Vec2(-height + width / 3, width / 2),
    new Vec2(-height, width),
  ].map((v) => v.rotate(player.angle))
  drawShape(p.pos, vertices)

  // * Draw Flame
  if (p.thrust > 0 && p.pulse) {
    const flameVertices = [
      new Vec2(-height + width / 4, -width / 3),
      new Vec2(-height - width / 4, 0),
      new Vec2(-height + width / 4, width / 3),
    ].map((v) => v.rotate(player.angle))
    // console.log(flameVertices);
    drawShape(p.pos, flameVertices)
  }
}

function update(p: typeof player, dt: number, now: number) {
  p.thrust = 0
  if (input.isKeyDown(Key.ArrowLeft)) {
    p.angle--
  } else if (input.isKeyDown(Key.ArrowRight)) {
    p.angle++
  } else if (input.isKeyDown(Key.ShiftLeft)) {
    // * F = M * A      [Force]
    // * A = F / M      [Acceleration]
    // * V = A * dt     [Velocity]
    p.thrust = PLAYER_THRUST
  }

  if (now - p.lastPulseTime > PLAYER_FLAME_PULSE_INTERVAL) {
    p.pulse = !p.pulse
    p.lastPulseTime = now
  }

  const mass = 1
  const force = p.dir().scale(p.thrust)
  const acceleration = force.scale(1 / mass)
  p.vel.x += acceleration.x * dt
  p.vel.y += acceleration.y * dt

  // * Cap max speed
  const speed = p.vel.magnitude();
  if (speed > PLAYER_MAX_SPEED) {
    p.vel = p.vel.scale(PLAYER_MAX_SPEED / speed)
  }

  // * Apply drag
  p.vel = p.vel.scale(1 - PLAYER_DRAG)

  // console.log(p.angle);
  p.pos.x += p.vel.x * dt;
  p.pos.y += p.vel.y * dt;
  // * Clamp player position
  if (p.pos.x < 0) p.pos.x += WIDTH
  if (p.pos.y < 0) p.pos.y += HEIGHT
  p.pos.x %= WIDTH;
  p.pos.y %= HEIGHT;
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
    update(player, deltaTime, now)
    lag -= FIXED_DELTA_TIME
  }
  drawPlayer(player)

  // * 16.666ms           [For 60 FPS display => 1000 / 60]
  requestAnimationFrame(loop)
}

// function loop2(n: number) {
//   ctx.save()
//   ctx.strokeStyle = 'white'
  
//   // * initial points
//   ctx.translate(50, 50)
  
//   ctx.beginPath()
//   ctx.moveTo(10, 10)
//   ctx.lineTo(40, 10)
//   ctx.lineTo(25, 60)
//   ctx.closePath()
//   ctx.stroke()
  
//   // ctx.beginPath()
//   // ctx.moveTo(100, 100)
//   // ctx.lineTo(20, 20)
//   // ctx.lineTo(0, 40)
//   // ctx.lineTo(0, -1)
//   // ctx.closePath()
//   // ctx.stroke()

//   ctx.restore() 
// }

loop(performance.now())
