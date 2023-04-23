import * as THREE from 'three'
import { Asset } from './Asset'

export class FontAsset extends Asset {
  public static defaultFont: FontAsset
  type: string = 'Font'

  public static init() {
    return new Promise<void>((resolve, reject) => {
      try {
        const loader = new THREE.FontLoader()
        const defaultFontPath = '/static/assets/font/gentilis_bold.typeface.json'
        loader.load(
          defaultFontPath,
          () => {
            FontAsset.defaultFont = new FontAsset('gentilis_bold', 'gentilis_bold', defaultFontPath)
            resolve()
          },
          undefined,
          e => reject(e.error)
        )
      } catch (e) {
        reject(e)
      }
    })
  }
}
