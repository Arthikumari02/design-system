import { FocusRingVariant } from '../../../types'

type FocusRingTheme = {
   [key in FocusRingVariant]: {
      borderColor: string
      ring: string
   }
}
export const FOCUS_RING_THEME: FocusRingTheme = {
   Primary: {
      borderColor: 'border-primary',
      ring: 'ring-brand'
   },
   Destructive: {
      borderColor: 'border-error',
      ring: 'ring-error'
   },
   Gray: {
      borderColor: 'border-gray',
      ring: 'ring-gray'
   },
   GraySecondary: {
      borderColor: 'border-success',
      ring: 'ring-gray-secondary'
   },
   None: {
      borderColor: 'border-none',
      ring: 'ring-transparent'
   }
}
