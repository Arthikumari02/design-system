import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useRef } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import uuidV4 from 'react-uuid'

import { PERCENTAGE_SYMBOL } from '../../constants/RangeSliderConstants'
import { getPercentOfValueFromMinAndMaxValue } from '../../utils/PositionUtils'

import DefaultProgressbar from './Default/DefaultProgressbar'
import ExpectedValue from './ExpectedValue/ExpectedValue'
import RACSlider from './RACSlider/RACSlider'
import { InvertedSlider } from './Slider/InvertedSlider'
import * as Styles from './styles'
import {
   ExpectedValueOption,
   ExpectedValueProps,
   LabelPositionType,
   SliderProps
} from './types'
import RACCircularProgressbar from './Default/RACCircularProgressbar'

type FilteredTypes = Omit<SliderProps, 'renderExpectedValuePoints'>

export interface ProgressbarProps extends FilteredTypes, ExpectedValueProps {
   labelClassName?: string
   labelPosition?: LabelPositionType
   tooltipPlacement?: PlacesType
   showLabel?: boolean
   progressbarClassName?: string
   containerClassName?: string
   shouldShowTooltip?: boolean
   showLabelInTooltip?: boolean
   isTooltipClickable?: boolean
   tooltipClassName?: string
   shouldShowProgressbarFillAnimation?: boolean
   shouldIncludePercentageSign?: boolean

   renderCustomTooltipContent?: () => React.ReactElement
   renderCustomLabel?: () => React.ReactElement
}

const Progressbar = (props: ProgressbarProps): React.ReactElement => {
   const {
      progress = 0,
      colorVariant = 'PRIMARY',
      variant = 'DEFAULT',
      uiVariant = 'LINE',
      showLabel = true,
      isDisabled = false,
      containerClassName,
      progressbarClassName,
      labelClassName,
      size = 'Small',
      labelPosition = 'right',
      tooltipPlacement = 'bottom',
      onChangeProgress,

      shouldShowTooltip,
      isTooltipClickable,
      tooltipClassName = '',

      shouldShowProgressbarFillAnimation = true,
      shouldIncludePercentageSign = true,
      renderCustomTooltipContent,

      showExpectedValues,
      expectedValues,
      customExpectedIconSize,
      renderCustomLabel,

      ...other
   } = props

   const tooltipIdRef = useRef(uuidV4())
   const labelTooltipIdRef = useRef(uuidV4())
   const containerRef = useRef<HTMLDivElement>(null)
   const isVariantSlider = variant === 'SLIDER'

   const renderLabel = (): React.ReactElement =>
      renderCustomLabel ? (
         renderCustomLabel()
      ) : (
         <div
            className={cn(
               Styles.getLabelTextStyles(labelPosition),
               labelClassName
            )}
            title={String(progress)}
         >
            {progress}
            {shouldIncludePercentageSign ? PERCENTAGE_SYMBOL : null}
         </div>
      )

   const renderExpectedValuePoint = (
      expectedValue: ExpectedValueOption
   ): React.ReactElement => {
      const expectedValueInPercent = getPercentOfValueFromMinAndMaxValue(
         expectedValue.value,
         props.minValue ?? 0,
         props.maxValue ?? 100
      )

      return (
         <ExpectedValue
            expectedValue={expectedValueInPercent}
            variant={variant}
            size={size}
            customExpectedIconSize={customExpectedIconSize}
            expectedValueTitle={expectedValue.title}
         />
      )
   }

   const renderExpectedValues = (): React.ReactElement | undefined => {
      if (!showExpectedValues) return
      if (
         expectedValues === undefined ||
         expectedValues === null ||
         expectedValues.length === 0
      ) {
         return
      }

      return <>{expectedValues.map(renderExpectedValuePoint)}</>
   }

   const getLabelTooltipPlacement = (): PlacesType => {
      switch (labelPosition) {
         case 'bottom':
            return 'bottom'
         case 'right':
            return 'right'
         case 'top-float':
            return isVariantSlider ? 'top' : 'top-end'
         case 'bottom-float':
            return isVariantSlider ? 'bottom' : 'bottom-end'
      }
   }

   const renderCustomTooltip = (): React.ReactElement | null =>
      renderCustomTooltipContent ? (
         <Tooltip
            id={tooltipIdRef.current}
            className={cn(Styles.labelTextToolTipClassName, tooltipClassName)}
            isOpen={shouldShowTooltip}
            noArrow={true}
            place={tooltipPlacement}
            clickable={isTooltipClickable}
         >
            {renderCustomTooltipContent()}
         </Tooltip>
      ) : null

   const renderDefaultProgressbar = (): React.ReactElement => {
      const { minValue = 0, maxValue = 100 } = props

      const progressValue = getPercentOfValueFromMinAndMaxValue(
         progress,
         minValue > maxValue ? maxValue : minValue,
         minValue > maxValue ? minValue : maxValue
      )

      return uiVariant === 'LINE' ? (
         <DefaultProgressbar
            progress={progressValue}
            colorVariant={colorVariant}
            progressbarClassName={progressbarClassName}
            variant={variant}
            isDisabled={isDisabled}
            size={size}
            progressbarFillAnimation={shouldShowProgressbarFillAnimation}
            renderExpectedValuePoints={renderExpectedValues}
            labelTooltipId={labelTooltipIdRef.current}
         />
      ) : (
         <RACCircularProgressbar
            progress={progressValue}
            colorVariant={colorVariant}
            progressbarClassName={progressbarClassName}
            variant={variant}
            isDisabled={isDisabled}
            size={size}
            progressbarFillAnimation={shouldShowProgressbarFillAnimation}
            renderExpectedValuePoints={renderExpectedValues}
            labelTooltipId={labelTooltipIdRef.current}
         />
      )
   }

   const renderSliderProgressbar = (): React.ReactElement => {
      if (
         props.maxValue !== undefined &&
         props.minValue !== undefined &&
         props.minValue > props.maxValue
      ) {
         return (
            <InvertedSlider
               {...other}
               progress={progress}
               colorVariant={colorVariant}
               size={size}
               variant={variant}
               isDisabled={isDisabled}
               onChangeProgress={onChangeProgress}
               labelTooltipId={labelTooltipIdRef.current}
               customTooltipId={tooltipIdRef.current}
               renderExpectedValuePoints={renderExpectedValues}
               maxValue={props.maxValue}
               minValue={props.minValue}
            />
         )
      }
      return (
         <RACSlider
            progress={progress}
            colorVariant={colorVariant}
            size={size}
            variant={variant}
            isDisabled={isDisabled}
            onChangeProgress={onChangeProgress}
            labelTooltipId={labelTooltipIdRef.current}
            customTooltipId={tooltipIdRef.current}
            renderExpectedValuePoints={renderExpectedValues}
            {...other}
         />
      )
   }

   const renderLabelInTooltip = (): React.ReactElement => (
      <Tooltip
         id={labelTooltipIdRef.current}
         className={cn(Styles.labelTextToolTipClassName, tooltipClassName, {
            'translate-x-[50%]': !isVariantSlider
         })}
         isOpen={true}
         noArrow={true}
         place={getLabelTooltipPlacement()}
         clickable={isTooltipClickable}
      >
         {renderLabel()}
      </Tooltip>
   )

   const renderLabelBasedOnPosition = (): React.ReactElement => {
      switch (labelPosition) {
         case 'bottom':
         case 'right':
            return renderLabel()
         case 'bottom-float':
         case 'top-float':
            return renderLabelInTooltip()
      }
   }

   const renderSliderBasedOnVariant = () => {
      switch (variant) {
         case 'DEFAULT':
            return renderDefaultProgressbar()
         case 'SLIDER':
            return renderSliderProgressbar()
         default:
            return <>Unhandled progressbar variant</>
      }
   }

   return (
      <div
         className={cn(
            Styles.getSliderContainerStyles(labelPosition),
            containerClassName
         )}
         ref={containerRef}
      >
         {renderSliderBasedOnVariant()}

         {showLabel ? renderLabelBasedOnPosition() : null}
         {shouldShowTooltip ? renderCustomTooltip() : null}
      </div>
   )
}

export default observer(Progressbar)
