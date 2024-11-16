import './style.css'
import { Vec2 } from './vec2';
import { Keyboard } from './keyboard'
import { clearScreen } from './draw'
import { Asteroid, AsteroidSize } from './asteroid';
import { ctx } from './view';
import { Ship } from './player';


const FIXED_DELTA_TIME = 1000 / 120;

const input = new Keyboard(window)
const player = new Ship(new Vec2(200, 200), new Vec2(0.2, 0.2), input)
const asteroid = new Asteroid(
  new Vec2(200, 200),
  new Vec2(0.1, 0.1),
  AsteroidSize.Large,
  2
)

let lag = 0                   // * Accumlation of dt
let lastTime = 0

// * Game Update
function update(dt: number, now: number) {
  player.update(dt, now)
  asteroid.update(dt, now)
}

// * Game Draw
function draw(ctx: CanvasRenderingContext2D) {
  player.draw(ctx)
  asteroid.draw(ctx)
}

function loop(now: number) {
  let deltaTime = now - lastTime
  lag += deltaTime
  lastTime = now

  // * update             [Physics & Rendering]
  clearScreen(ctx)
  while (lag >= FIXED_DELTA_TIME) {
    update(deltaTime, now)
    lag -= FIXED_DELTA_TIME
  }

  // * Render Graphics
  draw(ctx)

  // * 16.666ms           [For 60 FPS display => 1000 / 60]
  requestAnimationFrame(loop)
}

loop(performance.now())


// * For testing purpose

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

