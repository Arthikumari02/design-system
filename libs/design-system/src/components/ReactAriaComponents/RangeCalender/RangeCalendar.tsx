import { observer } from 'mobx-react'
import {
   RangeCalendar as AriaRangeCalendar,
   RangeCalendarProps as AriaRangeCalendarProps,
   CalendarGrid,
   DateValue
} from 'react-aria-components'
import { BasicSize } from '../../../types'
import RangeCalendarGridBody from '../CalendarGridBody/RangeCalendarGridBody'
import { CalendarGridHeader } from '../CalendarGridHeader/CalendarGridHeader'
import { CalendarHeader } from '../CalendarHeader/CalendarHeader'

interface RangeCalendarProps<T extends DateValue>
   extends Omit<AriaRangeCalendarProps<T>, 'visibleDuration'> {
   errorMessage?: string
   size: BasicSize
}

const RangeCalendar = <T extends DateValue>({
   errorMessage,
   ...props
}: RangeCalendarProps<T>) => (
   <AriaRangeCalendar {...props}>
      <CalendarHeader size={props.size} />
      <CalendarGrid className='[&_td]:px-0'>
         <CalendarGridHeader size={props.size} />
         <RangeCalendarGridBody size={props.size} />
      </CalendarGrid>
   </AriaRangeCalendar>
)

export default observer(RangeCalendar)
