import { Time } from '@internationalized/date'
import React, { useEffect, useRef, useState } from 'react'
import { DateRangePickerStateContext, TimeValue } from 'react-aria-components'

import { observer } from 'mobx-react'
import { TimeField } from '../DateTimePicker/TimeField'
import {
   timeFieldsContainerClassName,
   timeFieldTitleAndInputContainerClassName
} from './styles'
import {
   convertTo12HourFormat,
   convertTo24HourFormat,
   DayPeriodType,
   getDayPeriod
} from './utils'

const TimeRangePicker = () => {
   const state = React.useContext(DateRangePickerStateContext)

   const startTime = state?.timeRange?.start
   const endTime = state?.timeRange?.end

   const timeRangeRef = useRef(state?.timeRange)

   const [startHours, setStartHours] = useState<number | undefined>(
      startTime?.hour !== undefined
         ? convertTo12HourFormat(startTime.hour)
         : undefined
   )
   const [startMinutes, setStartMinutes] = useState<number | undefined>(
      startTime?.minute
   )
   const [startDayPeriod, setStartDayPeriod] = useState<DayPeriodType>(
      getDayPeriod(startTime?.hour ?? 0)
   )

   const [endHours, setEndHours] = useState<number | undefined>(
      endTime?.hour !== undefined
         ? convertTo12HourFormat(endTime.hour)
         : undefined
   )
   const [endMinutes, setEndMinutes] = useState<number | undefined>(
      endTime?.minute
   )
   const [endDayPeriod, setEndDayPeriod] = useState<DayPeriodType>(
      getDayPeriod(endTime?.hour ?? 0)
   )

   useEffect(() => {
      if (timeRangeRef.current === null && startTime && endTime) {
         timeRangeRef.current = state.timeRange

         setStartHours(convertTo12HourFormat(startTime.hour))
         setEndHours(convertTo12HourFormat(endTime.hour))
         setStartMinutes(startTime.minute)
         setEndMinutes(endTime.minute)
         setStartDayPeriod(getDayPeriod(startTime.hour))
         setEndDayPeriod(getDayPeriod(endTime.hour))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state?.timeRange])

   const onChangeStartHours = (value: string | number) => {
      const hours = typeof value === 'string' ? parseInt(value) : value
      setStartHours(hours)
      const time = new Time(
         convertTo24HourFormat(hours, startDayPeriod),
         startMinutes ?? 0
      )
      state?.setTime('start', time as unknown as TimeValue)
   }

   const onChangeStartMinutes = (value: string | number) => {
      const minutes = typeof value === 'string' ? parseInt(value) : value
      setStartMinutes(minutes)
      const time = new Time(
         convertTo24HourFormat(startHours ?? 0, startDayPeriod),
         minutes
      )
      state?.setTime('start', time as unknown as TimeValue)
   }

   const onChangeStartDayPeriod = (value: string) => {
      setStartDayPeriod(value as DayPeriodType)
      const time = new Time(
         convertTo24HourFormat(startHours ?? 0, value as DayPeriodType),
         startMinutes ?? 0
      )
      state?.setTime('start', time as unknown as TimeValue)
   }

   const onChangeEndHours = (value: string | number) => {
      const hours = typeof value === 'string' ? parseInt(value) : value
      setEndHours(hours)
      const time = new Time(
         convertTo24HourFormat(hours, endDayPeriod),
         endMinutes ?? 0
      )
      state?.setTime('end', time as unknown as TimeValue)
   }

   const onChangeEndMinutes = (value: string | number) => {
      const minutes = typeof value === 'string' ? parseInt(value) : value
      setEndMinutes(minutes)
      const time = new Time(
         convertTo24HourFormat(endHours ?? 0, endDayPeriod),
         minutes
      )
      state?.setTime('end', time as unknown as TimeValue)
   }

   const onChangeEndDayPeriod = (value: string) => {
      setEndDayPeriod(value as DayPeriodType)
      const time = new Time(
         convertTo24HourFormat(endHours ?? 0, value as DayPeriodType),
         endMinutes ?? 0
      )
      state?.setTime('end', time as unknown as TimeValue)
   }

   return (
      <div className={timeFieldsContainerClassName}>
         <div className={timeFieldTitleAndInputContainerClassName}>
            <p className='text-sm-medium text-secondary-700'>Start Time</p>
            <TimeField
               key={1}
               hours={startHours ?? ''}
               minutes={startMinutes ?? ''}
               dayPeriod={startDayPeriod}
               setHours={onChangeStartHours}
               setMinutes={onChangeStartMinutes}
               setDayPeriod={onChangeStartDayPeriod}
               shouldStopTimeSelectionEvent={true}
            />
         </div>
         <div className={timeFieldTitleAndInputContainerClassName}>
            <p className='text-sm-medium text-secondary-700'>End Time</p>
            <TimeField
               key={2}
               hours={endHours ?? ''}
               minutes={endMinutes ?? ''}
               dayPeriod={endDayPeriod}
               setHours={onChangeEndHours}
               setMinutes={onChangeEndMinutes}
               setDayPeriod={onChangeEndDayPeriod}
               shouldStopTimeSelectionEvent={true}
            />
         </div>
      </div>
   )
}

export default observer(TimeRangePicker)
