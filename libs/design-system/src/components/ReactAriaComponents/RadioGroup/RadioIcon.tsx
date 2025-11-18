import React from 'react'

import { RadioUnSelectedIcon } from '../../../icons/RadioUnSelectedIcon'
import FilledCheckCircle from '../../../icons/FilledCheckCircle'
import FilledDisabledRadioGroup from '../../../icons/FilledDisabledRadioGroup'
import FilledSelectedRadioIcon from '../../../icons/FilledSelectedRadioIcon'
import { withFocusRing } from '../WithFocusRing/WithFocusRing'
import { sizes } from './sizes'
import { radioGroupColors } from './constants'
import './index.css'

export const RadioIcon = withFocusRing(
   ({
      isSelected,
      isDisabled,
      isHovered,
      error,
      size,
      isFilledVariant,
      className,
      ...props
   }: any) => {
      const iconSize = sizes[size].icon

      const renderRadioIcon = () => {
         // Handle disabled state first
         if (isDisabled) {
            const className = radioGroupColors.radioGroup.disabled.className
            if (isSelected) {
               return (
                  <FilledDisabledRadioGroup
                     height={iconSize.height}
                     width={iconSize.width}
                     className={className}
                  />
               )
            }
            return (
               <RadioUnSelectedIcon
                  height={iconSize.height}
                  width={iconSize.width}
                  className={className}
               />
            )
         }

         // Handle selected state
         if (isSelected) {
            if (error) {
               const className = isHovered
                  ? radioGroupColors.radioGroup.error.selected.hovered
                  : radioGroupColors.radioGroup.error.selected.default
               if (isFilledVariant) {
                  return (
                     <FilledCheckCircle
                        height={iconSize.height}
                        width={iconSize.width}
                        className={className}
                     />
                  )
               }
               return (
                  <FilledSelectedRadioIcon
                     height={iconSize.height}
                     width={iconSize.width}
                     className={className}
                  />
               )
            }

            const className = isHovered
               ? radioGroupColors.radioGroup.selected.hovered
               : radioGroupColors.radioGroup.selected.default
            if (isFilledVariant) {
               return (
                  <FilledCheckCircle
                     height={iconSize.height}
                     width={iconSize.width}
                     className={className}
                  />
               )
            }
            return (
               <FilledSelectedRadioIcon
                  height={iconSize.height}
                  width={iconSize.width}
                  className={className}
               />
            )
         }

         // Handle unselected state
         if (error) {
            const className = isHovered
               ? radioGroupColors.radioGroup.error.unSelected.hover
               : radioGroupColors.radioGroup.error.unSelected.default
            return (
               <RadioUnSelectedIcon
                  height={iconSize.height}
                  width={iconSize.width}
                  className={className}
               />
            )
         }

         const className = isHovered
            ? radioGroupColors.radioGroup.unSelected.hover
            : radioGroupColors.radioGroup.unSelected.default
         return (
            <RadioUnSelectedIcon
               height={iconSize.height}
               width={iconSize.width}
               className={className}
            />
         )
      }

      return (
         <div className={className} {...props}>
            {renderRadioIcon()}
         </div>
      )
   }
)
