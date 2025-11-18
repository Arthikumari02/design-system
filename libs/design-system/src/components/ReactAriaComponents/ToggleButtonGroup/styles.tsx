import {
   ToggleButtonGroupStyleProps,
   ToggleButtonGroupStyles,
   ToggleButtonStyleProps,
   ToggleButtonStyles
} from './types'

// Toggle Button Group styles
export const getToggleButtonGroupStyles = ({
   variant
}: ToggleButtonGroupStyleProps): ToggleButtonGroupStyles => {
   switch (variant) {
      case 'Primary':
      case 'Secondary':
      case 'Gray':
         return {
            containerClassName:
               'flex rounded-lg overflow-hidden border-t border-b border-l border-gray-300 [border-width:1px]',
            dividerColor: 'bg-gray-300'
         }
      default:
         return {
            containerClassName:
               'flex rounded-lg overflow-hidden border-t border-b border-l border-gray-300 [border-width:1px]',
            dividerColor: 'bg-gray-300'
         }
   }
}

// Toggle Button styles
export const getToggleButtonStyles = ({
   isHovered,
   isSelected,
   isDisabled,
   variant
}: ToggleButtonStyleProps): ToggleButtonStyles => {
   // Default styles
   const defaultStyles: ToggleButtonStyles = {
      bgColor: 'bg-primary',
      textColor: 'text-secondary-700',
      border: '',
      iconColors: 'text-secondary-700'
   }

   // Disabled state takes precedence
   if (isDisabled) {
      return {
         bgColor: isSelected ? 'bg-disabled_subtle' : 'bg-primary',
         textColor: 'text-disabled',
         border: '',
         iconColors: 'text-disabled'
      }
   }

   // Selected state
   if (isSelected) {
      switch (variant) {
         case 'Primary':
            return {
               bgColor: isHovered ? 'bg-brand-solid_hover' : 'bg-brand-solid',
               textColor: 'text-primary_on-brand',
               border: '',
               iconColors: 'text-primary_on-brand'
            }
         case 'Secondary':
            return {
               bgColor: isHovered ? 'bg-[#D1E9FF]' : 'bg-brand-primary', //TODO:need to add bg color to tokens
               textColor: 'text-brand-tertiary-600',
               border: '',
               iconColors: 'text-brand-tertiary-600'
            }
         case 'Gray':
         default:
            return {
               bgColor: isHovered ? 'bg-primary_hover' : 'bg-active',
               textColor: isHovered
                  ? 'text-secondary_hover'
                  : 'text-secondary-700',
               border: '',
               iconColors: 'text-secondary-700'
            }
      }
   }

   // Hover state
   if (isHovered) {
      return {
         ...defaultStyles,
         bgColor: 'bg-primary_hover',
         textColor: 'text-secondary_hover',
         iconColors: 'text-secondary_hover'
      }
   }

   // Default state
   return defaultStyles
}
