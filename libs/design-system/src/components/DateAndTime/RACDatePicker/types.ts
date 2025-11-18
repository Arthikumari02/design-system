import React from 'react'
import {
   DatePickerProps as AriaDatePickerProps,
   DateValue,
   ValidationResult
} from 'react-aria-components'

import { FocusRingVariant, Placement, SmallAndMedium } from '../../../types'

import { FooterProps } from '../DateRangePicker/FooterComponent'
import { DateTimeInputStrings } from '../DateTimeField/DateTimeField'

export interface RACDatePickerProps<T extends DateValue>
   extends Omit<
      AriaDatePickerProps<T>,
      'granularity' | 'value' | 'onChange' | 'shouldCloseOnSelect'
   > {
   value?: Date | null
   onChange?: (value: Date | null) => void
   label?: string
   description?: string
   errorMessage?: string | ((validation: ValidationResult) => string) | null
   size?: SmallAndMedium
   footerProps?: FooterProps
   containerClassName?: string
   shouldShowClearButton?: boolean
   contextualHelp?: () => React.ReactNode
   renderCustomTrigger?: (isOpen: boolean) => React.ReactElement
   renderHeader?: () => React.ReactElement
   customTriggerFocusRingVariant?: FocusRingVariant
   dateTimeInputStrings?: DateTimeInputStrings
   isDateTimePicker?: boolean
   popoverProps?: {
      triggerRef?: React.RefObject<Element | null>
      offset?: number
      placement?: Placement
   }
   autoFocusDateInput?: boolean
   showAsInline?: boolean
   shouldShowErrorInTooltip?: boolean
   datePickerContainerClassName?: string
}
