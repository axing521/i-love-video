import { PlayMode } from '../../plugins/config'
import { IVector3 } from '@/models/math/Vector3'

export type IStrip = {
  id: string
  start: number
  length: number
  layer: number
  position?: IVector3
  percent?: number
  readonly type: string
}

export class Strip implements IStrip {
  id: string = ''
  start: number = 0
  length: number = 0
  layer: number = 0
  position?: IVector3 = { x: 0, y: 0, z: 0 }
  percent?: number = 100
  readonly type: string = 'Video'

  get end() {
    return this.start + this.length
  }

  public async update(_time: number, _delta: number, _isPlay: boolean, _playMode: PlayMode, _fps: number) {}

  toInterface(): IStrip {
    return {
      id: this.id,
      layer: this.layer,
      length: this.length,
      start: this.start,
      percent: this.percent,
      type: this.type
    }
  }
}
