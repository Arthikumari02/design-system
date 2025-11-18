import cn from 'classnames'
import React from 'react'

import { Icon } from '@shared/icons'

import { FocusRingProps, withFocusRing } from '../WithFocusRing/WithFocusRing'

interface CloseButtonContentProps extends FocusRingProps {
   children?: React.ReactNode
   iconColor: string
   sizedTheme: any
   buttonContentClassName?: string
   className?: string
   bgColor: string
   border: string
   isDisabled: boolean
}

const CloseButtonContentBase = ({
   children,
   iconColor,
   sizedTheme,
   className,
   bgColor,
   border,
   isDisabled,
   buttonContentClassName
}: CloseButtonContentProps): React.ReactElement => {
   const renderContent = () => {
      if (children) {
         return <div className={cn('flex items-center')}>{children}</div>
      }

      return (
         <div className={cn('flex items-center')}>
            <Icon
               type='OUTLINE'
               id='x'
               height={sizedTheme.iconSize.height}
               width={sizedTheme.iconSize.width}
               className={iconColor}
            />
         </div>
      )
   }

   return (
      <div
         className={cn(
            {
               'cursor-not-allowed': isDisabled,
               relative: true
            },
            'flex justify-center items-center outline-none',
            bgColor,
            border,
            sizedTheme.borderRadius,
            sizedTheme.padding,
            className,
            buttonContentClassName
         )}
      >
         {renderContent()}
      </div>
   )
}

export const CloseButtonContent = withFocusRing(CloseButtonContentBase)
