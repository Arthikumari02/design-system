import { CLOSE_BUTTON_THEME, CloseButtonSubVariant } from './constants'

import { ButtonStyleProps, ButtonStyles } from './types'

export const getButtonStyles = ({
   isHovered,
   isPressed,
   hierarchy,
   subVariant
}: ButtonStyleProps): ButtonStyles => {
   const isHoveredState = isHovered && !isPressed
   try {
      if (isHoveredState) {
         return {
            bgColor: CLOSE_BUTTON_THEME[hierarchy][subVariant].hover.bgColor,
            border: CLOSE_BUTTON_THEME[hierarchy][subVariant].hover.border,
            focusRingVariant:
               CLOSE_BUTTON_THEME[hierarchy][subVariant].hover.focusRingVariant,
            iconColor: CLOSE_BUTTON_THEME[hierarchy][subVariant].hover.iconColor
         }
      } else if (isPressed) {
         const isVariantPrimary = subVariant === CloseButtonSubVariant.Primary

         return {
            bgColor: CLOSE_BUTTON_THEME[hierarchy][subVariant].focused.bgColor,
            border: CLOSE_BUTTON_THEME[hierarchy][subVariant].focused.border,
            focusRingVariant: isVariantPrimary
               ? CLOSE_BUTTON_THEME[hierarchy][subVariant].focused
                    .focusRingVariant
               : CLOSE_BUTTON_THEME[hierarchy][subVariant].focused
                    .focusRingVariant,
            iconColor:
               CLOSE_BUTTON_THEME[hierarchy][subVariant].focused.iconColor
         }
      }
      return {
         bgColor: CLOSE_BUTTON_THEME[hierarchy][subVariant].default.bgColor,
         border: CLOSE_BUTTON_THEME[hierarchy][subVariant].default.border,
         focusRingVariant:
            CLOSE_BUTTON_THEME[hierarchy][subVariant].default.focusRingVariant,
         iconColor: CLOSE_BUTTON_THEME[hierarchy][subVariant].default.iconColor
      }
   } catch {
      throw new Error(
         `Hierarchy: ${hierarchy}, SubVariant: ${subVariant} The Combination Doesn't Exit. You can add this combination in the theme config.`
      )
   }
}

export const buttonClassName = 'flex justify-center items-center outline-none'
