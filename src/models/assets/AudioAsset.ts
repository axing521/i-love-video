import { Asset } from './Asset'

const supportTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg']

export class AudioAsset extends Asset {
  type: string = 'Audio'

  public static isSupportType(type: string) {
    return supportTypes.includes(type)
  }
}
