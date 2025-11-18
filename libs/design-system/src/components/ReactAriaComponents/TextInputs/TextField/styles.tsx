import { TEXT_INPUT_THEME } from './constants'

interface UIStates {
   isDisabled: boolean
   isFocused: boolean
   isError: boolean
}

export const inputContainerStyles = `flex grow items-center overflow-hidden`

export const getInputContainerStyles = ({
   isDisabled,
   isFocused,
   isError
}: UIStates) => {
   if (isDisabled)
      return {
         borderColor: TEXT_INPUT_THEME.disabled.borderColor,
         bgColor: TEXT_INPUT_THEME.disabled.bgColor
      }
   else if (isFocused)
      return {
         borderColor: TEXT_INPUT_THEME.focused.borderColor,
         bgColor: TEXT_INPUT_THEME.focused.bgColor
      }
   else if (isError)
      return {
         borderColor: TEXT_INPUT_THEME.error.borderColor,
         bgColor: TEXT_INPUT_THEME.error.bgColor
      }
   return {
      borderColor: TEXT_INPUT_THEME.default.borderColor,
      bgColor: TEXT_INPUT_THEME.default.bgColor
   }
}

export const getElementTypeStyles = ({
   isDisabled,
   isFocused,
   isError
}: UIStates) => {
   const placeholderTextColor = TEXT_INPUT_THEME.placeholderColor
   const commonStyles = `grow truncate border-none shadow-none focus:outline-none`

   const textAreaCommonStyles = `grow border-none shadow-none focus:outline-none`

   let textColor = TEXT_INPUT_THEME.default.textColor

   if (isDisabled) {
      textColor = TEXT_INPUT_THEME.disabled.textColor
   } else if (isFocused) {
      textColor = TEXT_INPUT_THEME.focused.textColor
   } else if (isError) {
      textColor = TEXT_INPUT_THEME.error.textColor
   }

   return {
      commonStyles,
      textColor,
      placeholderTextColor,
      textAreaCommonStyles
   }
}
