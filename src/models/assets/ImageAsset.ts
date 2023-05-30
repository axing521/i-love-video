import { Asset } from './Asset'

const supportTypes = ['image/png', 'image/jpg', 'image/jpeg']

export class ImageAsset extends Asset {
  override type: string = 'Image'

  public static isSupportType(type: string) {
    return supportTypes.includes(type)
  }
}
