import { mergeProps } from '@react-aria/utils'

import cn from 'classnames'
import React, { ReactElement } from 'react'

import { HoverFocusBorder } from '../../FocusRing/HoverFocusBorder'

import { getMenuTriggerBoxSizeStyles } from '../sizes'
import * as Styles from '../styles'
import { ButtonGroupVariant, DefaultOptionType, ExtendedSize } from '../types'

interface PlainButtonGroupProps {
   selectedOption?: DefaultOptionType
   selectedText: string
   variant: ButtonGroupVariant
   size: ExtendedSize
   isHovered: boolean
   isButtonHovered: boolean
   isFocused: boolean
   containerClassName?: string
   hoverProps: any
   focusProps: any
   renderPopoverTrigger: (renderTrigger: () => ReactElement) => ReactElement
   renderDefaultVariantTrigger: () => ReactElement
}

export const PlainButtonGroup: React.FC<PlainButtonGroupProps> = ({
   selectedOption,
   selectedText,
   variant,
   size,
   isHovered,
   isButtonHovered,
   isFocused,
   containerClassName,
   hoverProps,
   focusProps,
   renderPopoverTrigger,
   renderDefaultVariantTrigger
}) => {
   const { selectedOptionPadding, borderRadius } = getMenuTriggerBoxSizeStyles(
      variant,
      size
   )

   // Extract isOpen from the renderDefaultVariantTrigger function
   const defaultTrigger = renderDefaultVariantTrigger()
   const isOpen = defaultTrigger.props.isOpen

   const isActive = isHovered || isFocused || isButtonHovered || isOpen

   // Create a wrapper for the popover trigger that will only be rendered when active
   const conditionalRenderPopoverTrigger = () => {
      if (isActive) {
         return renderPopoverTrigger(renderDefaultVariantTrigger)
      }
      return null
   }

   return (
      <HoverFocusBorder variant={'Gray'} isHovered={isActive}>
         <div
            className={cn(
               Styles.plainButtonGroupContainerStyles,
               borderRadius,
               containerClassName
            )}
            tabIndex={0}
            {...mergeProps(hoverProps, focusProps)}
         >
            <div
               className={cn(
                  Styles.plainSelectedValueContainer,
                  selectedOptionPadding,
                  {
                     'cursor-pointer': selectedOption?.label
                  },
                  {
                     'border-r !border-primary': isActive
                  }
               )}
               onClick={() => selectedOption?.onClick?.()}
            >
               <p className={Styles.menuTriggerText} title={selectedText}>
                  {selectedText}
               </p>
            </div>
            {conditionalRenderPopoverTrigger()}
         </div>
      </HoverFocusBorder>
   )
}
