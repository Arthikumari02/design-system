import { default as classNames, default as cn } from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { Checkbox as AriaCheckbox, CheckboxProps } from 'react-aria-components'

import { SmallAndMedium } from '../../../types'
import CheckboxIcon from './CheckboxIcon'

import './index.css'
import { getCheckboxButtonContainerStyles } from './styles'

interface Props extends CheckboxProps {
   size?: SmallAndMedium
   error?: React.ReactNode
   isIndeterminate?: boolean
   contentClassName?: string
   isSelected?: boolean
   autoFocus?: boolean
   children?: React.ReactNode
   itemContainerClassName?: string
}

export function Checkbox(props: Props) {
   const { size = 'Medium', error } = props

   return (
      <AriaCheckbox
         {...props}
         className={({ isDisabled }) =>
            classNames(
               getCheckboxButtonContainerStyles(isDisabled),
               props.className,
               'design-system-checkbox'
            )
         }
      >
         {({
            isSelected,
            isHovered,
            isDisabled,
            isFocused,
            isInvalid,
            isIndeterminate
         }) => (
            <div
               className={cn(
                  'flex items-center gap-md',
                  props.itemContainerClassName
               )}
            >
               <CheckboxIcon
                  isHovered={isHovered}
                  isFocused={isFocused}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  isIndeterminate={isIndeterminate}
                  error={error}
                  size={size}
                  isError={isInvalid}
                  within={true}
                  focusClass='rounded-[4px]'
               />
               {props.children}
            </div>
         )}
      </AriaCheckbox>
   )
}

export default observer(Checkbox)
