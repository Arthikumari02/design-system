import { TEXT_INPUT_THEME } from './constants'

interface UIStates {
   isDisabled: boolean
   isFocused: boolean
}

export const getElementTypeStyles = ({ isDisabled, isFocused }: UIStates) => {
   const placeholderTextColor = TEXT_INPUT_THEME.placeholderColor
   const commonStyles = `grow truncate shadow-none focus:outline-none`

   let textColor = TEXT_INPUT_THEME.default.textColor

   if (isDisabled) {
      textColor = TEXT_INPUT_THEME.disabled.textColor
   } else if (isFocused) {
      textColor = TEXT_INPUT_THEME.focused.textColor
   }

   return `${commonStyles} ${textColor} ${placeholderTextColor}`
}
