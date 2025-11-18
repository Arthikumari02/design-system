import { FocusRingVariant } from '../../types'

export interface ToggleThemeType {
   default: {
      bgColor: string
      thumbColor: string
      focusRingVariant: FocusRingVariant
   }
   hover: {
      bgColor: string
      thumbColor: string
      focusRingVariant: FocusRingVariant
   }
   focused: {
      bgColor: string
      thumbColor: string
      focusRingVariant: FocusRingVariant
   }
   disabled: {
      bgColor: string
      thumbColor: string
      focusRingVariant: FocusRingVariant
   }
}

interface TrackStyles {
   width: string
   height: string
}
interface ThumbStyles {
   width: string
   height: string
}

export interface ToggleSizesType {
   trackStyles: TrackStyles
   thumbStyles: ThumbStyles
}
