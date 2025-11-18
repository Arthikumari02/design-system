import { observer } from 'mobx-react'
import {
   Calendar as AriaCalendar,
   CalendarProps as AriaCalendarProps,
   CalendarGrid,
   DateValue
} from 'react-aria-components'
import { BasicSize } from '../../../types'
import CalendarGridBody from '../CalendarGridBody/CalendarGridBody'
import { CalendarGridHeader } from '../CalendarGridHeader/CalendarGridHeader'
import { CalendarHeader } from '../CalendarHeader/CalendarHeader'

interface CalendarProps<T extends DateValue>
   extends Omit<AriaCalendarProps<T>, 'visibleDuration'> {
   errorMessage?: string
   size: BasicSize
}

const Calendar = <T extends DateValue>({
   errorMessage,
   ...props
}: CalendarProps<T>) => (
   <AriaCalendar {...props}>
      <CalendarHeader size={props.size} />
      <CalendarGrid className='[&_td]:px-0 w-full'>
         <CalendarGridHeader size={props.size} />
         <CalendarGridBody size={props.size} />
      </CalendarGrid>
   </AriaCalendar>
)

export default observer(Calendar)
