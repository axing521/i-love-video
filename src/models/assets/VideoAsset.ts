import { Asset } from './Asset'

const supportTypes = ['video/mp4', 'video/webm', 'video/quicktime']

export class VideoAsset extends Asset {
  type: string = 'Video'

  public static isSupportType(type: string) {
    return supportTypes.includes(type)
  }
}
