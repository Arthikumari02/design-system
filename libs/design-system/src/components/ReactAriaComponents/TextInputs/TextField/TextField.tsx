import cn from 'classnames'
import { forwardRef, ReactNode, useRef, useState } from 'react'
import type { TextFieldProps } from 'react-aria-components'
import { TextField } from 'react-aria-components'

import { FocusRingVariant, SmallAndMedium } from '../../../../types'

import HelpTextAndFieldError from '../../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../../Label/Label'

import { sizeStyles } from './sizes'
import { TextFieldContent } from './TextFieldContent'

export interface RACTextFieldProps extends TextFieldProps {
   highlightErrorState?: boolean
   size: SmallAndMedium
   ref?: React.ForwardedRef<HTMLInputElement>
   hint?: ReactNode
   multiLine?: boolean
   leftElement?: React.ComponentType<any>

   rightElement?: React.ComponentType<any>

   color?: string

   containerClassName?: string

   inputContainerClassName?: string

   inputClassName?: string

   focusRingVariant?: FocusRingVariant

   hintClassName?: string

   labelClassName?: string
   isRequired?: boolean
   shouldShowHint?: boolean
   title?: string
   errorTransitionClassName?: string

   renderRequiredIcon?: () => React.ReactElement
   shouldSelectInputOnFocus?: boolean
   shouldShowErrorOnFocus?: boolean
   withIn?: boolean
   onClick?: (e: any) => void

   //Newly Added
   label?: string | null
   placeholder?: string
   errorMessage?: ReactNode

   minValue?: number
   maxValue?: number
}

const RACTextField = forwardRef<HTMLInputElement, RACTextFieldProps>(
   (props: RACTextFieldProps, forwardedRef) => {
      const {
         autoFocus = false,
         highlightErrorState = false,
         errorMessage: error,
         errorTransitionClassName,
         hint,
         label,
         isDisabled = false,
         size = 'Small',
         withIn = true,
         leftElement: LeftElement,
         rightElement: RightElement,
         containerClassName = 'w-full',
         inputContainerClassName,
         inputClassName,
         labelClassName = '',
         hintClassName = '',
         shouldShowHint = true,
         title,
         renderRequiredIcon,
         shouldSelectInputOnFocus = true,
         shouldShowErrorOnFocus = false, //Hint,
         focusRingVariant,
         placeholder,
         value,
         minValue,
         maxValue
      } = props

      const defaultInputRef = useRef<HTMLInputElement>(null)

      const inputRef: any = forwardedRef || props.ref || defaultInputRef

      const sizeContext = sizeStyles[size]

      const [isFocused, setIsFocused] = useState(false)

      const shouldHighlightErrorState =
         (Boolean(error) || highlightErrorState) && !isFocused ? true : false
      //NOTE: Keep the below state in sync with above state
      const shouldHighlightErrorMessageState =
         (error || highlightErrorState) && shouldShowErrorOnFocus
            ? true
            : !isFocused
              ? true
              : false

      const onFocusInput = (event: any) => {
         props.onFocus?.(event)
         setIsFocused(true)
         if (shouldSelectInputOnFocus) inputRef.current?.select()
      }

      const onBlurInput = (event: any) => {
         setIsFocused(false)
         props.onBlur?.(event)
      }

      return (
         <div className={cn('flex flex-col', containerClassName)} title={title}>
            <TextField
               {...props}
               isInvalid={Boolean(error)}
               onBlur={onBlurInput}
               onFocus={onFocusInput}
            >
               {label ? (
                  <Label
                     size={size}
                     contextualHelp={renderRequiredIcon}
                     className={cn(labelClassName)}
                     isRequired={props.isRequired}
                  >
                     {label}
                  </Label>
               ) : null}
               <TextFieldContent
                  isDisabled={isDisabled}
                  shouldHighlightErrorState={shouldHighlightErrorState}
                  sizeContext={sizeContext}
                  isFocused={isFocused}
                  LeftElement={LeftElement}
                  RightElement={RightElement}
                  inputClassName={inputClassName}
                  inputContainerClassName={inputContainerClassName}
                  placeholder={placeholder}
                  onClick={props.onClick}
                  inputIsFocused={isFocused}
                  variant={focusRingVariant}
                  within={withIn}
                  autoFocus={autoFocus}
                  textInputRef={inputRef as any}
                  value={value}
                  minValue={minValue}
                  maxValue={maxValue}
               />
               {shouldShowHint ? (
                  <HelpTextAndFieldError
                     hint={hint}
                     error={
                        shouldHighlightErrorMessageState ? error : undefined
                     }
                     size={size}
                     errorTransitionClassName={errorTransitionClassName}
                     containerClassName={cn(hintClassName, 'mt-sm')}
                  />
               ) : null}
            </TextField>
         </div>
      )
   }
)

export default RACTextField
