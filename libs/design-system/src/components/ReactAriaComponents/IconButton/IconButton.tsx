import cn from 'classnames'
import React, { forwardRef } from 'react'
import { Button as AriaButton } from 'react-aria-components'

import { ButtonSize, FocusRingVariant } from '../../../types'
import { IconButtonHierarchy, IconButtonSubVariant } from './constants'
import { IconButtonContent } from './IconButtonContent'
import { buttonSizes } from './sizes'
import { getButtonStyles } from './styles'
import { ButtonStyles, IconStyles } from './types'

import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

export interface IconButtonProps extends AriaButtonProps {
   hierarchy: IconButtonHierarchy
   size: ButtonSize
   subVariant: IconButtonSubVariant
   isLoading?: boolean
   isDisabled?: boolean
   ref?: React.ForwardedRef<HTMLButtonElement>
   id?: string
   autoFocus?: boolean
   icon: (iconProps: IconStyles) => React.ReactNode
   onClick?: (_: any) => void
   buttonContentClassName?: string
   className?: string
   title?: string
   shouldPassEventPropagation?: boolean
   focusRingVariant?: FocusRingVariant
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
   (
      {
         id,
         autoFocus = false,
         isDisabled = false,
         isLoading = false,
         icon,
         onClick,
         size = 'Medium',
         buttonContentClassName,
         className = '',
         subVariant = IconButtonSubVariant.Primary,
         hierarchy = IconButtonHierarchy.Primary,
         shouldPassEventPropagation = false,
         focusRingVariant: customFocusRingVariant,
         title,
         ...others
      }: IconButtonProps,
      forwardedRef
   ) => {
      const isButtonDisabled = isDisabled || isLoading
      const sizedTheme = buttonSizes[size]

      return (
         <AriaButton
            {...others}
            ref={forwardedRef}
            id={id}
            autoFocus={autoFocus}
            isDisabled={isButtonDisabled}
            onPress={onClick}
            // @ts-ignore
            shouldPassEventPropagation={shouldPassEventPropagation}
            className={cn(className, 'outline-none', {
               'cursor-not-allowed': isButtonDisabled
            })}
         >
            {({ isHovered, isPressed, isFocused }) => {
               const {
                  bgColor,
                  border,
                  loaderColor,
                  focusRingVariant,
                  iconColors
               }: ButtonStyles = getButtonStyles({
                  isHovered,
                  isPressed: isPressed || isFocused,
                  isDisabled: isButtonDisabled,
                  hierarchy,
                  subVariant
               })

               return (
                  <IconButtonContent
                     {...{
                        isLoading,
                        icon,
                        iconColors,
                        loaderColor,
                        sizedTheme,
                        bgColor,
                        border,
                        isButtonDisabled,
                        buttonContentClassName
                     }}
                     isFocused={isFocused}
                     within
                     variant={
                        focusRingVariant ? focusRingVariant : focusRingVariant
                     }
                     size={size}
                     title={title}
                  />
               )
            }}
         </AriaButton>
      )
   }
)

IconButton.displayName = 'IconButton'
