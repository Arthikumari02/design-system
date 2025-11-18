import { useContext } from 'react'
import { isToday } from '@internationalized/date'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import {
   CalendarGridBody as AriaCalendarGridBody,
   CalendarCell,
   RangeCalendarStateContext
} from 'react-aria-components'
import { BasicSize } from '../../../types'
import { dateRangePickerSizes } from './sizes'
import { getRCCellClassNames, getRCCellContainerClassName } from './styles'
import './styles.css'

interface Props {
   size: BasicSize
}

const RangeCalendarGridBody = (props: Props) => {
   const sizes = dateRangePickerSizes[props.size]
   const state = useContext(RangeCalendarStateContext)

   return (
      <AriaCalendarGridBody>
         {date => (
            <CalendarCell
               date={date}
               className={({ isSelected, isSelectionStart, isSelectionEnd }) =>
                  getRCCellContainerClassName({
                     isSelected,
                     isSelectionStart,
                     isSelectionEnd,
                     sizes
                  })
               }
            >
               {({
                  formattedDate,
                  isSelected,
                  isSelectionStart,
                  isSelectionEnd,
                  isDisabled,
                  date
               }) => {
                  const isTodayDate = state?.timeZone
                     ? isToday(date as any, state?.timeZone)
                     : false
                  return (
                     <>
                        <span
                           className={getRCCellClassNames({
                              selectionState:
                                 isSelected &&
                                 (isSelectionStart || isSelectionEnd)
                                    ? 'cap'
                                    : isSelected
                                      ? 'middle'
                                      : 'none',
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
                                 'bg-brand-solid':
                                    !isSelected ||
                                    !isSelectionStart ||
                                    !isSelectionEnd
                              },
                              {
                                 'bg-primary':
                                    isSelectionStart || isSelectionEnd
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

export default observer(RangeCalendarGridBody)
