import { BasicSize } from '../../../types'

interface SizesType {
   inputClassName: string
}

export const sizeStyles: Record<BasicSize, SizesType> = {
   ExtraSmall: {
      inputClassName: 'text-md-regular py-sm px-md gap-md'
   },
   Small: {
      inputClassName: 'text-md-regular py-sm px-md gap-md'
   },
   Medium: {
      inputClassName: 'text-md-regular py-md px-lg gap-md'
   }
}
