import cn from 'classnames'
import React, { forwardRef } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'

import { FocusRingVariant, SmallMediumAndLarge } from '../../../types'
import { CloseButtonContent } from './CloseButtonContent'
import { CloseButtonHierarchy, CloseButtonSubVariant } from './constants'
import { buttonSizes } from './sizes'
import { getButtonStyles } from './styles'
import { ButtonStyles } from './types'

export interface CloseButtonProps extends AriaButtonProps {
   size: SmallMediumAndLarge
   subVariant: CloseButtonSubVariant
   ref?: React.ForwardedRef<HTMLButtonElement>
   id?: string
   onClick?: (_: any) => void
   buttonContentClassName?: string
   className?: string
   children?: React.ReactNode
   shouldPassEventPropagation?: boolean
   focusRingVariant?: FocusRingVariant
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
   (
      {
         id,
         onClick,
         size = 'Medium',
         buttonContentClassName,
         className = '',
         children,
         subVariant = CloseButtonSubVariant.Gray,
         isDisabled = false,
         shouldPassEventPropagation = false,
         focusRingVariant: customFocusRingVariant,
         ...others
      }: CloseButtonProps,
      forwardedRef
   ) => {
      const hierarchy = CloseButtonHierarchy.Tertiary
      const sizedTheme = buttonSizes[size]

      return (
         <AriaButton
            {...others}
            ref={forwardedRef}
            id={id}
            isDisabled={isDisabled}
            onPress={onClick}
            // @ts-ignore
            shouldPassEventPropagation={shouldPassEventPropagation}
            className={cn(className, 'outline-none')}
         >
            {({ isHovered, isPressed, isFocused }) => {
               const {
                  bgColor,
                  border,
                  focusRingVariant,
                  iconColor
               }: ButtonStyles = getButtonStyles({
                  isHovered,
                  isPressed: isPressed || isFocused,
                  hierarchy,
                  subVariant
               })

               return (
                  <CloseButtonContent
                     {...{
                        children,
                        iconColor,
                        sizedTheme,
                        bgColor,
                        border,
                        isDisabled,
                        buttonContentClassName
                     }}
                     isFocused={isFocused}
                     within
                     variant={
                        customFocusRingVariant
                           ? customFocusRingVariant
                           : focusRingVariant
                     }
                     size={size}
                  />
               )
            }}
         </AriaButton>
      )
   }
)

CloseButton.displayName = 'CloseButton'
