import { isToday } from '@internationalized/date'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useContext } from 'react'
import {
   CalendarGridBody as AriaCalendarGridBody,
   CalendarCell,
   CalendarStateContext
} from 'react-aria-components'
import { BasicSize } from '../../../types'
import { dateRangePickerSizes } from './sizes'
import { calendarCellClassName, calendarCellContainerClassName } from './styles'
import './styles.css'

interface Props {
   size: BasicSize
}

const CalendarGridBody = (props: Props) => {
   const sizes = dateRangePickerSizes[props.size]

   const state = useContext(CalendarStateContext)

   return (
      <AriaCalendarGridBody>
         {date => (
            <CalendarCell
               date={date}
               className={({ isSelected }) =>
                  classNames(calendarCellContainerClassName, {
                     [sizes.textMedium]: isSelected,
                     [sizes.textRegular]: !isSelected
                  })
               }
            >
               {({ formattedDate, isSelected, isDisabled, date }) => {
                  const isTodayDate = state?.timeZone
                     ? isToday(date as any, state?.timeZone)
                     : false
                  return (
                     <>
                        <span
                           className={calendarCellClassName({
                              isSelected,
                              isDisabled,
                              isTodayDate
                           })}
                        >
                           {formattedDate}
                        </span>
                        <div
                           className={classNames(
                              { 'calender-cell-dot': isTodayDate },
                              {
                                 'bg-brand-solid': !isSelected
                              },
                              {
                                 'bg-primary': isSelected
                              }
                           )}
                        />
                     </>
                  )
               }}
            </CalendarCell>
         )}
      </AriaCalendarGridBody>
   )
}

export default observer(CalendarGridBody)
