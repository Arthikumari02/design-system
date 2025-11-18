import { ButtonSize } from '../../../types'

interface ButtonSizesType {
   typography: string
   padding: string
   leftIconMargin: string
   rightIconMargin: string
   borderRadius: string
}

export const buttonSizes: Record<ButtonSize, ButtonSizesType> = {
   ExtraSmall: {
      typography: 'text-sm-semibold',
      padding: 'py-xs px-md',
      leftIconMargin: 'mr-xs',
      rightIconMargin: 'ml-xs',
      borderRadius: 'rounded-sm'
   },
   Small: {
      typography: 'text-sm-semibold',
      padding: 'py-md px-lg',
      leftIconMargin: 'mr-xs',
      rightIconMargin: 'ml-xs',
      borderRadius: 'rounded-md'
   },
   Medium: {
      typography: 'text-sm-semibold',
      padding: 'py-md-utility px-lg-utility',
      leftIconMargin: 'mr-xs',
      rightIconMargin: 'ml-xs',
      borderRadius: 'rounded-md'
   },
   Large: {
      typography: 'text-md-semibold',
      padding: 'py-md-utility px-xl',
      leftIconMargin: 'mr-sm',
      rightIconMargin: 'ml-sm',
      borderRadius: 'rounded-md'
   },
   ExtraLarge: {
      typography: 'text-md-semibold',
      padding: 'py-lg px-xl-utility',
      leftIconMargin: 'mr-sm',
      rightIconMargin: 'ml-sm',
      borderRadius: 'rounded-md'
   },
   DoubleExtraLarge: {
      typography: 'text-lg-semibold',
      padding: 'py-xl px-2xl-utility',
      leftIconMargin: 'mr-md-utility',
      rightIconMargin: 'ml-md-utility',
      borderRadius: 'rounded-md'
   }
}
