interface InputStateThemeType {
   textColor: string
}
interface InputThemeType {
   default: InputStateThemeType
   focused: InputStateThemeType
   disabled: InputStateThemeType
   placeholderColor: string
}

export const TEXT_INPUT_THEME: InputThemeType = {
   default: {
      textColor: 'text-primary-900'
   },
   focused: {
      textColor: 'text-primary-900'
   },
   disabled: {
      textColor: 'text-disabled'
   },

   placeholderColor: 'placeholder:text-placeholder'
}
