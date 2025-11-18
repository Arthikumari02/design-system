import { SmallMediumAndLarge } from '../../../types'

interface ButtonSizesType {
   padding: string
   borderRadius: string
   iconSize: {
      width: number
      height: number
   }
}

export const buttonSizes: Record<SmallMediumAndLarge, ButtonSizesType> = {
   Small: {
      padding: 'p-md',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   Medium: {
      padding: 'p-md',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   Large: {
      padding: 'p-md',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 24,
         height: 24
      }
   }
}
