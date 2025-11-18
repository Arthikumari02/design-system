export enum InputSize {
   xs = 'EXTRA_SMALL',
   sm = 'SMALL',
   md = 'MEDIUM'
}

interface InputStateThemeType {
   borderColor: string
   bgColor: string
   textColor: string
}

interface InputThemeType {
   default: InputStateThemeType
   focused: InputStateThemeType
   disabled: InputStateThemeType
   error: InputStateThemeType & { color: string }
   placeholderColor: string
}

export const TEXT_INPUT_THEME: InputThemeType = {
   default: {
      borderColor: 'border-primary shadow-xs',
      bgColor: 'bg-primary',
      textColor: 'text-primary-900'
   },
   focused: {
      borderColor: 'border-brand shadow-xs',
      bgColor: 'bg-primary',
      textColor: 'text-primary-900'
   },
   disabled: {
      borderColor: 'border-disabled shadow-xs',
      bgColor: 'bg-disabled_subtle',
      textColor: 'text-disabled'
   },
   error: {
      borderColor: 'border-error shadow-xs',
      bgColor: 'bg-primary',
      textColor: 'text-primary-900',
      color: 'var(--error-500)'
   },
   placeholderColor: 'placeholder:text-placeholder'
}
