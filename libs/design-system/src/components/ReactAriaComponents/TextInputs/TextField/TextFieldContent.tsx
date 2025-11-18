import cn from 'classnames'
import { Input } from 'react-aria-components'

import {
   withFocusRing,
   FocusRingProps
} from '../../WithFocusRing/WithFocusRing'
import { TEXT_INPUT_THEME } from './constants'
import {
   getElementTypeStyles,
   getInputContainerStyles,
   inputContainerStyles
} from './styles'

interface TextFieldContentProps extends FocusRingProps {
   isDisabled: boolean
   textInputRef: React.RefObject<HTMLInputElement>
   shouldHighlightErrorState: boolean
   sizeContext: any
   inputContainerClassName?: string
   LeftElement?: React.ComponentType<any>
   RightElement?: React.ComponentType<any>
   inputClassName?: string
   placeholder?: string

   onClick?: (
      e:
         | React.MouseEvent<HTMLInputElement, MouseEvent>
         | React.MouseEvent<HTMLTextAreaElement, MouseEvent>
   ) => void
   value: string | undefined
   inputIsFocused: boolean
   className?: string

   minValue?: number
   maxValue?: number
}

const TextFieldContentBase = ({
   isDisabled,
   shouldHighlightErrorState,
   sizeContext,
   inputContainerClassName,
   LeftElement,
   RightElement,
   inputClassName,
   placeholder,
   onClick,
   inputIsFocused,
   className,
   textInputRef,
   value,
   minValue,
   maxValue
}: TextFieldContentProps): React.ReactElement => {
   const { borderColor, bgColor } = getInputContainerStyles({
      isDisabled,
      isFocused: inputIsFocused,
      isError: shouldHighlightErrorState
   })

   const { commonStyles, textColor, placeholderTextColor } =
      getElementTypeStyles({
         isDisabled,
         isFocused: inputIsFocused,
         isError: shouldHighlightErrorState
      })

   return (
      <div
         className={cn(
            className,
            sizeContext.inputContainerClassName,
            inputContainerClassName,
            inputContainerStyles,
            borderColor,
            bgColor,
            {
               'cursor-not-allowed': isDisabled
            }
         )}
      >
         {LeftElement ? (
            <LeftElement
               color={
                  shouldHighlightErrorState
                     ? TEXT_INPUT_THEME.error.color
                     : null
               }
            />
         ) : null}
         <Input
            title={value}
            ref={textInputRef}
            lens-role='text-field'
            className={cn(
               {
                  'cursor-not-allowed bg-disabled_subtle': isDisabled
               },
               sizeContext.inputClassName,
               inputClassName,
               commonStyles,
               textColor,
               placeholderTextColor
            )}
            placeholder={placeholder}
            onClick={onClick}
            min={minValue}
            max={maxValue}
         />

         {RightElement ? (
            <RightElement
               color={
                  shouldHighlightErrorState
                     ? TEXT_INPUT_THEME.error.color
                     : null
               }
            />
         ) : null}
      </div>
   )
}

export const TextFieldContent = withFocusRing(TextFieldContentBase)
