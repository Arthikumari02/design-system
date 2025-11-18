import { ButtonColorThemeType } from '../../components/ReactAriaComponents/Button/types'
import { Hierarchy, SubVariant } from '../../types/ButtonTypes'

export const BUTTON_THEME: ButtonColorThemeType = {
   [Hierarchy.Primary]: {
      [SubVariant.Primary]: {
         loaderColor: 'fill-fg-white',
         default: {
            bgColor: 'button-primary-bg',
            textColor: 'text-button-primary-fg',
            border: 'border button-primary-border shadow-xs',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         hover: {
            bgColor: 'button-primary-bg_hover',
            textColor: 'text-button-primary-fg_hover',
            border: 'border button-primary-border_hover shadow-xs',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         focused: {
            bgColor: 'button-primary-bg',
            textColor: 'text-button-primary-fg',
            border: 'border button-primary-border shadow-xs',
            focusRingVariant: 'Primary',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         disabled: {
            bgColor: 'bg-disabled',
            textColor: 'text-fg-disabled',
            border: 'border border-disabled_subtle shadow-xs',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Destructive]: {
         loaderColor: 'fill-fg-white',
         default: {
            bgColor: 'button-primary-error-bg',
            textColor: 'text-fg-white',
            border: 'border button-primary-error-border shadow-xs',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         hover: {
            bgColor: 'button-primary-error-bg_hover',
            textColor: 'text-fg-white',
            focusRingVariant: 'None',
            border: 'border button-primary-error-border_hover shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         focused: {
            bgColor: 'button-primary-error-bg',
            textColor: 'text-fg-white',
            focusRingVariant: 'Destructive',
            border: 'border button-primary-error-border shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-white',
               fill: 'fill-fg-white'
            }
         },
         disabled: {
            bgColor: 'bg-disabled',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border border-disabled_subtle shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      }
   },
   [Hierarchy.Secondary]: {
      [SubVariant.GrayOutline]: {
         loaderColor: 'fill-button-secondary-fg',
         default: {
            bgColor: 'button-secondary-bg',
            focusRingVariant: 'None',
            textColor: 'text-button-secondary-fg',
            border: 'border button-secondary-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-fg',
               fill: 'fill-button-secondary-fg'
            }
         },
         hover: {
            bgColor: 'button-secondary-bg_hover',
            textColor: 'text-button-secondary-fg_hover',
            focusRingVariant: 'None',
            border: 'border button-secondary-border_hover shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-fg',
               fill: 'fill-button-secondary-fg'
            }
         },
         focused: {
            bgColor: 'button-secondary-bg',
            textColor: 'text-button-secondary-fg',
            focusRingVariant: 'Gray',
            border: 'border button-secondary-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-fg',
               fill: 'fill-button-secondary-fg'
            }
         },
         disabled: {
            bgColor: 'bg-primary',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border border-disabled_subtle shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.DestructiveOutline]: {
         loaderColor: 'fill-button-secondary-error-fg',
         default: {
            bgColor: 'button-secondary-error-bg',
            textColor: 'text-button-secondary-error-fg',
            focusRingVariant: 'None',
            border: 'border button-secondary-error-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-error-fg',
               fill: 'fill-button-secondary-error-fg'
            }
         },
         hover: {
            bgColor: 'button-secondary-error-bg_hover',
            textColor: 'text-button-secondary-error-fg_hover',
            focusRingVariant: 'None',
            border: 'border button-secondary-error-border_hover shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-error-fg_hover',
               fill: 'fill-button-secondary-error-fg_hover'
            }
         },
         focused: {
            bgColor: 'button-secondary-error-bg',
            textColor: 'text-button-secondary-error-fg',
            focusRingVariant: 'Destructive',
            border: 'border button-secondary-error-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-error-fg',
               fill: 'fill-button-secondary-error-fg'
            }
         },
         disabled: {
            bgColor: 'bg-primary',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border border-disabled_subtle shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Primary]: {
         loaderColor: 'fill-button-secondary-color-fg',
         default: {
            bgColor: 'button-secondary-color-bg',
            textColor: 'text-button-secondary-color-fg',
            focusRingVariant: 'None',
            border: 'border button-secondary-color-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-color-fg',
               fill: 'fill-button-secondary-color-fg'
            }
         },
         hover: {
            bgColor: 'button-secondary-color-bg_hover',
            textColor: 'text-button-secondary-color-fg_hover',
            focusRingVariant: 'None',
            border: 'border button-secondary-color-border_hover shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-color-fg_hover',
               fill: 'fill-button-secondary-color-fg_hover'
            }
         },
         focused: {
            bgColor: 'button-secondary-color-bg',
            textColor: 'text-button-secondary-color-fg',
            focusRingVariant: 'Primary',
            border: 'border button-secondary-color-border shadow-xs',
            iconColors: {
               stroke: 'stroke-button-secondary-color-fg', //  colors['primary-600']
               fill: 'fill-button-secondary-color-fg'
            }
         },
         disabled: {
            bgColor: 'bg-primary',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border border-disabled_subtle shadow-xs',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      }
   },
   [Hierarchy.Tertiary]: {
      [SubVariant.Gray]: {
         loaderColor: 'fill-button-tertiary-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-fg',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg',
               fill: 'fill-button-tertiary-fg'
            }
         },
         hover: {
            bgColor: 'button-tertiary-bg_hover',
            textColor: 'text-button-tertiary-fg_hover',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg_hover',
               fill: 'fill-button-tertiary-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg',
               fill: 'fill-button-tertiary-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Primary]: {
         loaderColor: 'fill-button-tertiary-color-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-color-fg',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg',
               fill: 'fill-button-tertiary-color-fg'
            }
         },
         hover: {
            bgColor: 'button-tertiary-color-bg_hover',
            textColor: 'text-button-tertiary-color-fg_hover',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg_hover',
               fill: 'fill-button-tertiary-color-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-color-fg',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg',
               fill: 'fill-button-tertiary-color-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Destructive]: {
         loaderColor: 'fill-button-tertiary-error-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-error-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg',
               fill: 'fill-button-tertiary-error-fg'
            }
         },
         hover: {
            bgColor: 'button-tertiary-error-bg_hover',
            textColor: 'text-button-tertiary-error-fg_hover',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg_hover',
               fill: 'fill-button-tertiary-error-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-error-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg',
               fill: 'fill-button-tertiary-error-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            border: 'border-none',
            focusRingVariant: 'None',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      }
   },
   [Hierarchy.Link]: {
      [SubVariant.Gray]: {
         loaderColor: 'fill-button-tertiary-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg',
               fill: 'fill-button-tertiary-fg'
            }
         },
         hover: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-fg_hover',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg_hover',
               fill: 'fill-button-tertiary-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-fg',
               fill: 'fill-button-tertiary-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Primary]: {
         loaderColor: 'fill-button-tertiary-color-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-color-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg',
               fill: 'fill-button-tertiary-color-fg'
            }
         },
         hover: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-color-fg_hover',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg_hover',
               fill: 'fill-button-tertiary-color-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-color-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-color-fg',
               fill: 'fill-button-tertiary-color-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      },
      [SubVariant.Destructive]: {
         loaderColor: 'fill-button-tertiary-error-fg',
         default: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-error-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg',
               fill: 'fill-button-tertiary-error-fg'
            }
         },
         hover: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-error-fg_hover',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg_hover',
               fill: 'fill-button-tertiary-error-fg_hover'
            }
         },
         focused: {
            bgColor: 'base-transparent',
            textColor: 'text-button-tertiary-error-fg',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-button-tertiary-error-fg',
               fill: 'fill-button-tertiary-error-fg'
            }
         },
         disabled: {
            bgColor: 'base-transparent',
            textColor: 'text-fg-disabled',
            focusRingVariant: 'None',
            border: 'border-none',
            iconColors: {
               stroke: 'stroke-fg-disabled',
               fill: 'fill-fg-disabled'
            }
         }
      }
   }
}
