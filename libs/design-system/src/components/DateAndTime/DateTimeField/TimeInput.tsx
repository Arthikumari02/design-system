import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { DateValue } from 'react-aria-components'
import { CalendarDate, Time } from '@internationalized/date'

import { BasicSize } from '../../../types'

import Input from '../../ReactAriaComponents/Input/Input'
import {
   areBothDatesEqual,
   formatTimeString,
   isCurrentTimeOnOrAfterMinTime,
   isCurrentTimeOnOrBeforeMaxTime,
   parseTimeInput
} from './utils'
import { ValidationResultType } from './DateTimeField'

export interface TimeInputStrings {
   timePlaceholder?: string
   invalidTimeErrorMessage?: string
   timeOutOfRangeErrorMessage?: string
}

interface Props {
   initialTime?: Time
   onUpdateTime?: (time: Time) => void
   setValidationResult?: (result: ValidationResultType | null) => void
   autoFocus?: boolean
   isDisabled?: boolean
   timeInputStrings?: TimeInputStrings
   minValue?: DateValue
   maxValue?: DateValue
   currentDate?: CalendarDate
   onPressEnterWithValidTime?: (updatedDateTime: Date) => void

   size: BasicSize
}

const TimeInput = (props: Props): React.ReactElement => {
   const {
      initialTime,
      onUpdateTime,
      setValidationResult,
      timeInputStrings,
      onPressEnterWithValidTime
   } = props
   const [timeInput, setTimeInput] = React.useState(
      initialTime ? formatTimeString(initialTime as any) : ''
   )

   useEffect(() => {
      if (!initialTime) setTimeInput('')
      else {
         setTimeInput(formatTimeString(initialTime as any))
         setTimeout(() => setValidationResult?.(null), 100)
      }
   }, [initialTime])

   const setTimeAndCallOnUpdateTime = (
      timeString: string
   ): Time | undefined => {
      if (!timeString.trim().length) {
         initialTime && setTimeInput(formatTimeString(initialTime as any))
         setValidationResult?.(null)
         return
      }
      const { isValidTime, time } = parseTimeInput(timeString)

      if (!isValidTime) {
         setValidationResult?.({
            isInvalid: true,
            errorMessage:
               timeInputStrings?.invalidTimeErrorMessage ?? 'Invalid time'
         })
         return
      }

      if (!time) throw new Error('Time is null which should not happen')

      setTimeInput(formatTimeString(time))

      if (props.currentDate && (props.minValue || props.maxValue)) {
         const isCurrentDateIsMinDate =
            props.minValue &&
            areBothDatesEqual(props.currentDate, props.minValue)

         const isCurrentDateIsMaxDate =
            props.maxValue &&
            areBothDatesEqual(props.currentDate, props.maxValue)

         if (
            (isCurrentDateIsMinDate &&
               !isCurrentTimeOnOrAfterMinTime(time, props.minValue as any)) ||
            (isCurrentDateIsMaxDate &&
               !isCurrentTimeOnOrBeforeMaxTime(time, props.maxValue as any))
         ) {
            setValidationResult?.({
               isInvalid: true,
               errorMessage:
                  timeInputStrings?.timeOutOfRangeErrorMessage ??
                  'Time out of range'
            })
            return
         }
      }

      onUpdateTime?.(time)
      setValidationResult?.(null)
      return time
   }

   const onBlur = () => {
      setTimeAndCallOnUpdateTime(timeInput)
   }

   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         const updatedTime = setTimeAndCallOnUpdateTime(timeInput)
         if (updatedTime && props.currentDate) {
            const updatedDateTime = new Date(
               props.currentDate.year,
               props.currentDate.month - 1,
               props.currentDate.day,
               updatedTime.hour,
               updatedTime.minute
            )

            onPressEnterWithValidTime?.(updatedDateTime)
         }
      }
   }
   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimeInput(e.target.value)
   }

   return (
      <Input
         size={props.size}
         value={timeInput}
         onChange={onChangeInput}
         onKeyDown={onKeyDown}
         onBlur={onBlur}
         autoFocus={props.autoFocus}
         className={
            'w-[96px] text-right border-l border-primary bg-transparent'
         }
         placeholder={timeInputStrings?.timePlaceholder ?? '12:00 AM'}
         disabled={props.isDisabled}
      />
   )
}

export default observer(TimeInput)
