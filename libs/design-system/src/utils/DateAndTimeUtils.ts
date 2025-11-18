import { CalendarDate, CalendarDateTime, Time } from '@internationalized/date'
import { DateValue } from 'react-aria-components'

export const convertDateObjToDateValueObj = (date: Date): DateValue => {
   const convertedDate = new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
   )

   return convertedDate
}

export const convertDateObjToCalendarDateObj = (date: Date): CalendarDate => {
   //FIXME: need to fix this
   const dateValue = new Date(date)
   const convertedDate = new CalendarDate(
      dateValue.getFullYear(),
      dateValue.getMonth() + 1,
      dateValue.getDate()
   )

   return convertedDate
}

export const convertDateValueObjToDateObj = (date: DateValue): Date => {
   if ('hour' in date) {
      return new Date(
         date.year,
         date.month - 1,
         date.day,
         date.hour,
         date.minute
      )
   }
   return new Date(date.year, date.month - 1, date.day)
}

export const convertDateObjToCalendarDateTimeObj = (date: Date): DateValue => {
   const convertedDate = new CalendarDateTime(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
   )

   return convertedDate
}

export const getTimeFromDate = (date: Date): Time =>
   new Time(date.getHours(), date.getMinutes(), date.getSeconds())

export const appendTimeToDate = (date: Date, time: Time): Date => {
   const updatedDate = new Date(date)
   updatedDate.setHours(time.hour)
   updatedDate.setMinutes(time.minute)
   updatedDate.setSeconds(time.second)

   return updatedDate
}
