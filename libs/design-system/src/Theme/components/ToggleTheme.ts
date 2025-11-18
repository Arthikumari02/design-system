import { ToggleThemeType } from '../../components/Toggle/types'

interface ThemeType {
   default: ToggleThemeType
   selected: ToggleThemeType
}

export const TOGGLE_THEME: ThemeType = {
   default: {
      default: {
         bgColor: 'var(--bg-tertiary)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'None'
      },
      hover: {
         bgColor: 'var(--bg-tertiary)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'None'
      },
      focused: {
         bgColor: 'var(--bg-tertiary)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'Gray'
      },
      disabled: {
         bgColor: 'var(--bg-disabled)',
         thumbColor: 'var(--toggle-button-fg_disabled)',
         focusRingVariant: 'None'
      }
   },

   selected: {
      default: {
         bgColor: 'var(--bg-brand-solid)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'None'
      },
      hover: {
         bgColor: 'var(--bg-brand-solid_hover)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'None'
      },
      focused: {
         bgColor: 'var(--bg-brand-solid)',
         thumbColor: 'var(--fg-white)',
         focusRingVariant: 'Primary'
      },
      disabled: {
         bgColor: 'var(--bg-disabled)',
         thumbColor: 'var(--toggle-button-fg_disabled)',
         focusRingVariant: 'None'
      }
   }
}
