import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { DateValue } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'

import { BasicSize } from '../../../types'

import Input from '../../ReactAriaComponents/Input/Input'
import {
   areBothDatesEqual,
   formatDateString,
   isDateInRange,
   parseDateInput
} from './utils'
import { ValidationResultType } from './DateTimeField'

export interface DateInputStrings {
   datePlaceholder: string
   dateOutOfRangeErrorMessage?: string
   invalidDateErrorMessage?: string
}

interface Props {
   size: BasicSize
   initialDate?: CalendarDate
   onUpdateDate?: (date: CalendarDate | null) => void
   setValidationResult?: (result: ValidationResultType | null) => void
   autoFocus?: boolean
   minValue?: DateValue
   maxValue?: DateValue
   dateInputStrings?: DateInputStrings
   shouldClearDateInput?: boolean
}

const DateInput = (props: Props): React.ReactElement => {
   const {
      initialDate,
      onUpdateDate,
      setValidationResult,
      dateInputStrings,
      shouldClearDateInput = false
   } = props
   const [dateInput, setDateInput] = React.useState(
      initialDate ? formatDateString(initialDate) : ''
   )

   useEffect(() => {
      if (!initialDate) setDateInput('')
      else {
         setDateInput(formatDateString(initialDate))
         setTimeout(() => setValidationResult?.(null), 100)
      }
   }, [initialDate])

   const setDateAndCallOnUpdateDate = (dateString: string) => {
      const isDateInputEmpty = !dateString.trim().length

      //NOTE: Empty string keep the previous value
      if (isDateInputEmpty && !shouldClearDateInput) {
         initialDate && setDateInput(formatDateString(initialDate))
         setValidationResult?.(null)
         return
      }
      if (isDateInputEmpty && shouldClearDateInput) {
         initialDate && onUpdateDate?.(null)
         setValidationResult?.(null)
         return
      }

      const { isValidDate, calendarDate } = parseDateInput(dateString)

      if (!isValidDate) {
         setValidationResult?.({
            isInvalid: true,
            errorMessage:
               dateInputStrings?.invalidDateErrorMessage ?? 'Invalid date',
            isInvalidDate: true
         })
         return
      }

      if (!calendarDate)
         throw new Error('CalendarDate is null which should not happen')

      const isValueChanged =
         !initialDate || !areBothDatesEqual(initialDate, calendarDate)
      if (!isValueChanged) {
         setDateInput(formatDateString(calendarDate))
         setValidationResult?.(null)
         return
      }

      setDateInput(formatDateString(calendarDate))

      if (isDateInRange(calendarDate, props.minValue, props.maxValue)) {
         onUpdateDate?.(calendarDate)
         setValidationResult?.(null)
      } else {
         setValidationResult?.({
            isInvalid: true,
            errorMessage:
               dateInputStrings?.dateOutOfRangeErrorMessage ?? 'Out of range',
            isInvalidDate: true
         })
      }
   }

   const onBlur = () => {
      setDateAndCallOnUpdateDate(dateInput)
   }

   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         setDateAndCallOnUpdateDate(dateInput)
      }
   }

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateInput(e.target.value)
   }

   return (
      <Input
         size={props.size}
         value={dateInput}
         onChange={onChangeInput}
         onKeyDown={onKeyDown}
         onBlur={onBlur}
         autoFocus={props.autoFocus}
         className={'w-[155px] bg-transparent'}
         placeholder={dateInputStrings?.datePlaceholder ?? 'dd/mm/yyyy'}
      />
   )
}

export default observer(DateInput)
