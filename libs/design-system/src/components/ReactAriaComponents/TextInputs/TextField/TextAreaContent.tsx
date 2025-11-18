import cn from 'classnames'
import { TextArea } from 'react-aria-components'

import {
   FocusRingProps,
   withFocusRing
} from '../../WithFocusRing/WithFocusRing'
import { TEXT_INPUT_THEME } from './constants'
import {
   getElementTypeStyles,
   getInputContainerStyles,
   inputContainerStyles
} from './styles'
import { RefObject } from 'react'

interface TextAreaContentProps extends FocusRingProps {
   isDisabled: boolean
   shouldHighlightErrorState: boolean
   sizeContext: any
   inputIsFocused: boolean

   inputRef: RefObject<HTMLTextAreaElement>
   LeftElement?: React.ComponentType<any>
   RightElement?: React.ComponentType<any>
   inputClassName?: string
   inputContainerClassName?: string
   onClick?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
   className?: string
   placeholder?: string
   value: string | undefined
   onMouseDown?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
}

export const TextAreaBaseContent = ({
   isDisabled,
   shouldHighlightErrorState,
   sizeContext,
   inputIsFocused: isFocused,
   LeftElement,
   RightElement,
   inputClassName = '',
   inputContainerClassName = '',
   onClick,
   className,
   placeholder,
   inputRef,
   value,
   onMouseDown
}: TextAreaContentProps): React.ReactElement => {
   const { borderColor, bgColor } = getInputContainerStyles({
      isDisabled,
      isFocused,
      isError: shouldHighlightErrorState
   })

   const { textAreaCommonStyles, textColor, placeholderTextColor } =
      getElementTypeStyles({
         isDisabled,
         isFocused,
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
         <TextArea
            title={value}
            ref={inputRef}
            lens-role='text-field'
            rows={1}
            id='text-area-design-system'
            className={cn(
               {
                  'cursor-not-allowed bg-disabled_subtle': isDisabled
               },
               sizeContext.inputClassName,
               inputClassName,
               textAreaCommonStyles,
               textColor,
               placeholderTextColor
            )}
            onClick={onClick}
            placeholder={placeholder}
            onMouseDown={onMouseDown}
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

export const TextAreaContent = withFocusRing(TextAreaBaseContent)
