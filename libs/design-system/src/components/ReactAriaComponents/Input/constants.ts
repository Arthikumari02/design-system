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
      borderColor: 'border-primary'
   },
   focused: {
      textColor: 'text-primary-900',
      borderColor: 'border-brand'
   },
   disabled: {
      textColor: 'text-disabled',
      borderColor: 'border-disabled_subtle'
   },
   error: {
      textColor: "text-error-primary",
      borderColor: "border-error",
   },


   placeholderColor: 'placeholder:text-placeholder text-md-regular'
}
