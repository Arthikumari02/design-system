import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import uuidV4 from 'react-uuid'

import {
   SLIDER_MAX_VALUE,
   SLIDER_MIN_VALUE
} from '../../constants/RangeSliderConstants'

import useStepsSliderDraggableEvents from '../../hooks/useStepsSliderDraggableEvents'

import { StepsProgressBarSize, StepStatus } from './types'
import { getStepsProgressbarSize } from './sizes'
import {
   findStep,
   getProgressbarThumbWidthBasedOnSize
} from './StepSliderUtils'
import * as Styles from './styles'

export interface ProgressbarProps {
   sliderValue: number
   steps: number[]

   id?: string
   isDisabled?: boolean
   minValue?: number
   maxValue?: number
   tooltipClassName?: string
   tooltipPosition?: PlacesType
   tooltipContent?: string
   size?: StepsProgressBarSize
   sliderClassName?: string
   sliderContainerClassName?: string
   onChangeSliderValue?: (value: string) => void
}

const StepsProgressBar = (props: ProgressbarProps): React.ReactElement => {
   const {
      id,
      steps,
      minValue,
      maxValue,
      sliderValue,
      size = 'Large',
      tooltipContent,
      sliderClassName,
      tooltipClassName,
      isDisabled = false,
      sliderContainerClassName,
      onChangeSliderValue
   } = props

   const [showTooltip, setShowTooltip] = useState<boolean>(false)

   const thumbRefs = useRef<HTMLDivElement[]>([])
   const stepValueRefs = useRef<HTMLDivElement[]>([])
   const lastStepThumbRef = useRef(uuidV4())
   const isSliderActionActive = useRef(false)

   const progressbarState = isDisabled ? 'DISABLE' : 'ACTIVE'
   const sliderMinValue = minValue ?? SLIDER_MIN_VALUE
   const sliderMaxValue = maxValue ?? SLIDER_MAX_VALUE

   const { leftHalfBgColor, rightHalfBgColor } =
      Styles.getStepsProgressBarTrackStyles(progressbarState)
   const thumbSize = getProgressbarThumbWidthBasedOnSize(size)

   const updateSliderColor = (
      element: HTMLInputElement,
      gradientStartValue: number
   ): void => {
      element.style.background = `linear-gradient(to right, ${leftHalfBgColor} ${gradientStartValue + 2}px, ${rightHalfBgColor} ${gradientStartValue + 2}px)`
   }

   const { handleContainerClick, containerRef, sliderThumbRef } =
      useStepsSliderDraggableEvents({
         thumbSize,
         steps,
         sliderMinValue,
         sliderMaxValue,
         updateSliderColor,
         onChangeSliderValue
      })

   const updateSliderAction = (active: boolean): void => {
      isSliderActionActive.current = active
   }

   const onHandlerContainerClick = (event: React.MouseEvent): void => {
      handleContainerClick(event)
      updateSliderAction(true)
   }

   const updateShowLastActionTooltip = (active: boolean): void => {
      if (isSliderActionActive.current) setShowTooltip(false)
      else setShowTooltip(active)
   }

   const { height, borderRadius, thumbWidth, thumbHeight } =
      getStepsProgressbarSize(size)

   const updateSliderInitialColor = (): void => {
      const container = containerRef.current
      if (container) {
         const containerWidth = container.clientWidth
         const maxLeft = containerWidth - thumbSize

         const currentActiveStep = findStep(sliderValue, steps)

         if (currentActiveStep || currentActiveStep === 0) {
            const sliderFilledValue =
               (currentActiveStep - sliderMinValue) /
               (sliderMaxValue - sliderMinValue)
            onChangeSliderValue?.(currentActiveStep.toString())
            const newLeft = sliderFilledValue * maxLeft
            sliderThumbRef.current = newLeft
            updateSliderColor(container, newLeft)
         }
      }
   }

   const getPositionForThumb = (currentStep: number): number | undefined => {
      const container = containerRef.current
      if (container) {
         const containerWidth = container.clientWidth
         const maxLeft = containerWidth - thumbSize

         const sliderFilledValue =
            (currentStep - sliderMinValue) / (sliderMaxValue - sliderMinValue)

         const newLeft = sliderFilledValue * maxLeft
         return newLeft
      }
   }

   const updateSliderStyles = (): void => {
      updateSliderInitialColor()

      steps.forEach((step, index) => {
         if (thumbRefs.current[index]) {
            thumbRefs.current[index].style.left =
               `${getPositionForThumb(step)}px`
         }
         if (stepValueRefs.current[index]) {
            stepValueRefs.current[index].style.left =
               `${getPositionForThumb(step)}px`
         }
      })
   }

   useEffect(() => {
      updateSliderStyles()

      window.addEventListener('resize', updateSliderStyles)
      return () => {
         window.removeEventListener('resize', updateSliderStyles)
      }
   }, [sliderValue, containerRef])

   const renderLastStepThumbActionDetailsInTooltip = (): React.ReactElement => (
      <Tooltip
         id={lastStepThumbRef.current}
         className={cn(
            Styles.lastThumbToolTipContainerClassName,
            tooltipClassName
         )}
         isOpen={showTooltip}
         place={'top'}
      >
         <p className={Styles.lastThumbToolTipContentClassName}>
            {tooltipContent
               ? tooltipContent
               : 'Drag/Clicks Slidebar to select weight'}
         </p>
      </Tooltip>
   )

   const renderStepValue = (
      step: number,
      index: number
   ): React.ReactElement => (
      <div
         key={step}
         className={Styles.stepValueContainerStyles}
         ref={el => {
            if (el) stepValueRefs.current[index] = el
            return stepValueRefs.current[index]
         }}
      >
         <p>{step}</p>
      </div>
   )

   const getStepThumbStatus = (step: number): StepStatus => {
      if (step <= sliderValue) {
         return 'FILLED'
      }
      return 'UNOCCUPIED'
   }

   const renderSliderThumb = (
      step: number,
      index: number
   ): React.ReactElement => {
      const { bgColor, lastStepBgColor, lastStepBorderColor } =
         Styles.getStepsProgressBarThumbStyles(
            progressbarState,
            getStepThumbStatus(step)
         )
      const isLastStep = step === sliderValue && !isDisabled
      const thumbStyles = cn(
         Styles.sliderThumbStyles,
         bgColor,
         isLastStep ? `border ${lastStepBgColor} ${lastStepBorderColor}` : '',
         thumbWidth,
         thumbHeight
      )

      return (
         <div
            key={step}
            className={cn(Styles.thumbContainerStyles)} //TODO: Need to handle disabled case
            onMouseDown={onHandlerContainerClick}
            onMouseUp={() => updateSliderAction(false)}
            data-tooltip-id={isLastStep ? lastStepThumbRef.current : ''}
            data-tooltip-position-strategy='fixed'
            ref={el => {
               if (el) thumbRefs.current[index] = el
               return thumbRefs.current[index]
            }}
            onMouseEnter={
               isLastStep ? () => updateShowLastActionTooltip(true) : undefined
            }
            onMouseLeave={
               isLastStep ? () => updateShowLastActionTooltip(false) : undefined
            }
         >
            <div className={thumbStyles} />
         </div>
      )
   }

   //TODO: Need to handle disabled case
   const sliderStyles = cn(
      'slider',
      height,
      borderRadius,
      Styles.sliderInputStyles,
      sliderClassName
   )

   const renderSliderProgressbar = (): React.ReactElement => (
      <div className={Styles.sliderProgressBarContainerStyles}>
         <input
            id={id}
            ref={containerRef}
            type='range'
            className={sliderStyles}
            value={sliderValue}
            min={minValue}
            max={maxValue}
            onPointerDown={onHandlerContainerClick}
            onMouseUp={() => updateSliderAction(false)}
         />
      </div>
   )

   return (
      <div
         className={cn(Styles.sliderContainerStyles, sliderContainerClassName)}
         onMouseLeave={() => updateShowLastActionTooltip(false)}
      >
         {renderSliderProgressbar()}
         {steps.map((step, index) => renderSliderThumb(step, index))}
         {steps.map((step, index) => renderStepValue(step, index))}
         {renderLastStepThumbActionDetailsInTooltip()}
      </div>
   )
}
export default StepsProgressBar
