import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#game')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FIXED_DELTA_TIME = 1000 / 120;


const player = {
  angle: 0,
  pos: {
    x: 100,
    y: 100,
  },
  vel: {
    x: 0.2,
    y: 0
  }
};



function drawPlayer(p: typeof player) {
  const height = 15;
  const width = 10;
  
  const vertices = [
    {x: height, y: 0},
    {x: -height, y: -width},
    {x: -height, y: width},
  ]

  ctx.save()
  ctx.strokeStyle = 'white'
  // * initial points
  ctx.translate(p.pos.x, p.pos.y);
  ctx.rotate((player.angle * Math.PI) / 180)
  ctx.beginPath();
  const [tip, ...tail] = vertices;
  // * Move initial point to
  ctx.moveTo(tip.x, tip.y);
  for(let vertex of tail) {
    // console.log(vertex);
    ctx.lineTo(vertex.x, vertex.y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore()
}

function clearScreen() {
  ctx.fillStyle = '#222222'
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function update(p: typeof player, dt: number) {
  p.angle++
  // p.pos.x += p.vel.x * dt;
  // p.pos.y += p.vel.y * dt;
  // p.pos.x %= WIDTH;
}

let lag = 0                   // * Accumlation of dt
let lastTime = 0

function loop(now: number) {
  // console.log("now ", now);
  let deltaTime = now - lastTime;
  // console.log("deltaTime ", deltaTime.toFixed(2));
  lag += deltaTime;
  // console.log("lag ", lag.toFixed(2));
  lastTime = now;

  // * update             [Physics & Rendering]
  clearScreen()
  while(lag >= FIXED_DELTA_TIME) {
    update(player, deltaTime)
    lag -= FIXED_DELTA_TIME;
  }
  drawPlayer(player)

  // * 16.666ms           [For 60 FPS display => 1000 / 60]
  requestAnimationFrame(loop)
}

loop(performance.now())
