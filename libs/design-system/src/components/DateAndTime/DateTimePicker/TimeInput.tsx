import cn from 'classnames'
import React, { forwardRef, MouseEventHandler, ReactElement } from 'react'
import { useFocusWithin } from '@react-aria/interactions'

import { FocusRingWithBorder } from '../../FocusRing/FocusRingWithBorder'

import { timeInputClassName } from './styles'

import './styles.css'

interface TimeInputProps {
   placeholder: string
   value: string | number
   onChange: (event: any) => void
   onClickTimeInput?: (event: any) => void
   min?: number
   max?: number
}
const TimeInput = forwardRef(
   (
      props: TimeInputProps,
      ref: React.ForwardedRef<HTMLInputElement>
   ): ReactElement => {
      const {
         value,
         onChange,
         placeholder,
         min = 0,
         max = 12,
         onClickTimeInput
      } = props

      const { focusWithinProps } = useFocusWithin({})

      const onFocusInput = (
         event: React.FocusEvent<HTMLInputElement, Element>
      ) => {
         focusWithinProps.onFocus?.(event)
         if (ref && 'current' in ref) {
            ref.current?.select()
         }
      }

      return (
         <FocusRingWithBorder within isError={false}>
            <input
               {...focusWithinProps}
               ref={ref}
               type='number'
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               max={max}
               onClick={onClickTimeInput}
               min={min}
               className={cn(timeInputClassName, 'date-time-input')}
               onFocus={onFocusInput}
            />
         </FocusRingWithBorder>
      )
   }
)

export { TimeInput }
