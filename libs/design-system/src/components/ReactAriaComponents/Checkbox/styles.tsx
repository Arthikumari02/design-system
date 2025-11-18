import cn from 'classnames'

interface CheckboxBoxState {
   isHovered: boolean
   isDisabled?: boolean
   isFocused: boolean
   error?: boolean
}

export const getSimpleCheckboxLabelStyles = (
   isDisabled?: boolean,
   className = ''
) =>
   cn(
      'flex relative items-center',
      { [`cursor-not-allowed`]: isDisabled },
      { 'cursor-pointer': !isDisabled },
      className
   )

export const getCheckboxButtonContainerStyles = (
   isDisabled?: boolean,
   checkboxButtonClassName = ''
) =>
   cn(
      `flex `,
      checkboxButtonClassName,
      { 'cursor-not-allowed': isDisabled },
      { 'cursor-pointer': !isDisabled }
   )

// Tailwind class mappings (theme-aware via light/dark approximations)
const disabledCheckboxContainerStyles =
   'stroke-gray-slate-300 dark:stroke-gray-slate-700 fill-gray-slate-50 dark:fill-gray-slate-900'

export const getUnSelectedCheckboxButtonColors = ({
   isHovered,
   isDisabled,
   error,
   isFocused
}: CheckboxBoxState) => {
   if (isDisabled) {
      return disabledCheckboxContainerStyles
   } else if (!isDisabled && !error) {
      // Primary (unselected)
      const strokePrimary = 'stroke-gray-slate-300 dark:stroke-gray-slate-700'
      const fillHover = 'fill-gray-slate-100 dark:fill-gray-slate-800'
      const fillDefault = 'fill-fg-white'

      return isHovered || isFocused
         ? `${strokePrimary} ${fillHover}`
         : `${strokePrimary} ${fillDefault}`
   }
   // Error (unselected)
   const strokeError = 'stroke-error-300 dark:stroke-error-400'
   const fillHover = 'fill-gray-slate-100 dark:fill-gray-slate-800'
   const fillDefault = 'fill-fg-white'
   return isHovered || isFocused
      ? `${strokeError} ${fillHover}`
      : `${strokeError} ${fillDefault}`
}

export const getSelectedCheckboxButtonColors = ({
   isHovered,
   isDisabled,
   error
}: CheckboxBoxState) => {
   if (isDisabled) {
      return disabledCheckboxContainerStyles
   }
   if (!isDisabled && !error) {
      const strokeWhite = 'stroke-fg-white'
      const fillDefault = 'fill-brand-600'
      const fillHover = 'hover:fill-brand-700 dark:hover:fill-brand-500'
      return `${strokeWhite} ${fillDefault} ${fillHover}`
   }
   // Error selected
   const strokeWhite = 'stroke-fg-white'
   const fillDefault = 'fill-error-600'
   const fillHover = 'hover:fill-error-700 dark:hover:fill-error-500'
   return `${strokeWhite} ${fillDefault} ${fillHover}`
}
