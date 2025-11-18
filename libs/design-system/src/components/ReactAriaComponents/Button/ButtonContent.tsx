import cn from 'classnames'
import React from 'react'

import { Loader } from '../../Loader/Loader'
import { withFocusRing, FocusRingProps } from '../WithFocusRing/WithFocusRing'
import { ButtonIconColors } from './types'

interface ButtonContentProps extends FocusRingProps {
   isLoading: boolean
   shouldShrinkButtonWhileLoading: boolean
   leftIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   rightIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   children: React.ReactNode
   iconColors: ButtonIconColors
   loaderColor: string
   sizedTheme: any
   buttonContentClassName?: string
   childrenContainerClassName?: string
   className?: string
   bgColor: string
   textColor: string
   border: string
   isButtonDisabled: boolean
   isLinkButton: boolean
}

const ButtonContentBase = ({
   isLoading,
   shouldShrinkButtonWhileLoading,
   leftIcon,
   rightIcon,
   children,
   iconColors,
   loaderColor,
   sizedTheme,
   buttonContentClassName,
   childrenContainerClassName,
   className,
   bgColor,
   textColor,
   border,
   isButtonDisabled,
   isLinkButton
}: ButtonContentProps): React.ReactElement => {
   const renderContent = () => {
      const content = (
         <div
            className={cn('flex items-center', childrenContainerClassName, {
               'text-transparent !invisible':
                  isLoading && !shouldShrinkButtonWhileLoading
            })}
         >
            {leftIcon && (
               <div className={cn(sizedTheme.leftIconMargin)}>
                  {leftIcon(iconColors)}
               </div>
            )}
            {children}
            {rightIcon && (
               <div className={cn(sizedTheme.rightIconMargin)}>
                  {rightIcon(iconColors)}
               </div>
            )}
         </div>
      )

      if (isLoading) {
         if (shouldShrinkButtonWhileLoading) {
            return <Loader className={loaderColor} />
         }
         return (
            <>
               <Loader className={cn(loaderColor, 'absolute')} />
               {content}
            </>
         )
      }

      return content
   }

   return (
      <div
         className={cn(
            {
               'cursor-not-allowed': isButtonDisabled,
               relative: !shouldShrinkButtonWhileLoading
            },
            'flex justify-center items-center outline-none',
            bgColor,
            textColor,
            border,
            sizedTheme.typography,
            sizedTheme.borderRadius,
            { 'px-0 py-0': isLinkButton },
            { [sizedTheme.padding]: !isLinkButton },
            className,
            buttonContentClassName
         )}
      >
         {renderContent()}
      </div>
   )
}

export const ButtonContent = withFocusRing(ButtonContentBase)
