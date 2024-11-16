import { Vec2 } from "./vec2"
import { ctx, HEIGHT, WIDTH } from "./view"


export enum Color {
  Entities = 'white',
  Background = '#222222',
}

export function clearScreen(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = Color.Background
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

export function drawShape(
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  vertices: Array<Vec2>
) {
  ctx.save()
  ctx.strokeStyle = Color.Entities

  // * initial points
  ctx.translate(pos.x, pos.y)

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
