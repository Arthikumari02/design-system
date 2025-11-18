import { ButtonSize } from '../../../types'

interface ButtonSizesType {
   padding: string
   borderRadius: string
   iconSize: {
      width: number
      height: number
   }
}

export const buttonSizes: Record<
   Exclude<ButtonSize, 'ExtraSmall'>,
   ButtonSizesType
> = {
   Small: {
      padding: 'p-md_border-1',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   Medium: {
      padding: 'p-[10px]',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   Large: {
      padding: 'p-lg_border-1',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   ExtraLarge: {
      padding: 'p-[14px]',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 20,
         height: 20
      }
   },
   DoubleExtraLarge: {
      padding: 'p-xl_border-1',
      borderRadius: 'rounded-md',
      iconSize: {
         width: 24,
         height: 24
      }
   }
}
