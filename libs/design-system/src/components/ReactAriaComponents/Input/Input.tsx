import classNames from 'classnames'
import { InputProps, Input as RACInput } from 'react-aria-components'
import { useRef } from 'react'

import { BasicSize } from '../../../types'
import { sizeStyles } from './sizes'
import { getElementTypeStyles } from './styles'

interface Props extends Omit<InputProps, 'size'> {
   size: BasicSize
}

const Input = (props: Props) => {
   const { size, ...others } = props
   const inputRef = useRef<HTMLInputElement>(null)

   const sizeContext = sizeStyles[size]

   const onFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
      props.onFocus?.(event)
      inputRef.current?.select()
   }

   return (
      <RACInput
         {...others}
         className={({ isDisabled, isFocused }) =>
            classNames(
               props.className,
               sizeContext.inputClassName,
               getElementTypeStyles({
                  isDisabled,
                  isFocused
               })
            )
         }
         ref={inputRef}
         onFocus={onFocusInput}
      />
   )
}

export default Input
