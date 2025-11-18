import { BUTTON_THEME } from '../../../Theme/components/ButtonTheme'
import { ButtonStyleProps, ButtonStyles } from './types'

export const getButtonStyles = ({
   isHovered,
   isPressed,
   isDisabled,
   isLoading,
   hierarchy,
   subVariant
}: ButtonStyleProps): ButtonStyles => {
   const isHoveredState = isHovered && !isPressed && !isLoading

   try {
      if (isLoading) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].default.bgColor,
            textColor: BUTTON_THEME[hierarchy][subVariant].default.textColor,
            border: BUTTON_THEME[hierarchy][subVariant].default.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].default.focusRingVariant,
            iconColors: BUTTON_THEME[hierarchy][subVariant].default.iconColors
         }
      }

      if (isHoveredState) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].hover.bgColor,
            textColor: BUTTON_THEME[hierarchy][subVariant].hover.textColor,
            border: BUTTON_THEME[hierarchy][subVariant].hover.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].hover.focusRingVariant,
            iconColors: BUTTON_THEME[hierarchy][subVariant].hover.iconColors
         }
      } else if (isDisabled) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].disabled.bgColor,
            textColor: BUTTON_THEME[hierarchy][subVariant].disabled.textColor,
            border: BUTTON_THEME[hierarchy][subVariant].disabled.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].disabled.focusRingVariant,
            iconColors: BUTTON_THEME[hierarchy][subVariant].disabled.iconColors
         }
      } else if (isPressed) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].focused.bgColor,
            textColor: BUTTON_THEME[hierarchy][subVariant].focused.textColor,
            border: BUTTON_THEME[hierarchy][subVariant].focused.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].focused.focusRingVariant,
            iconColors: BUTTON_THEME[hierarchy][subVariant].focused.iconColors
         }
      }
      return {
         bgColor: BUTTON_THEME[hierarchy][subVariant].default.bgColor,
         textColor: BUTTON_THEME[hierarchy][subVariant].default.textColor,
         border: BUTTON_THEME[hierarchy][subVariant].default.border,
         loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
         focusRingVariant:
            BUTTON_THEME[hierarchy][subVariant].default.focusRingVariant,
         iconColors: BUTTON_THEME[hierarchy][subVariant].default.iconColors
      }
   } catch {
      throw new Error(
         `Hierarchy: ${hierarchy}, SubVariant: ${subVariant} The Combination Doesn't Exit. You can add this combination in the theme config.`
      )
   }
}
