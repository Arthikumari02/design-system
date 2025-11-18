import { SmallAndMedium } from '../../types'
import { ToggleSizesType } from './types'

export const toggleSizes: Record<SmallAndMedium, ToggleSizesType> = {
   Small: {
      trackStyles: {
         width: '36px',
         height: '20px'
      },
      thumbStyles: {
         width: '16px',
         height: '16px'
      }
   },
   Medium: {
      trackStyles: {
         width: '44px',
         height: '24px'
      },
      thumbStyles: {
         width: '20px',
         height: '20px'
      }
   }
}
