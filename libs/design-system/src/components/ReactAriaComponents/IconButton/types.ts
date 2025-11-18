import { FocusRingVariant } from '../../../types'

export interface ButtonStyleProps {
   isHovered: boolean
   isPressed: boolean
   isDisabled: boolean
   hierarchy: string
   subVariant: string
}

export interface IconStyles {
   stroke: string
   fill: string
   width?: number
   height?: number
}
export interface ButtonStyles {
   bgColor: string
   border: string
   loaderColor: string
   focusRingVariant: FocusRingVariant
   iconColors: IconStyles
}
