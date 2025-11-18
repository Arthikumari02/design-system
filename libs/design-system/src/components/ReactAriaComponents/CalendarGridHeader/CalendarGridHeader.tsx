import {
   CalendarGridHeader as AriaCalendarGridHeader,
   CalendarHeaderCell
} from 'react-aria-components'

import { BasicSize } from '../../../types'

import { calendarGridHeaderSizes } from './sizes'
import { getDayStyles } from './styles'

interface Props {
   size: BasicSize
}

export function CalendarGridHeader(props: Props) {
   const daySize = calendarGridHeaderSizes[props.size]

   return (
      <AriaCalendarGridHeader>
         {day => (
            <CalendarHeaderCell className={getDayStyles(daySize)}>
               {day}
            </CalendarHeaderCell>
         )}
      </AriaCalendarGridHeader>
   )
}
