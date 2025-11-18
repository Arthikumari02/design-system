import { observer } from 'mobx-react'
import React from 'react'
import {
   DatePickerStateContext,
   DateValue,
   ValidationResult
} from 'react-aria-components'
import { CalendarDate, Time } from '@internationalized/date'

import { SmallAndMedium } from '../../../types'
import DateTimeField, {
   DateTimeInputStrings
} from '../DateTimeField/DateTimeField'

interface Props {
   size: SmallAndMedium
   shouldShowTime: boolean
   minValue?: DateValue
   maxValue?: DateValue
   errorMessage?: string | ((validation: ValidationResult) => string) | null
   dateTimeInputStrings?: DateTimeInputStrings
   autoFocusDateInput?: boolean
   shouldShowErrorInTooltip?: boolean
   onPressEnterWithValidTime?: (
      updatedDateTime: Date,
      close?: () => void
   ) => void
}

const DateTimeFieldWrapper = (props: Props): React.ReactElement => {
   const { size } = props
   const state = React.useContext(DatePickerStateContext)

   const dateValue = state?.dateValue as CalendarDate
   const timeValue = state?.timeValue as Time

   const onPressEnterWithValidTime = (updatedDateTime: Date) => {
      props.onPressEnterWithValidTime?.(updatedDateTime, state?.close)
   }

   return (
      <DateTimeField
         initialDate={dateValue}
         initialTime={timeValue}
         onUpdateDate={date => date && state?.setDateValue(date)}
         onUpdateTime={state?.setTimeValue}
         size={size}
         shouldShowTime={props.shouldShowTime}
         isInvalid={state?.isInvalid}
         minValue={props.minValue}
         maxValue={props.maxValue}
         errorMessage={props.errorMessage}
         dateTimeInputStrings={props.dateTimeInputStrings}
         autoFocusDateInput={props.autoFocusDateInput}
         shouldShowErrorInTooltip={props.shouldShowErrorInTooltip}
         onPressEnterWithValidTime={onPressEnterWithValidTime}
      />
   )
}

export default observer(DateTimeFieldWrapper)
