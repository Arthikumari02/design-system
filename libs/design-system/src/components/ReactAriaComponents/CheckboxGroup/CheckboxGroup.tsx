import cn from 'classnames'
import React from 'react'
import {
   Checkbox,
   CheckboxGroup,
   CheckboxGroupProps,
   ValidationResult
} from 'react-aria-components'
import {
   getSelectedCheckboxButtonColors,
   getUnSelectedCheckboxButtonColors
} from '../Checkbox/styles'

import { CheckboxUnSelectedIcon } from '../../../icons/CheckboxUnselectedIcon'
import IntermediateCheckBox from '../../../icons/IntermediateCheckBox'
import IntermediateDisabledCheckBoxIcon from '../../../icons/IntermediateDisabledCheckBox'
import SolidCheckboxDisabledSelectedIcon from '../../../icons/SolidCheckboxDisabledSelectedIcon'
import SolidCheckboxSelectedIcon from '../../../icons/SolidCheckboxSelectedIcon'
import { SmallAndMedium } from '../../../types'
import HelpTextAndFieldError from '../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../Label/Label'
import { withFocusRing } from '../WithFocusRing/WithFocusRing'
import './index.css'
import { sizes } from './sizes'

export interface RACCheckboxGroupProps
   extends Omit<CheckboxGroupProps, 'children'> {
   children: React.ReactNode
   label?: string | null
   hint?: React.ReactNode
   error?: ValidationResult | string | null
   size?: SmallAndMedium
   isRequired?: boolean
   isDisabled?: boolean
   containerClassName?: string
   className?: string
   labelClassName?: string
   hintClassName?: string
   axis?: 'horizontal' | 'vertical'
   isIntermediate?: boolean
}

interface RACCheckboxProps {
   value: string
   children: React.ReactNode
   className?: string
   isDisabled?: boolean
   isIntermediate?: boolean
}

const CheckboxContext = React.createContext<{
   error?: ValidationResult | string
   isDisabled?: boolean
   size?: SmallAndMedium
   isIntermediate?: boolean
} | null>(null)

const getTextStyles = (size: SmallAndMedium) => {
   switch (size) {
      case 'Small':
         return 'text-xs font-medium'
      case 'Medium':
      default:
         return 'text-sm font-medium'
   }
}

export const RACCheckboxGroup = (props: RACCheckboxGroupProps) => {
   const {
      children,
      label,
      hint,
      error,
      size = 'Medium',
      isRequired,
      isDisabled,
      className,
      labelClassName,
      hintClassName,
      axis = 'vertical',
      isIntermediate,
      ...otherProps
   } = props

   return (
      <div className={className}>
         <CheckboxContext.Provider
            value={{
               error: error || undefined,
               isDisabled,
               size,
               isIntermediate
            }}
         >
            <CheckboxGroup
               {...otherProps}
               isDisabled={isDisabled}
               isInvalid={Boolean(error)}
            >
               {label && (
                  <Label
                     isRequired={isRequired}
                     className={cn('font-medium mb-[6px]', labelClassName)}
                     size={size}
                  >
                     {label}
                  </Label>
               )}
               <div
                  className={cn('flex', {
                     'flex-col gap-md': axis === 'vertical',
                     'flex-row gap-4xl': axis === 'horizontal',
                     '!cursor-not-allowed': isDisabled
                  })}
               >
                  {children}
               </div>
               {(hint || error) && (
                  <HelpTextAndFieldError
                     hint={hint}
                     error={error ? error.toString() : ''}
                     size={size}
                     containerClassName={cn(hintClassName, 'mt-xs')}
                  />
               )}
            </CheckboxGroup>
         </CheckboxContext.Provider>
      </div>
   )
}

// ... previous imports remain the same ...

const CheckboxIcon = withFocusRing(
   ({
      isSelected,
      isDisabled,
      isHovered,
      error,
      size,
      isIntermediate,
      isFocused,
      className,
      ...props
   }: {
      isSelected: boolean
      isDisabled: boolean
      isHovered: boolean
      error?: string
      size: keyof typeof sizes
      isIntermediate: boolean
      isFocused: boolean
      className?: string
   }) => {
      const iconSize = sizes[size].icon

      const iconClassName = isSelected
         ? getSelectedCheckboxButtonColors({
              isHovered,
              isDisabled,
              isFocused,
              error: Boolean(error)
           })
         : getUnSelectedCheckboxButtonColors({
              isHovered,
              isDisabled,
              isFocused,
              error: Boolean(error)
           })

      const renderCheckboxIcon = () => {
         if (isSelected) {
            if (isDisabled) {
               if (isIntermediate) {
                  return (
                     <IntermediateDisabledCheckBoxIcon
                        height={iconSize.height}
                        width={iconSize.width}
                        className={iconClassName}
                     />
                  )
               }
               return (
                  <SolidCheckboxDisabledSelectedIcon
                     height={iconSize.height}
                     width={iconSize.width}
                     className={iconClassName}
                  />
               )
            }

            if (isIntermediate) {
               return (
                  <IntermediateCheckBox
                     height={iconSize.height}
                     width={iconSize.width}
                     className={iconClassName}
                  />
               )
            }

            return (
               <SolidCheckboxSelectedIcon
                  height={iconSize.height}
                  width={iconSize.width}
                  className={iconClassName}
               />
            )
         }

         return (
            <CheckboxUnSelectedIcon
               className={iconClassName}
               height={iconSize.height}
               width={iconSize.width}
            />
         )
      }

      return (
         <div
            className={cn(className, { '!cursor-not-allowed': isDisabled })}
            {...props}
         >
            {renderCheckboxIcon()}
         </div>
      )
   }
)

export const RACCheckbox = (props: RACCheckboxProps) => {
   const { value, children, className, isDisabled: checkboxDisabled } = props

   const context = React.useContext(CheckboxContext)
   const isDisabled = checkboxDisabled || context?.isDisabled
   const error = context?.error
   const size = context?.size || 'Medium'
   const isIntermediate = props.isIntermediate || context?.isIntermediate

   return (
      <Checkbox
         value={value}
         className={({ isDisabled: isCheckboxDisabled }) =>
            cn(
               'group flex items-center gap-md cursor-pointer',
               {
                  'cursor-not-allowed': isCheckboxDisabled
               },
               className,
               'design-system-checkbox'
            )
         }
         isDisabled={isDisabled}
      >
         {({
            isSelected,
            isDisabled: isCheckboxDisabled,
            isFocused,
            isHovered
         }) => (
            <>
               <CheckboxIcon
                  isSelected={isSelected}
                  isDisabled={isDisabled || isCheckboxDisabled}
                  isHovered={isHovered}
                  error={error ? error.toString() : undefined}
                  isError={!!error}
                  size={size}
                  isIntermediate={!!isIntermediate}
                  autoFocus={false}
                  isFocused={isFocused}
                  focusClass='rounded-[4px]'
                  within={true}
               />
               <span
                  className={cn(getTextStyles(size), 'text-secondary-700', {
                     'cursor-not-allowed': isCheckboxDisabled || isDisabled
                  })}
               >
                  {children}
               </span>
            </>
         )}
      </Checkbox>
   )
}
