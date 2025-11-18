import cn from 'classnames'
import React, { forwardRef } from 'react'
import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

import { Hierarchy, SubVariant } from '../../../types/ButtonTypes'
import { ButtonSize, FocusRingVariant } from '../../../types'
import { ButtonContent } from './ButtonContent'
import { buttonSizes } from './sizes'
import { getButtonStyles } from './styles'
import { ButtonStyles, ButtonIconColors } from './types'

export interface ButtonProps extends AriaButtonProps {
   hierarchy: Hierarchy
   size: ButtonSize
   subVariant: SubVariant
   children: any
   autoFocus?: boolean
   buttonContentClassName?: string
   childrenContainerClassName?: string
   className?: string
   id?: string
   isDisabled?: boolean
   isLoading?: boolean
   ref?: React.ForwardedRef<HTMLButtonElement>
   shouldShrinkButtonWhileLoading?: boolean
   leftIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   rightIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   onClick?: (_: any) => void
   shouldPassEventPropagation?: boolean
   buttonFocusRingVariant?: FocusRingVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         hierarchy = Hierarchy.Primary,
         size = 'Medium',
         subVariant = SubVariant.Primary,
         buttonFocusRingVariant,
         autoFocus = false,
         buttonContentClassName,
         childrenContainerClassName,
         className = '',
         id,
         isDisabled = false,
         isLoading = false,
         shouldShrinkButtonWhileLoading = false,
         shouldPassEventPropagation = false,
         leftIcon,
         onClick,
         rightIcon,
         children,
         ...others
      }: ButtonProps,
      forwardedRef
   ) => {
      const isButtonDisabled = isDisabled || isLoading
      const sizedTheme = buttonSizes[size]
      const isLinkButton = hierarchy === Hierarchy.Link

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
            className={cn(className, 'outline-none')}
         >
            {({ isHovered, isPressed, isFocused }) => {
               const {
                  bgColor,
                  textColor,
                  border,
                  loaderColor,
                  focusRingVariant,
                  iconColors
               }: ButtonStyles = getButtonStyles({
                  isHovered,
                  isPressed: isPressed || isFocused,
                  isDisabled: isButtonDisabled,
                  hierarchy,
                  subVariant,
                  isLoading
               })

               return (
                  <ButtonContent
                     {...{
                        isLoading,
                        shouldShrinkButtonWhileLoading,
                        leftIcon,
                        rightIcon,
                        children,
                        iconColors,
                        loaderColor,
                        sizedTheme,
                        childrenContainerClassName,
                        bgColor,
                        textColor,
                        border,
                        isButtonDisabled,
                        isLinkButton,
                        buttonContentClassName
                     }}
                     isFocused={isFocused}
                     within
                     variant={
                        buttonFocusRingVariant
                           ? buttonFocusRingVariant
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

Button.displayName = 'Button'
