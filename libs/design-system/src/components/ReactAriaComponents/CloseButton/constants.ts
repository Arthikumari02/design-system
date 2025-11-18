import { CloseButtonColorThemeType } from './types'

export enum CloseButtonHierarchy {
   Tertiary = 'TERTIARY'
}

export enum CloseButtonSubVariant {
   Primary = 'PRIMARY',
   Gray = 'GRAY'
}

// FIXME: Need to add icon colors and remove import form style-guide
export const CLOSE_BUTTON_THEME: CloseButtonColorThemeType = {
   [CloseButtonHierarchy.Tertiary]: {
      [CloseButtonSubVariant.Gray]: {
         default: {
            bgColor: 'bg-transparent',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColor: 'fill-gray-500'
         },
         hover: {
            bgColor: 'bg-primary_hover',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColor: 'fill-gray-600'
         },
         focused: {
            bgColor: 'bg-primary',
            border: 'border-none',
            focusRingVariant: 'Gray',
            iconColor: 'fill-gray-500'
         }
      },
      [CloseButtonSubVariant.Primary]: {
         default: {
            focusRingVariant: 'None',
            bgColor: 'bg-transparent',
            border: 'border-none',
            iconColor: 'fill-brand-500'
         },
         hover: {
            focusRingVariant: 'None',
            bgColor: 'bg-primary-50',
            border: 'border-none',
            iconColor: 'fill-brand-600'
         },
         focused: {
            focusRingVariant: 'Primary',
            bgColor: 'bg-primary-50',
            border: 'border-none',
            iconColor: 'fill-brand-500'
         }
      }
   }
}
