import { FocusRingVariant } from '../../../types'

export interface ButtonStyleProps {
   isHovered: boolean
   isPressed: boolean
   hierarchy: string
   subVariant: string
}

export interface ButtonStyles {
   bgColor: string
   border: string
   focusRingVariant: FocusRingVariant
   iconColor: string
}

interface SubVariantsType {
   default: {
      bgColor: string
      border: string
      focusRingVariant: FocusRingVariant
      iconColor: string
   }
   hover: {
      bgColor: string
      border: string
      focusRingVariant: FocusRingVariant
      iconColor: string
   }
   focused: {
      bgColor: string
      border: string
      focusRingVariant: FocusRingVariant
      iconColor: string
   }
}

interface HierarchyThemesType {
   [key: string]: SubVariantsType
}

export interface CloseButtonColorThemeType {
   [key: string]: HierarchyThemesType
}
