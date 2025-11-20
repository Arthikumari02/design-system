import { ButtonSize } from '../../../types'

interface ButtonSizesType {
   typography: string
   padding: string
   borderRadius: string
   gap: string
}

export const buttonSizes: Record<ButtonSize, ButtonSizesType> = {
   ExtraSmall: {
      typography: 'text-sm-semibold',
      padding: 'py-xs px-md',
      borderRadius: 'rounded-sm',
      gap: 'gap-xs'
   },
   Small: {
      typography: 'text-sm-semibold',
      padding: 'py-md px-lg',
      borderRadius: 'rounded-md',
      gap: 'gap-xs'
   },
   Medium: {
      typography: 'text-sm-semibold',
      padding: 'py-md-utility px-lg-utility',
      borderRadius: 'rounded-md',
      gap: 'gap-xs'
   },
   Large: {
      typography: 'text-md-semibold',
      padding: 'py-md-utility px-xl',
      borderRadius: 'rounded-md',
      gap: 'gap-sm'
   },
   ExtraLarge: {
      typography: 'text-md-semibold',
      padding: 'py-lg px-xl-utility',
      borderRadius: 'rounded-md',
      gap: 'gap-sm'
   },
   DoubleExtraLarge: {
      typography: 'text-lg-semibold',
      padding: 'py-xl px-2xl-utility',
      borderRadius: 'rounded-md',
      gap: 'gap-md'
   }
}
