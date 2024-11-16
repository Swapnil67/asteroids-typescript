import { Asteroid } from './asteroid'
import { Ship } from './player'
import { WIDTH, HEIGHT } from './view'

type Entity = Asteroid | Ship

export function applyBasicMovement(
  entity: Entity,
  dt: number,
  opts: { wrap: boolean }
) {
  entity.pos = entity.pos.add(entity.vel.scale(dt))
  // * Clamp entity position
  if (opts.wrap) {
    if (entity.pos.x < 0) entity.pos.x += WIDTH
    if (entity.pos.y < 0) entity.pos.y += HEIGHT
    entity.pos.x %= WIDTH
    entity.pos.y %= HEIGHT
  }
}
