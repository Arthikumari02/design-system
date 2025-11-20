import { FocusRingVariant } from '../../../types'

export interface ButtonStyleProps {
   isHovered: boolean
   isPressed: boolean
   isDisabled: boolean
   isLoading?: boolean
   hierarchy: string
   subVariant: string
}

export interface ButtonStyles {
   bgColor: string
   textColor: string
   border: string
   loaderColor: string
   focusRingVariant: FocusRingVariant
   iconColors: ButtonIconColors
}

export interface ButtonIconColors {
   stroke: string
   fill: string
}

export interface IconColors {
   fill: string
   stroke: string
}

export interface SubVariantsThemeType {
   loaderColor: string
   default: {
      bgColor: string
      textColor: string
      focusRingVariant: FocusRingVariant
      border: string
      iconColors: ButtonIconColors
   }
   hover: {
      textColor: string
      bgColor: string
      focusRingVariant: FocusRingVariant
      border: string
      iconColors: ButtonIconColors
   }
   focused: {
      textColor: string
      bgColor: string
      focusRingVariant: FocusRingVariant
      border: string
      iconColors: ButtonIconColors
   }
   disabled: {
      textColor: string
      bgColor: string
      focusRingVariant: FocusRingVariant
      border: string
      iconColors: ButtonIconColors
   }
}

export interface HierarchyThemesType {
   [key: string]: SubVariantsThemeType
}

export interface ButtonColorThemeType {
   [key: string]: HierarchyThemesType
}
