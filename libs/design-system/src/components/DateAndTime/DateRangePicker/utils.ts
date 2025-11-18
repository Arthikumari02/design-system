import { BasicSize, ButtonSize } from '../../../types'

export type DayPeriodType = 'AM' | 'PM'

export const convertTo24HourFormat = (
   hours: number,
   period: DayPeriodType
): number => {
   if (period === 'PM' && hours !== 12) {
      hours += 12
   } else if (period === 'AM' && hours === 12) {
      hours = 0
   }
   return hours
}

export const convertTo12HourFormat = (hours: number): number => {
   let adjustedHours = hours % 12

   adjustedHours = adjustedHours === 0 ? 12 : adjustedHours

   return adjustedHours
}

export const getDayPeriod = (hours: number): DayPeriodType => {
   if (hours >= 12) {
      return 'PM'
   }
   return 'AM'
}
