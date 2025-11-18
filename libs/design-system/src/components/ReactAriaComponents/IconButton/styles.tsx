import { BUTTON_THEME } from '../../../Theme/components/ButtonTheme'
import { IconButtonHierarchy, IconButtonSubVariant } from './constants'
import { ButtonStyleProps, ButtonStyles } from './types'

export const getButtonStyles = ({
   isHovered,
   isPressed,
   isDisabled,
   hierarchy,
   subVariant
}: ButtonStyleProps): ButtonStyles => {
   const isHoveredState = isHovered && !isPressed
   try {
      if (isHoveredState) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].hover.bgColor,
            border: BUTTON_THEME[hierarchy][subVariant].hover.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].hover.focusRingVariant,
            iconColors: {
               stroke:
                  BUTTON_THEME[hierarchy][subVariant].hover.iconColors.stroke,
               fill: BUTTON_THEME[hierarchy][subVariant].hover.iconColors.fill
            }
         }
      } else if (isDisabled) {
         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].disabled.bgColor,
            border: BUTTON_THEME[hierarchy][subVariant].disabled.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant:
               BUTTON_THEME[hierarchy][subVariant].disabled.focusRingVariant,
            iconColors: {
               stroke:
                  BUTTON_THEME[hierarchy][subVariant].disabled.iconColors
                     .stroke,
               fill: BUTTON_THEME[hierarchy][subVariant].disabled.iconColors
                  .fill
            }
         }
      } else if (isPressed) {
         const isVariantTertiaryGray =
            hierarchy === IconButtonHierarchy.Tertiary &&
            subVariant === IconButtonSubVariant.Gray

         return {
            bgColor: BUTTON_THEME[hierarchy][subVariant].focused.bgColor,
            border: BUTTON_THEME[hierarchy][subVariant].focused.border,
            loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
            focusRingVariant: isVariantTertiaryGray
               ? 'Gray'
               : BUTTON_THEME[hierarchy][subVariant].focused.focusRingVariant,
            iconColors: {
               stroke:
                  BUTTON_THEME[hierarchy][subVariant].focused.iconColors.stroke,
               fill: BUTTON_THEME[hierarchy][subVariant].focused.iconColors.fill
            }
         }
      }

      return {
         bgColor: BUTTON_THEME[hierarchy][subVariant].default.bgColor,
         border: BUTTON_THEME[hierarchy][subVariant].default.border,
         loaderColor: BUTTON_THEME[hierarchy][subVariant].loaderColor,
         focusRingVariant:
            BUTTON_THEME[hierarchy][subVariant].default.focusRingVariant,

         iconColors: {
            stroke:
               BUTTON_THEME[hierarchy][subVariant].default.iconColors.stroke,
            fill: BUTTON_THEME[hierarchy][subVariant].default.iconColors.fill
         }
      }
   } catch {
      throw new Error(
         `Hierarchy: ${hierarchy}, SubVariant: ${subVariant} The Combination Doesn't Exit. You can add this combination in the theme config.`
      )
   }
}
