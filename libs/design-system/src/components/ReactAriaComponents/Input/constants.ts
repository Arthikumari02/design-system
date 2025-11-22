interface InputStateThemeType {
   textColor: string
   borderColor: string
}
interface InputThemeType {
   default: InputStateThemeType
   focused: InputStateThemeType
   disabled: InputStateThemeType
   error: InputStateThemeType
   placeholderColor: string
}

export const TEXT_INPUT_THEME: InputThemeType = {
   default: {
      textColor: 'text-primary-900',
      borderColor: ''
   },
   focused: {
      textColor: 'text-primary-900',
      borderColor: ''
   },
   disabled: {
      textColor: 'text-disabled',
      borderColor: ''
   },
   error: {
      textColor: "text-red-600",
      borderColor: "border-red-500",
   },


   placeholderColor: 'placeholder:text-placeholder text-md-regular'
}
