import cn from 'classnames'
import {
   forwardRef,
   ReactNode,
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState
} from 'react'
import { TextField, TextFieldProps } from 'react-aria-components'
import { useControlledState } from '@react-stately/utils'

import { FocusRingVariant, SmallAndMedium } from '../../../../types'
import HelpTextAndFieldError from '../../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../../Label/Label'
import { sizeStyles } from './sizes'
import { TextAreaContent } from './TextAreaContent'

export interface RACTextAreaProps extends TextFieldProps {
   size: SmallAndMedium
   hint?: ReactNode
   inputRef?: React.ForwardedRef<HTMLTextAreaElement>
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
   label?: string | null
   placeholder?: string
   errorMessage?: ReactNode
   renderRequiredIcon?: () => React.ReactElement
   onClick?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
   shouldSelectTextOnFocus?: boolean
   onMouseDown?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
}

const RACTextArea = forwardRef<HTMLTextAreaElement, RACTextAreaProps>(
   (props: RACTextAreaProps, forwardedRef): React.ReactElement => {
      const {
         errorMessage: error,
         hint,
         label,
         placeholder,
         leftElement: LeftElement,
         rightElement: RightElement,
         containerClassName = 'w-full',
         inputContainerClassName = '',
         inputClassName = '',
         hintClassName = '',
         labelClassName = '',
         isDisabled = false,
         shouldShowHint = true,
         size,
         title,
         renderRequiredIcon,
         onClick,
         focusRingVariant,
         value,
         shouldSelectTextOnFocus
      } = props

      const [inputValue, setInputValue] = useControlledState(
         props.value ?? '',
         props.defaultValue
      )

      const _inputRef = useRef<unknown>(props.inputRef)
      const inputRef: any = forwardedRef || _inputRef

      useEffect(() => {
         if (shouldSelectTextOnFocus) inputRef.current?.select()
      }, [inputRef])

      const onHeightChange = useCallback(() => {
         // Quiet textareas always grow based on their text content.
         // Standard textareas also grow by default, unless an explicit height is set.
         if (inputRef?.current) {
            const input = inputRef?.current
            const prevAlignment = input.style.alignSelf
            const prevOverflow = input.style.overflow
            // Firefox scroll position is lost when overflow: 'hidden' is applied so we skip applying it.
            // The measure/applied height is also incorrect/reset if we turn on and off
            // overflow: hidden in Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1787062
            const isFirefox = 'MozAppearance' in input.style
            if (!isFirefox) {
               input.style.overflow = 'hidden'
            }
            input.style.alignSelf = 'start'
            input.style.height = 'auto'
            // offsetHeight - clientHeight accounts for the border/padding.
            input.style.height = `${
               input.scrollHeight + (input.offsetHeight - input.clientHeight)
            }px`
            input.style.overflow = prevOverflow
            input.style.alignSelf = prevAlignment
         }
      }, [inputRef])

      useLayoutEffect(() => {
         if (inputRef.current) {
            onHeightChange()
         }
      }, [onHeightChange, inputValue, inputRef])

      const [isFocused, setIsFocused] = useState(false)

      const sizeContext = sizeStyles[size]

      const shouldHighlightErrorState = error && !isFocused ? true : false

      const onFocus = (event: any) => {
         setIsFocused(true)
         props.onFocus?.(event)
      }

      const onBlur = (event: any) => {
         setIsFocused(false)
         props.onBlur?.(event)
      }

      const onChange = (value: string) => {
         props.onChange?.(value)
         setInputValue(value)
      }

      return (
         <div className={cn('flex flex-col', containerClassName)} title={title}>
            <TextField
               {...props}
               isInvalid={Boolean(error)}
               onFocus={onFocus}
               onChange={onChange}
               onBlur={onBlur}
            >
               {label ? (
                  <Label
                     size={size}
                     contextualHelp={renderRequiredIcon}
                     className={cn(labelClassName, 'mb-sm')}
                  >
                     {label}
                  </Label>
               ) : null}

               <TextAreaContent
                  isDisabled={isDisabled}
                  shouldHighlightErrorState={shouldHighlightErrorState}
                  sizeContext={sizeContext}
                  isFocused={isFocused}
                  LeftElement={LeftElement}
                  RightElement={RightElement}
                  inputClassName={inputClassName}
                  inputContainerClassName={inputContainerClassName}
                  onClick={onClick}
                  inputIsFocused={isFocused}
                  variant={focusRingVariant}
                  inputRef={inputRef}
                  placeholder={placeholder}
                  value={value}
                  onMouseDown={props.onMouseDown}
               />

               {shouldShowHint && (
                  <HelpTextAndFieldError
                     hint={hint}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                     //@ts-ignore
                     error={error && !isFocused ? error : ''}
                     containerClassName={cn(hintClassName, 'mt-xs')}
                     size={size}
                  />
               )}
            </TextField>
         </div>
      )
   }
)

export default RACTextArea
