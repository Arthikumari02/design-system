import { Axis } from './types'

export const checkboxButtonLabelClass = `text-sm font-medium text-secondary-700`

export const getStylesBasedOnAxis = (axis?: Axis): string => {
   switch (axis) {
      case 'horizontal':
         return `mr-4xl`
      case 'vertical':
         return `mb-md`
      default:
         return ``
   }
}

export const getAxisStyles = (axis?: Axis): string => {
   switch (axis) {
      case 'horizontal':
         return `flex flex-row`
      case 'vertical':
         return `flex flex-col`
      default:
         return ``
   }
}

export const checkboxContainerStyles = `flex  items-center`
