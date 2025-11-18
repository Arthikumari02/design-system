import React from 'react'
import { Slider } from 'react-aria-components'
import cn from 'classnames'

import { useRef } from 'react'
import {
   SLIDER_MAX_VALUE,
   SLIDER_MIN_VALUE
} from '../../../constants/RangeSliderConstants'

import { getProgressBarStyles } from '../styles'

import { ProgressbarProps } from './DefaultProgressbar'

const RACSlider = (props: ProgressbarProps) => {
   const sliderMinValue = SLIDER_MIN_VALUE
   const sliderMaxValue = SLIDER_MAX_VALUE
   const svgRef = useRef<SVGSVGElement>(null)

   const {
      colorVariant = 'PRIMARY',
      isDisabled = false,
      progress = 0,
      size = 'Small'
      // These props are required by the interface but not used in this component
      // renderExpectedValuePoints and labelTooltipId
   } = props

   const { leftHalfBgColor, rightHalfBgColor } =
      getProgressBarStyles(colorVariant)

   const dimensions = {
      ExtraSmall: { size: 20, strokeWidth: 3.03704 },
      Small: { size: 24, strokeWidth: 3 },
      Medium: { size: 32, strokeWidth: 4 },
      Large: { size: 48, strokeWidth: 5 }
   }[size] || { size: 24, strokeWidth: 3 } // Default to Small if size is not found

   const radius = (dimensions.size - dimensions.strokeWidth) / 2
   const circumference = 2 * Math.PI * radius
   const progressValue = Math.min(progress, sliderMaxValue)
   const strokeDashoffset =
      circumference - (progressValue / 100) * circumference

   return (
      <Slider
         value={progress}
         minValue={sliderMinValue}
         maxValue={sliderMaxValue}
         isDisabled={isDisabled}
         className={cn('relative', props.containerClassName)}
      >
         <svg
            ref={svgRef}
            width={dimensions.size}
            height={dimensions.size}
            className='transform -rotate-90'
         >
            {/* Background circle */}
            <circle
               cx={dimensions.size / 2}
               cy={dimensions.size / 2}
               r={radius}
               stroke={rightHalfBgColor}
               fill='none'
               strokeWidth={dimensions.strokeWidth}
            />
            {/* Progress circle */}
            <circle
               cx={dimensions.size / 2}
               cy={dimensions.size / 2}
               r={radius}
               className={`transition-all duration-300 ease-in-out`}
               fill='none'
               strokeWidth={dimensions.strokeWidth}
               stroke={leftHalfBgColor}
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap='round'
            />
         </svg>
      </Slider>
   )
}

export default RACSlider
