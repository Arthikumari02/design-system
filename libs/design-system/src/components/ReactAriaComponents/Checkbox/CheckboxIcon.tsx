import { observer } from 'mobx-react'
import React from 'react'

import { CheckboxUnSelectedIcon } from '../../../icons/CheckboxUnselectedIcon'
import IntermediateCheckBox from '../../../icons/IntermediateCheckBox'
import IntermediateDisabledCheckBoxIcon from '../../../icons/IntermediateDisabledCheckBox'
import SolidCheckboxDisabledSelectedIcon from '../../../icons/SolidCheckboxDisabledSelectedIcon'
import SolidCheckboxSelectedIcon from '../../../icons/SolidCheckboxSelectedIcon'
import { SmallAndMedium } from '../../../types'

import { withFocusRing } from '../WithFocusRing/WithFocusRing'

import './index.css'
import { sizes } from './sizes'
import {
   getSelectedCheckboxButtonColors,
   getUnSelectedCheckboxButtonColors
} from './styles'

interface CheckboxIconProps {
   isHovered: boolean
   isFocused: boolean
   isSelected: boolean
   isDisabled: boolean
   isIndeterminate: boolean
   error: React.ReactNode
   size: SmallAndMedium
   className?: string
}

const getCheckboxClassName = (
   isHovered: boolean,
   isSelected: boolean,
   isDisabled: boolean,
   isFocusWithin: boolean,
   error: React.ReactNode
) =>
   isSelected
      ? getSelectedCheckboxButtonColors({
           isHovered,
           isDisabled,
           isFocused: isFocusWithin,
           error: Boolean(error)
        })
      : getUnSelectedCheckboxButtonColors({
           isHovered,
           isDisabled,
           isFocused: isFocusWithin,
           error: Boolean(error)
        })

const CheckboxIcon = withFocusRing((props: CheckboxIconProps) => {
   const {
      isHovered,
      isFocused,
      isSelected,
      isDisabled,
      isIndeterminate,
      size,
      error,
      className
   } = props

   const iconClassName = getCheckboxClassName(
      isHovered,
      isSelected,
      isDisabled,
      isFocused,
      error
   )

   const isIndeterminateDisabled = isSelected && isDisabled && isIndeterminate
   const isSelectedDisabled = isSelected && isDisabled
   const isSelectedIndeterminate = isSelected && isIndeterminate

   const renderIcon = () => {
      if (isIndeterminateDisabled) {
         return (
            <IntermediateDisabledCheckBoxIcon
               height={sizes[size].icon.height}
               width={sizes[size].icon.width}
               className={iconClassName}
            />
         )
      }

      if (isSelectedDisabled) {
         return (
            <SolidCheckboxDisabledSelectedIcon
               height={sizes[size].icon.height}
               width={sizes[size].icon.width}
               className={iconClassName}
            />
         )
      }

      if (isSelectedIndeterminate) {
         return (
            <IntermediateCheckBox
               height={sizes[size].icon.height}
               width={sizes[size].icon.width}
               className={iconClassName}
            />
         )
      }

      if (isSelected) {
         return (
            <SolidCheckboxSelectedIcon
               height={sizes[size].icon.height}
               width={sizes[size].icon.width}
               className={iconClassName}
            />
         )
      }

      return (
         <CheckboxUnSelectedIcon
            className={iconClassName}
            height={sizes[size].icon.height}
            width={sizes[size].icon.width}
         />
      )
   }

   return <div className={className}>{renderIcon()}</div>
})

export default observer(CheckboxIcon)
