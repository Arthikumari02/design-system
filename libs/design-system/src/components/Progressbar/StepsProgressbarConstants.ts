import {
   StepsProgressbarSliderTrackThemeType,
   StepsProgressbarVariantThumbThemeType
} from './types'

export const STEPS_PROGRESS_BAR_TRACK_THEME: StepsProgressbarSliderTrackThemeType =
   {
      DISABLE: {
         leftHalfBgColor: '#B2DDFF',
         rightHalfBgColor: '#F2F4F7'
      },
      ACTIVE: {
         leftHalfBgColor: '#2E90FA',
         rightHalfBgColor: '#EAECF0'
      }
   }

export const STEPS_PROGRESS_BAR_THUMB_THEME: StepsProgressbarVariantThumbThemeType =
   {
      ACTIVE: {
         FILLED: {
            bgColor: 'bg-fg-brand-secondary-500',
            lastStepBgColor: 'bg-primary',
            lastStepBorderColor: 'border-brand-solid_alt'
         },
         UNOCCUPIED: {
            bgColor: 'bg-utility-gray-warm-300'
         }
      },
      DISABLE: {
         FILLED: {
            bgColor: 'bg-utility-brand-200_alt',
            lastStepBgColor: '',
            lastStepBorderColor: ''
         },
         UNOCCUPIED: {
            bgColor: 'bg-utility-gray-200'
         }
      }
   }

export const SLIDER_MIN_VALUE = 0
export const SLIDER_MAX_VALUE = 100
