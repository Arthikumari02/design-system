import cn from 'classnames'
import React, { forwardRef, ReactElement, useEffect } from 'react'

import { useFocusWithin } from '@react-aria/interactions'

import { A_KEY_CODE, P_KEY_CODE } from '../../../constants/KeyboardConstants'
import { PlayDownArrowIcon } from '../../../icons/PlayDownArrowIcon'
import { PlayUpArrowIcon } from '../../../icons/PlayUpArrowIcon'
import { FocusRingWithBorder } from '../../FocusRing/FocusRingWithBorder'
import { dayPeriodValues, DOWN_ARROW_KEY, UP_ARROW_KEY } from './constants'
import {
   buttonClassName,
   dayPeriodTogglerContainerClassName,
   dayPeriodValueStyles,
   togglerIconsContainerClassName,
   togglerUpIconClassName
} from './styles'

interface DayPeriodTogglerProps {
   value: string
   onClickUpArrow: (e) => void
   onClickDownArrow: (e) => void
   shouldStopTimeSelectionEvent?: boolean
}

//TODO: update colors as we have fixed them
const DayPeriodToggler = forwardRef(
   (
      props: DayPeriodTogglerProps,
      ref: React.ForwardedRef<HTMLDivElement>
   ): ReactElement => {
      const { value, onClickUpArrow, onClickDownArrow } = props

      const { focusWithinProps } = useFocusWithin({})

      const onKeyDownInteraction = (event: any) => {
         if (event.keyCode === UP_ARROW_KEY || event.keyCode === A_KEY_CODE) {
            if (value === dayPeriodValues.pm) {
               onClickUpArrow(event)
            }
         } else if (
            event.keyCode === DOWN_ARROW_KEY ||
            event.keyCode === P_KEY_CODE
         ) {
            if (value === dayPeriodValues.am) {
               onClickDownArrow(event)
            }
         }
      }

      const onClickToggler = (e): void => {
         if (value === dayPeriodValues.pm) {
            onClickUpArrow(e)
         } else {
            onClickDownArrow(e)
         }
      }

      const isUpArrowDisabled = value === dayPeriodValues.am
      const isDownArrowDisabled = value === dayPeriodValues.pm

      return (
         <FocusRingWithBorder within isError={false}>
            <div
               ref={ref}
               {...focusWithinProps}
               tabIndex={0}
               className={dayPeriodTogglerContainerClassName}
               onClick={e => {
                  if (props.shouldStopTimeSelectionEvent) {
                     e.stopPropagation()
                  }
               }}
               onKeyDown={onKeyDownInteraction}
            >
               <button
                  onClick={onClickToggler}
                  className={cn(buttonClassName, dayPeriodValueStyles)}
                  tabIndex={-1}
               >
                  {value}
               </button>
               <div className={togglerIconsContainerClassName}>
                  <button
                     onClick={onClickUpArrow}
                     className={cn(buttonClassName, togglerUpIconClassName)}
                     tabIndex={-1}
                  >
                     <PlayUpArrowIcon
                        className={
                           isUpArrowDisabled ? 'fill-gray-300' : 'fill-gray-400'
                        }
                     />
                  </button>
                  <button
                     onClick={onClickDownArrow}
                     className={cn(buttonClassName)}
                     tabIndex={-1}
                  >
                     <PlayDownArrowIcon
                        className={
                           isDownArrowDisabled
                              ? 'fill-gray-300'
                              : 'fill-gray-400'
                        }
                     />
                  </button>
               </div>
            </div>
         </FocusRingWithBorder>
      )
   }
)

export { DayPeriodToggler }
