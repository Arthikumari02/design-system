import cn from 'classnames'
import React from 'react'

import { Loader } from '../../Loader/Loader'
import { FocusRingProps, withFocusRing } from '../WithFocusRing/WithFocusRing'
import { IconStyles } from './types'

interface IconButtonContentProps extends FocusRingProps {
   isLoading: boolean
   icon: (iconProps: IconStyles) => React.ReactNode
   iconColors: IconStyles
   loaderColor: string
   sizedTheme: any
   buttonContentClassName?: string
   className?: string
   bgColor: string
   border: string
   isButtonDisabled: boolean
   title?: string
}

const IconButtonContentBase = ({
   isLoading,
   icon,
   iconColors,
   loaderColor,
   sizedTheme,
   buttonContentClassName,
   className,
   bgColor,
   border,
   isButtonDisabled,
   title
}: IconButtonContentProps): React.ReactElement => {
   const renderIcon = () => (
      <div>{icon({ ...iconColors, ...sizedTheme.iconSize })}</div>
   )

   const renderLoader = () => <Loader className={loaderColor} />

   return (
      <div
         className={cn(
            'flex justify-center items-center outline-none',
            bgColor,
            border,
            sizedTheme.borderRadius,
            sizedTheme.padding,
            className,
            buttonContentClassName
         )}
         title={title}
      >
         {isLoading ? renderLoader() : renderIcon()}
      </div>
   )
}

export const IconButtonContent = withFocusRing(IconButtonContentBase)
