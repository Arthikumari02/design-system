import {
   CalendarDate,
   CalendarDateTime,
   DateValue,
   Time,
   ZonedDateTime
} from '@internationalized/date'

interface DateResult {
   calendarDate: CalendarDate | null
   isValidDate: boolean
}

const isLeapYear = (year: number): boolean =>
   (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

const isValidDate = (year: number, month: number, day: number): boolean => {
   // Check month range (1-12)
   if (month < 1 || month > 12) return false

   // Check day range based on month
   const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

   // Adjust February for leap year
   if (month === 2 && isLeapYear(year)) {
      if (day < 1 || day > 29) return false
   } else {
      if (day < 1 || day > daysInMonth[month - 1]) return false
   }

   return true
}

// Helper function to parse month names consistently
const getMonthNumber = (monthName: string): number => {
   const date = new Date(`${monthName} 1, 2000`)
   if (isNaN(date.getTime())) return -1
   return date.getMonth() + 1
}

export const parseDateInput = (input: string): DateResult => {
   // Clean up input and normalize separators
   const cleanInput = input.trim().toLowerCase().replace(/[.]/g, '/')

   // Initialize result
   const result: DateResult = {
      calendarDate: null,
      isValidDate: false
   }

   // Handle special keywords
   const now = new Date()
   const today = new CalendarDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
   )
   switch (cleanInput) {
      case 'today':
         result.calendarDate = today
         result.isValidDate = true
         return result
      case 'tomorrow':
         result.calendarDate = today.add({ days: 1 })
         result.isValidDate = true
         return result
      case 'yesterday':
         result.calendarDate = today.add({ days: -1 })
         result.isValidDate = true
         return result
   }

   // Handle different valid formats
   const formats = [
      // Format: DD MMM YYYY (12 Aug 2024 or 12 August 2024)
      {
         regex: /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/,
         parse: (matches: RegExpMatchArray) => {
            const day = Number(matches[1])
            const monthName = matches[2]
            const year = Number(matches[3])

            const month = getMonthNumber(monthName)
            if (month === -1) return null

            if (!isValidDate(year, month, day)) return null

            return new CalendarDate(year, month, day)
         }
      },
      // Format: 20/8/2024, 8/20/2024, 2.22.2024, 2,22,2024 etc.
      {
         regex: /^(\d{1,2})[\\/-](\d{1,2})[\\/-](\d{4})$/,
         parse: (matches: RegExpMatchArray) => {
            const first = Number(matches[1])
            const second = Number(matches[2])
            const year = Number(matches[3])

            if (first > 12) {
               if (!isValidDate(year, second, first)) return null
               return new CalendarDate(year, second, first) // dd/mm/yyyy
            } else if (second > 12) {
               if (!isValidDate(year, first, second)) return null
               return new CalendarDate(year, first, second) // mm/dd/yyyy
            } else if (first <= 12 && second <= 12) {
               if (!isValidDate(year, second, first)) return null
               return new CalendarDate(year, second, first) // dd/mm/yyyy for ambiguous cases
            }
         }
      },
      // Format: 2024/8/20 or 2024/20/8
      {
         regex: /^(\d{4})[\\/-](\d{1,2})[\\/-](\d{1,2})$/,
         parse: (matches: RegExpMatchArray) => {
            const year = Number(matches[1])
            const first = Number(matches[2])
            const second = Number(matches[3])

            if (first > 12) {
               if (!isValidDate(year, second, first)) return null
               return new CalendarDate(year, second, first) // yyyy/dd/mm
            }
            if (!isValidDate(year, first, second)) return null
            return new CalendarDate(year, first, second) // yyyy/mm/dd
         }
      },
      // Format: 2024-08-20 (ISO format with hyphens)
      {
         regex: /^(\d{4})-(\d{2})-(\d{2})$/,
         parse: (matches: RegExpMatchArray) => {
            const year = Number(matches[1])
            const month = Number(matches[2])
            const day = Number(matches[3])

            if (!isValidDate(year, month, day)) return null

            return new CalendarDate(year, month, day)
         }
      }
   ]

   // Try each format
   for (const format of formats) {
      const matches = cleanInput.match(format.regex)
      if (matches) {
         try {
            const calendarDate = format.parse(matches)
            if (calendarDate) {
               result.calendarDate = calendarDate
               result.isValidDate = true
               return result
            }
         } catch (e) {
            continue
         }
      }
   }

   return result
}

export const formatDateString = (date: CalendarDate): string => {
   const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
   ]

   const month = monthNames[date.month - 1]
   const day = date.day
   const year = date.year

   return `${day} ${month} ${year}`
}

export const parseTimeInput = (
   timeString: string
): { time: Time | null; isValidTime: boolean } => {
   // Define a regular expression to match valid time formats
   const timeRegex = /^(\d{1,2})(?::(\d{1,2}))?\s*([APap]m?)?$/i

   const match = timeString.match(timeRegex)
   if (!match) {
      return { time: null, isValidTime: false }
   }

   const [, hourStr, minuteStr = '0', ampm = ''] = match
   let hour = parseInt(hourStr, 10)
   const minute = parseInt(minuteStr.padStart(2, '0'), 10) // Pad single digit minutes with a leading 0

   // Normalize the hour based on the AM/PM indicator
   if (ampm.toLowerCase().startsWith('p') && hour < 12) {
      hour += 12
   } else if (ampm.toLowerCase().startsWith('a') && hour === 12) {
      hour = 0
   }

   // Handle "24" or "24:xx" as "12 AM"
   if (ampm === '' && hour === 24) {
      hour = 0
   }

   // Validate hour and minute bounds
   const isValidTime = hour >= 0 && hour < 24 && minute >= 0 && minute < 60
   const time = isValidTime ? new Time(hour, minute, 0) : null

   return { time, isValidTime }
}

export const formatTimeString = (time: Time): string => {
   const hour = time.hour % 12 || 12
   const minute = time.minute.toString().padStart(2, '0')
   const ampm = time.hour < 12 ? 'AM' : 'PM'

   return `${hour}:${minute} ${ampm}`
}

export const isDateInRange = (
   date: CalendarDate,
   minDate?: DateValue,
   maxDate?: DateValue
): boolean => {
   if (!minDate && !maxDate) {
      return true
   }

   const dateOnly = new Date(date.year, date.month - 1, date.day)

   // Check min date if available
   if (minDate) {
      const minDateOnly = new Date(minDate.year, minDate.month - 1, minDate.day)
      if (dateOnly.getTime() < minDateOnly.getTime()) {
         return false
      }
   }

   // Check max date if available
   if (maxDate) {
      const maxDateOnly = new Date(maxDate.year, maxDate.month - 1, maxDate.day)
      if (dateOnly.getTime() > maxDateOnly.getTime()) {
         return false
      }
   }

   return true
}

export const areBothDatesEqual = (
   date1: CalendarDate,
   date2: DateValue
): boolean =>
   // Check if both dates have the same year, month, and day
   date1.year === date2.year &&
   date1.month === date2.month &&
   date1.day === date2.day

export const isCurrentTimeOnOrAfterMinTime = (
   time: Time,
   minTime: CalendarDateTime | ZonedDateTime
): boolean => {
   // Compare hours and minutes
   if (time.hour > minTime.hour) {
      return true
   } else if (time.hour === minTime.hour && time.minute >= minTime.minute) {
      return true
   }
   return false
}

export const isCurrentTimeOnOrBeforeMaxTime = (
   time: Time,
   maxTime: CalendarDateTime | ZonedDateTime
): boolean => {
   // Compare hours and minutes
   if (time.hour < maxTime.hour) {
      return true
   } else if (time.hour === maxTime.hour && time.minute <= maxTime.minute) {
      return true
   }
   return false
}
