import { drawShape } from './draw'
import { Key, Keyboard } from './keyboard'
import { applyBasicMovement } from './movment'
import { Vec2 } from './vec2'

const PLAYER_THRUST = 0.5; 
const PLAYER_MAX_SPEED = 0.3; 
const PLAYER_DRAG = 0.015; 
const PLAYER_FLAME_PULSE_INTERVAL = 100;
const PLAYER_ROTATION_DELTA = 0.3;

export class Ship {
  angle: number
  thrust: number
  lastPulseTime: number
  pulse: boolean

  constructor(public pos: Vec2, public vel: Vec2, private input: Keyboard) {
    this.angle = 0
    this.thrust = 0
    this.lastPulseTime = 0
    this.pulse = false
  }

  dir(): Vec2 {
    const angleRadians = (this.angle * Math.PI) / 180
    const x = Math.cos(angleRadians)
    const y = Math.sin(angleRadians)
    return new Vec2(x, y)
  }

  draw(ctx: CanvasRenderingContext2D) {
    const height = 15
    const width = 10

    const vertices = [
      new Vec2(height, 0),
      new Vec2(-height, -width),
      new Vec2(-height + width / 3, -width / 2),
      new Vec2(-height + width / 3, width / 2),
      new Vec2(-height, width),
    ].map((v) => v.rotate(this.angle))
    drawShape(ctx, this.pos, vertices)

    // * Draw Flame
    if (this.thrust > 0 && this.pulse) {
      const flameVertices = [
        new Vec2(-height + width / 4, -width / 3),
        new Vec2(-height - width / 4, 0),
        new Vec2(-height + width / 4, width / 3),
      ].map((v) => v.rotate(this.angle))
      // console.log(flameVertices);
      drawShape(ctx, this.pos, flameVertices)
    }
  }

  update(dt: number, now: number) {
    this.thrust = 0
    if (this.input.isKeyDown(Key.ArrowLeft)) {
      this.angle -= PLAYER_ROTATION_DELTA * dt
    } else if (this.input.isKeyDown(Key.ArrowRight)) {
      this.angle += PLAYER_ROTATION_DELTA * dt
    } else if (this.input.isKeyDown(Key.ShiftLeft)) {
      // * F = M * A      [Force]
      // * A = F / M      [Acceleration]
      // * V = A * dt     [Velocity]
      this.thrust = PLAYER_THRUST
    }

    if (now - this.lastPulseTime > PLAYER_FLAME_PULSE_INTERVAL) {
      this.pulse = !this.pulse
      this.lastPulseTime = now
    }

    const mass = 10
    const force = this.dir().scale(this.thrust)
    const acceleration = force.scale(1 / mass)
    this.vel.x += acceleration.x * dt
    this.vel.y += acceleration.y * dt

    // * Cap max speed
    const speed = this.vel.magnitude()
    if (speed > PLAYER_MAX_SPEED) {
      this.vel = this.vel.scale(PLAYER_MAX_SPEED / speed)
    }

    // * Apply drag
    this.vel = this.vel.scale(1 - PLAYER_DRAG)

    // * Update player position
    applyBasicMovement(this, dt, { wrap: true })
  }
}
