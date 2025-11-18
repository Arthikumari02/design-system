import cn from 'classnames'
import React, { createContext, useContext, useState } from 'react'
import { ToggleGroupState, useToggleGroupState } from 'react-stately'
import { useToggleButtonGroup, useToggleButtonGroupItem } from 'react-aria'

import { ExtraSmallAndSmall } from '../../../types'

import {
   ToggleButtonGroupProps,
   ToggleButtonProps,
   ToggleButtonGroupVariant,
   ToggleButtonStyleProps,
   ToggleButtonStyles
} from './types'

import { getToggleButtonGroupStyles } from './styles'

import * as StylesModule from './styles'

const getToggleButtonStyles = (StylesModule as any).getToggleButtonStyles as (
   props: ToggleButtonStyleProps
) => ToggleButtonStyles

interface ToggleButtonGroupContextValue extends ToggleGroupState {
   variant: ToggleButtonGroupVariant
   isDisabled: boolean
   selectionMode: 'single' | 'multiple'
   size: ExtraSmallAndSmall
}

interface DesignSystemToggleButtonGroupProps extends ToggleButtonGroupProps {
   size?: ExtraSmallAndSmall
}

const ToggleButtonGroupContext =
   createContext<ToggleButtonGroupContextValue | null>(null)

export const useToggleButtonGroupContext = () => {
   const context = useContext(ToggleButtonGroupContext)
   if (!context) {
      throw new Error('ToggleButton must be used within a ToggleButtonGroup')
   }
   return context
}

export const ToggleButtonGroup: React.FC<DesignSystemToggleButtonGroupProps> = (
   props: DesignSystemToggleButtonGroupProps
) => {
   const { variant = 'Primary', children, className, size = 'Small' } = props

   const groupStyles = getToggleButtonGroupStyles({ variant })
   const state = useToggleGroupState({
      ...props,
      disallowEmptySelection:
         props.disallowEmptySelection ?? props.selectionMode === 'single'
   })
   const ref = React.useRef<HTMLDivElement | null>(null)
   const { groupProps } = useToggleButtonGroup(props, state, ref)

   const childrenArray = React.Children.toArray(children)
   const enhancedChildren = childrenArray.map((child, index) => {
      if (React.isValidElement(child)) {
         const childProps = {
            isLastButton: index === childrenArray.length - 1,
            isFirstButton: index === 0
         }
         return React.cloneElement(child, childProps)
      }
      return child
   })

   return (
      <ToggleButtonGroupContext.Provider
         value={{
            ...state,
            variant,
            isDisabled: props.isDisabled || false,
            selectionMode: props.selectionMode || 'single',
            size
         }}
      >
         <div
            {...groupProps}
            className={cn(groupStyles.containerClassName, className)}
            ref={ref}
         >
            {enhancedChildren}
         </div>
      </ToggleButtonGroupContext.Provider>
   )
}

export const ToggleButtonGroupButton: React.FC<ToggleButtonProps> = (
   props: ToggleButtonProps
) => {
   const {
      id,
      isDisabled,
      children,
      leftIcon,
      rightIcon,
      isLastButton = false,
      isFirstButton = false,
      title,

      className
   } = props

   const [isHovered, setIsHovered] = useState(false)
   const {
      variant,
      isDisabled: groupDisabled,
      size
   } = useToggleButtonGroupContext()

   const buttonDisabled = isDisabled || groupDisabled

   const ref = React.useRef<HTMLButtonElement | null>(null)
   const state = React.useContext(ToggleButtonGroupContext)!
   const { buttonProps, isPressed, isSelected } = useToggleButtonGroupItem(
      props,
      state,
      ref
   )

   const buttonStyles = getToggleButtonStyles({
      isHovered,
      isPressed,
      isSelected,
      isDisabled: buttonDisabled,
      variant
   })

   const groupStyles = getToggleButtonGroupStyles({ variant })

   // Combine classes
   const buttonClasses = cn(
      `px-xl ${size === 'ExtraSmall' ? 'py-xs' : 'py-md'} flex items-center
       justify-center gap-2 transition-colors duration-150 ease-in-out flex-1 focus:outline-none`,
      buttonStyles.bgColor,
      buttonStyles.textColor,
      {
         'cursor-not-allowed': buttonDisabled,
         'rounded-l-lg': isFirstButton,
         'rounded-r-lg': isLastButton
      },
      className
   )

   // Divider should always be visible between buttons (except for the last one)
   const dividerClasses = cn({
      [`absolute top-0 right-0 h-full w-[1px] ${groupStyles.dividerColor}`]:
         !isLastButton
   })

   return (
      <button
         id={id}
         disabled={buttonDisabled}
         style={{ border: 'none', position: 'relative' }}
         {...buttonProps}
         onMouseEnter={() => !buttonDisabled && setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         className='!focus:outline-none !outline-none'
         ref={ref}
         title={title}
      >
         <div className={buttonClasses}>
            {leftIcon && (
               <span className={buttonStyles.iconColors}>{leftIcon}</span>
            )}
            <span className='text-sm-semibold whitespace-nowrap'>
               {children}
            </span>
            {rightIcon && (
               <span className={buttonStyles.iconColors}>{rightIcon}</span>
            )}
         </div>
         {!isLastButton && <div className={dividerClasses} />}
      </button>
   )
}

// Alias for backward compatibility
