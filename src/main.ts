import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#game')!;
const ctx = canvas.getContext('2d')!;

const player = {
  pos: {
    x: 100,
    y: 100,
  },
};

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

function drawPlayer() {
  const height = 15;
  const width = 10;
  
  const vertices = [
    {x: height, y: 0},
    {x: -height, y: -width},
    {x: -height, y: width},
  ]

  ctx.save()
  ctx.strokeStyle = 'white'
  ctx.translate(player.pos.x, player.pos.y);
  ctx.beginPath();
  const [tip, ...tail] = vertices;

  console.log(tip, tail);
  ctx.moveTo(tip.x, tip.y);
  for(let vertex of tail) {
    ctx.lineTo(vertex.x, vertex.y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore()
}

ctx.fillStyle = '#222222'
ctx.fillRect(0, 0, WIDTH, HEIGHT);

drawPlayer()

