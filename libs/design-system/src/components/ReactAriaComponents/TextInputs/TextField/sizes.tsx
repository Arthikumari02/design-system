import { SmallAndMedium } from '../../../../types'

interface SizesType {
   inputContainerClassName: string
   inputClassName: string
}

export const sizeStyles: Record<SmallAndMedium, SizesType> = {
   Small: {
      inputContainerClassName:
         'border rounded-md text-md-regular px-lg_border-1 py-md_border-1',
      inputClassName: 'text-md-regular'
   },
   Medium: {
      inputContainerClassName:
         'border rounded-md text-md-regular px-lg_border-1 py-md_border-1',
      inputClassName: 'text-md-regular'
   }
}
