import { SmallAndMedium } from '../../../types'

export const comboboxContentContainerStyles = `flex flex-col`

export const disabledInputGroupContainerStyles = `!bg-disabled_subtle text-disabled !cursor-not-allowed !border-disabled`
export const validInputGroupContainerStyles = `border border-primary`
export const inputGroupContainerStyles = `flex justify-between`
export const validFocusRingStyles = `border !border-brand`
export const invalidFocusRingStyles = `border !border-error`

export const placeholderTextSizes = {
   Small: 'placeholder:text-sm-regular',
   Medium: 'placeholder:text-sm-regular'
}

export const getTextInputStylesBasedOnSize = (
   size: SmallAndMedium,
   isDisabled: boolean
): string => {
   const defaultStyles =
      'w-full !active:outline-none !focus:outline-none outline-none placeholder:text-placeholder'
   const placeholderStyles = placeholderTextSizes[size]

   switch (size) {
      case 'Small':
         return `${defaultStyles} ${placeholderStyles} text-sm-medium ${isDisabled ? 'text-disabled' : ''}`
      case 'Medium':
      default:
         return `${defaultStyles} ${placeholderStyles} text-sm-medium ${isDisabled ? 'text-disabled' : ''}`
   }
}

export const getComboboxTextInputContainerStylesBasedOnSize = (
   size: SmallAndMedium
) => {
   const defaultStyles = `bg-primary text-primary-900 w-full relative inline-flex flex-row flex-nowrap`

   //TODO: Update proper spacings after confirming with design team
   switch (size) {
      case 'Small':
         return `${defaultStyles} py-md_border-1 px-lg-utility rounded-md`
      case 'Medium':
      default:
         return `${defaultStyles} py-md-utility px-lg-utility rounded-md`
   }
}

export const getInputPrefixDimensionsBasedOnSize = (
   size: SmallAndMedium
): number => {
   switch (size) {
      case 'Small':
         return 20
      case 'Medium':
         return 20

      default:
         return 20
   }
}

export const inputStyles = `outline-none focus:outline-none flex-1 w-full input-field-styles !active:outline-none text-sm-medium`
export const invalidInputGroupContainerStyles = `border !border-error`
