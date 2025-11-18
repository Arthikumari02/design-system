import { CalendarDate, Time } from '@internationalized/date'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import {
   DateValue,
   RangeCalendarProps,
   ValidationResult
} from 'react-aria-components'
import { SmallAndMedium } from '../../../types'
import RangeCalendar from '../../ReactAriaComponents/RangeCalender/RangeCalendar'
import DateTimeField, {
   DateTimeInputStrings
} from '../DateTimeField/DateTimeField'

interface Props<T extends DateValue> {
   shouldShowTime: boolean
   size: SmallAndMedium
   shouldShowClearIcon?: boolean
   fromDateProps: {
      fromDate?: CalendarDate
      fromTime?: Time
      onUpdateDate?: (date: CalendarDate | null) => void
      onUpdateTime?: (time: Time) => void
      isInvalid?: boolean
      minValue?: DateValue
      maxValue?: DateValue
      errorMessage?: string | ((validation: ValidationResult) => string) | null
      dateTimeInputStrings?: DateTimeInputStrings
   }
   toDateProps: {
      toDate?: CalendarDate
      toTime?: Time
      onUpdateDate?: (date: CalendarDate | null) => void
      onUpdateTime?: (time: Time) => void
      isInvalid?: boolean
      minValue?: DateValue
      maxValue?: DateValue
      errorMessage?: string | ((validation: ValidationResult) => string) | null
      dateTimeInputStrings?: DateTimeInputStrings
   }

   rangeCalendarProps?: RangeCalendarProps<T>
   dateInputsContainerClassName?: string
}

const DateRangeCalenderWithInput = <T extends DateValue>(
   props: Props<T>
): React.ReactElement => {
   const {
      shouldShowTime,
      size,
      shouldShowClearIcon,
      fromDateProps,
      toDateProps,
      rangeCalendarProps,
      dateInputsContainerClassName
   } = props

   const startDateAndEndDateString = `${fromDateProps.fromDate} - ${toDateProps.toDate}`

   return (
      <>
         <div
            className={classNames(
               'flex flex-col gap-md',
               dateInputsContainerClassName
            )}
         >
            <div>
               <DateTimeField
                  initialDate={fromDateProps.fromDate}
                  initialTime={fromDateProps.fromTime}
                  onUpdateDate={fromDateProps.onUpdateDate}
                  onUpdateTime={fromDateProps.onUpdateTime}
                  size={size}
                  shouldShowTime={shouldShowTime}
                  isInvalid={fromDateProps.isInvalid}
                  minValue={fromDateProps.minValue}
                  maxValue={fromDateProps.maxValue}
                  errorMessage={fromDateProps.errorMessage}
                  dateTimeInputStrings={fromDateProps.dateTimeInputStrings}
                  autoFocusDateInput={true}
                  shouldClearDateInput={true}
                  shouldShowClearIcon={shouldShowClearIcon}
               />
            </div>
            <div>
               <DateTimeField
                  initialDate={toDateProps.toDate}
                  initialTime={toDateProps.toTime}
                  onUpdateDate={toDateProps.onUpdateDate}
                  onUpdateTime={toDateProps.onUpdateTime}
                  size={size}
                  shouldShowTime={shouldShowTime}
                  isInvalid={toDateProps.isInvalid}
                  minValue={toDateProps.minValue}
                  maxValue={toDateProps.maxValue}
                  errorMessage={toDateProps.errorMessage}
                  dateTimeInputStrings={toDateProps.dateTimeInputStrings}
                  autoFocusDateInput={false}
                  shouldClearDateInput={true}
                  shouldShowClearIcon={shouldShowClearIcon}
               />
            </div>
         </div>
         <RangeCalendar
            key={startDateAndEndDateString}
            size={size}
            {...rangeCalendarProps}
         />
      </>
   )
}

export default observer(DateRangeCalenderWithInput)
