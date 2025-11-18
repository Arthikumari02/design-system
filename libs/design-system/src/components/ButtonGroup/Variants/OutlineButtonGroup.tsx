import cn from 'classnames'
import React, { ReactElement } from 'react'

import { getMenuTriggerBoxSizeStyles } from '../sizes'
import * as Styles from '../styles'
import { ButtonGroupVariant, DefaultOptionType, ExtendedSize } from '../types'

interface OutlineButtonGroupProps {
   selectedOption?: DefaultOptionType
   selectedText: string
   variant: ButtonGroupVariant
   size: ExtendedSize
   containerClassName?: string
   renderPopoverTrigger: (renderTrigger: () => ReactElement) => ReactElement
   renderDefaultVariantTrigger: () => ReactElement
}

export const OutlineButtonGroup: React.FC<OutlineButtonGroupProps> = ({
   selectedOption,
   selectedText,
   variant,
   size,
   containerClassName,
   renderPopoverTrigger,
   renderDefaultVariantTrigger
}) => {
   const { selectedOptionPadding, borderRadius } = getMenuTriggerBoxSizeStyles(
      variant,
      size
   )

   return (
      <div
         className={cn(
            Styles.outlineButtonGroupContainerStyles,
            borderRadius,
            containerClassName
         )}
      >
         <div
            className={cn(
               Styles.outlineSelectedValueContainer,
               selectedOptionPadding,
               {
                  'cursor-pointer': selectedOption?.label
               }
            )}
            onClick={() => selectedOption?.onClick?.()}
         >
            <p className={Styles.menuTriggerText} title={selectedText}>
               {selectedText}
            </p>
         </div>
         {renderPopoverTrigger(renderDefaultVariantTrigger)}
      </div>
   )
}
