import cn from 'classnames'
import { ReactElement, useRef } from 'react'

import {
   dayPeriodValues,
   MAX_HOURS_VALUE,
   MAX_MINUTES_VALUE
} from './constants'
import { DayPeriodToggler } from './DayPeriodToggler'
import { separatorStyles, timeFieldsContainerClassName } from './styles'
import { TimeInput } from './TimeInput'

interface TimeFieldProps {
   hours: string | number
   setHours: (value: string | number) => void
   minutes: string | number
   setMinutes: (value: string | number) => void
   dayPeriod: string
   setDayPeriod: (value: string) => void
   hourPlaceholderText?: string
   minutePlaceholderText?: string
   onClickTimeInput?: (event: any) => void
   shouldStopTimeSelectionEvent?: boolean
}

const TimeField = (props: TimeFieldProps): ReactElement => {
   const {
      hours,
      minutes,
      dayPeriod,
      setHours,
      setMinutes,
      setDayPeriod,
      onClickTimeInput,
      hourPlaceholderText = 'hh',
      minutePlaceholderText = 'mm'
   } = props

   const hoursInputRef = useRef<HTMLInputElement>(null)
   const minutesInputRef = useRef<HTMLInputElement>(null)
   const dayPeriodRef = useRef<HTMLDivElement>(null)

   const onChangeMinutes = (event: any) => {
      const minutes = event.target.value
      if (minutes <= MAX_MINUTES_VALUE && minutes >= 0) {
         setMinutes(event.target?.value)
         if (minutes > 5 || minutes.length === 2) dayPeriodRef?.current?.focus()
      }
   }
   const onChangeHours = (event: any) => {
      const hours = event.target.value
      if (hours == 0) {
         setHours('')
      }
      if (hours <= MAX_HOURS_VALUE && hours > 0) {
         setHours(event.target?.value)
         if (hours > 1) minutesInputRef?.current?.focus()
      }
   }

   const onClickUpArrow = (e): void => {
      setDayPeriod(dayPeriodValues.am)
      if (props.shouldStopTimeSelectionEvent) {
         e.stopPropagation()
      }
   }

   const onClickDownArrow = (e): void => {
      setDayPeriod(dayPeriodValues.pm)
      if (props.shouldStopTimeSelectionEvent) {
         e.stopPropagation()
      }
   }

   return (
      <div className={cn(timeFieldsContainerClassName)}>
         <TimeInput
            ref={hoursInputRef}
            placeholder={hourPlaceholderText}
            value={hours}
            onChange={onChangeHours}
            onClickTimeInput={onClickTimeInput}
            max={MAX_HOURS_VALUE}
            min={0}
         />
         <div className={separatorStyles}>:</div>
         <TimeInput
            ref={minutesInputRef}
            placeholder={minutePlaceholderText}
            value={minutes}
            onChange={onChangeMinutes}
            onClickTimeInput={onClickTimeInput}
            max={MAX_MINUTES_VALUE}
            min={0}
         />
         <div className={separatorStyles}>:</div>
         <DayPeriodToggler
            ref={dayPeriodRef}
            shouldStopTimeSelectionEvent={props.shouldStopTimeSelectionEvent}
            value={dayPeriod}
            onClickUpArrow={onClickUpArrow}
            onClickDownArrow={onClickDownArrow}
         />
      </div>
   )
}

export { TimeField }
