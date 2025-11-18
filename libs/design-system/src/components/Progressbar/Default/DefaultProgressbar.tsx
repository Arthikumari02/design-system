import cn from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'

import { getProgressbarSize } from '../sizes'
import { getProgressBarStyles } from '../styles'
import { CommonProgressbarProps } from '../types'

import * as Styles from './styles'
import './styles.css'

export interface ProgressbarProps extends CommonProgressbarProps {
   progressbarClassName?: string
   progressbarFillAnimation?: boolean
   labelTooltipId: string
   containerClassName?: string
}

const DefaultProgressbar = (props: ProgressbarProps): React.ReactElement => {
   const {
      progress = 0,
      colorVariant = 'PRIMARY',
      variant = 'DEFAULT',
      isDisabled = false,
      size = 'Small',

      progressbarClassName,
      progressbarFillAnimation = true,
      labelTooltipId,

      renderExpectedValuePoints = () => undefined
   } = props

   const isVariantSlider = variant === 'SLIDER'

   const { labelTextColor, trackBgColor, filledBgColor } =
      getProgressBarStyles(colorVariant)

   // Use try-catch to handle potential missing size configurations
   let height, borderRadius
   try {
      const sizeConfig = getProgressbarSize(variant, size)
      height = sizeConfig.height
      borderRadius = sizeConfig.borderRadius
   } catch (error) {
      // Fallback to Small size if the specified size is not available
      const fallbackSize = 'Small'
      const fallbackConfig = getProgressbarSize(variant, fallbackSize)
      height = fallbackConfig.height
      borderRadius = fallbackConfig.borderRadius
   }

   //TODO: Need to handle disabled case
   const defaultProgressbarStyles = cn(
      labelTextColor,
      height,
      borderRadius,
      progressbarClassName
   )

   return (
      <div
         className={cn(
            'progress-bar-track-container',
            Styles.baseTrackStyles,
            defaultProgressbarStyles,
            trackBgColor,
            progressbarClassName
         )}
      >
         <div
            className={cn('progress-bar-fill-container', Styles.baseFillStyles)}
            style={{ width: `${progress}%` }}
            data-tooltip-id={labelTooltipId}
            data-tooltip-position-strategy='fixed'
         >
            <div
               className={cn(
                  {
                     'progress-bar-fill-animation': progressbarFillAnimation
                  },
                  Styles.baseFillChildStyles,
                  filledBgColor
               )}
            />
         </div>
         {renderExpectedValuePoints()}
      </div>
   )
}

export default observer(DefaultProgressbar)
