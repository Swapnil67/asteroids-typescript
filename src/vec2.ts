export class Vec2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static get zero() {
    return new Vec2(0, 0)
  }

  rotate(angle: number): Vec2 {
    const angleInRadians = (angle * Math.PI) / 180
    const sinTheta = Math.sin(angleInRadians)
    const cosTheta = Math.cos(angleInRadians)

    const nx = this.x * cosTheta - this.y * sinTheta
    const ny = this.x * sinTheta + this.y * cosTheta

    return new Vec2(nx, ny)
  }
  add(that: Vec2): Vec2 {
    return new Vec2(this.x + that.x, this.y + that.y)
  }

  sub(that: Vec2): Vec2 {
    return new Vec2(this.x - that.x, this.y - that.y)
  }

  // * Length of vector
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  scale(factor: number): Vec2 {
    return new Vec2(this.x * factor, this.y * factor)
  }

  array(): [number, number] {
    return [this.x, this.y]
  }
}
