import { BasicSize } from '../../../types'

interface SizesType {
   inputClassName: string
}

export const sizeStyles: Record<BasicSize, SizesType> = {
   ExtraSmall: {
      inputClassName: 'text-sm-regular'
   },
   Small: {
      inputClassName: 'text-md-regular'
   },
   Medium: {
      inputClassName: 'text-md-regular'
   }
}
