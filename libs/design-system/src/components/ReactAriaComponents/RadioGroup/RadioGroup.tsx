import React from 'react'
import {
   Radio,
   RadioGroup,
   RadioGroupProps,
   ValidationResult
} from 'react-aria-components'
import cn from 'classnames'

import HelpTextAndFieldError from '../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../Label/Label'
import { SmallAndMedium } from '../../../types'
import { Hierarchy, SubVariant, Button } from '../Button'
import { RadioIcon } from './RadioIcon'
import './index.css'
import { radioLabelContainerClassName, clearButtonClassName } from './styles'

export interface RACRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
   children: React.ReactNode
   label?: string | null
   hint?: React.ReactNode
   error?: ValidationResult | string | null
   size?: SmallAndMedium
   isRequired?: boolean
   isDisabled?: boolean
   shouldShowClear?: boolean
   containerClassName?: string
   isFilledVariant?: boolean
   className?: string
   labelClassName?: string
   hintClassName?: string
   axis?: 'horizontal' | 'vertical'
}

interface RACRadioProps {
   value: string
   children: React.ReactNode
   className?: string
   isDisabled?: boolean
}

const RadioContext = React.createContext<{
   error?: ValidationResult | string
   isDisabled?: boolean
   isFilledVariant?: boolean
   size?: SmallAndMedium
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

export const RACRadioGroup = (props: RACRadioGroupProps) => {
   const {
      children,
      label,
      hint,
      error,
      size = 'Medium',
      isRequired,
      isDisabled,
      shouldShowClear,
      isFilledVariant = false,
      className,
      labelClassName,
      hintClassName,
      axis = 'vertical',
      ...otherProps
   } = props

   const displayClear = shouldShowClear && props.value

   const onClear = (): void => {
      props.onChange?.('')
   }

   return (
      <div className={cn(className, props.containerClassName)}>
         <RadioContext.Provider
            value={{
               error: error || undefined,
               isDisabled,
               isFilledVariant,
               size
            }}
         >
            <RadioGroup
               {...otherProps}
               isDisabled={isDisabled}
               isInvalid={Boolean(error)}
            >
               <div className={radioLabelContainerClassName}>
                  {label ? (
                     <Label
                        isRequired={isRequired}
                        className={cn('font-medium mb-[6px]', labelClassName)}
                        size={props.size ?? 'Medium'}
                     >
                        {label}
                     </Label>
                  ) : null}
                  {displayClear ? (
                     <Button
                        childrenContainerClassName={clearButtonClassName}
                        onClick={onClear}
                        size={'Small'}
                        hierarchy={Hierarchy.Tertiary}
                        subVariant={SubVariant.Gray}
                     >
                        Clear
                     </Button>
                  ) : null}
               </div>
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
            </RadioGroup>
         </RadioContext.Provider>
      </div>
   )
}

export const RACRadio = (props: RACRadioProps) => {
   const { value, children, className, isDisabled: radioDisabled } = props

   const context = React.useContext(RadioContext)
   const isDisabled = radioDisabled || context?.isDisabled
   const error = context?.error
   const isFilledVariant = context?.isFilledVariant
   const size = context?.size || 'Medium'

   return (
      <Radio
         value={value}
         className={({ isDisabled: isRadioDisabled }) =>
            cn(
               'group flex items-center cursor-pointer',
               {
                  'cursor-not-allowed': isRadioDisabled
               },
               className,
               'design-system-radio'
            )
         }
         isDisabled={isDisabled}
      >
         {({
            isSelected,
            isDisabled: isRadioDisabled,
            isFocused,
            isHovered
         }) => (
            <div className='gap-md flex items-center'>
               <RadioIcon
                  isSelected={isSelected}
                  isDisabled={isDisabled || isRadioDisabled}
                  isHovered={isHovered}
                  error={error}
                  isError={!!error}
                  isFilledVariant={isFilledVariant}
                  size={size}
                  autoFocus={false}
                  isFocused={isFocused}
                  within={true}
                  className={isDisabled ? '!cursor-not-allowed' : ''}
               />
               <span
                  className={cn(
                     getTextStyles(size),
                     { '!cursor-not-allowed': isDisabled },
                     'text-secondary-700' // Using the color from reference component
                  )}
               >
                  {children}
               </span>
            </div>
         )}
      </Radio>
   )
}
