import { Slider, SliderThumb, SliderTrack } from 'react-aria-components'

import {
   SLIDER_MAX_VALUE,
   SLIDER_MIN_VALUE
} from '../../../constants/RangeSliderConstants'

import { getProgressbarSize } from '../sizes'
import { getProgressBarStyles } from '../styles'

import { SliderProps } from '../types'

import * as styles from './styles'

const RACSlider = (props: SliderProps) => {
   const sliderMinValue = props.minValue ?? SLIDER_MIN_VALUE
   const sliderMaxValue = props.maxValue ?? SLIDER_MAX_VALUE

   const {
      onChangeProgress,
      colorVariant,
      isDisabled = false,
      variant = 'DEFAULT',
      size = 'Small',
      step,
      labelTooltipId,
      customTooltipId,
      renderExpectedValuePoints
   } = props

   const { thumbBorderColor, trackBgColor, filledBgColor, thumbBgColor } =
      getProgressBarStyles(colorVariant)
   const {
      height,
      thumbWidth = 'h-2',
      thumbHeight = 'h-2'
   } = getProgressbarSize(variant, size)

   const progress =
      props.progress > sliderMaxValue ? sliderMaxValue : props.progress

   return (
      <Slider
         defaultValue={30}
         value={progress}
         onChange={value => {
            onChangeProgress?.(value.toString())
         }}
         onChangeEnd={value => {
            onChangeProgress?.(value.toString())
         }}
         minValue={sliderMinValue}
         maxValue={sliderMaxValue}
         step={step}
         data-tooltip-id={customTooltipId}
         data-tooltip-position-strategy='fixed'
         className={styles.sliderStyles}
         isDisabled={isDisabled}
      >
         <SliderTrack className={`${styles.sliderTrackStyles}`}>
            {({ state }) => (
               <>
                  <div
                     className={`${styles.sliderTrackBgStyles} ${height} ${trackBgColor}`}
                  />
                  <div
                     className={`${styles.sliderFilledBgStyles} ${height} ${filledBgColor}`}
                     style={{ width: `${state.getThumbPercent(0) * 100}%` }}
                  />
                  <SliderThumb
                     className={`${thumbBgColor} ${thumbWidth} ${thumbHeight} ${styles.sliderThumbStyles} ${thumbBorderColor} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                     data-tooltip-id={labelTooltipId}
                     data-tooltip-position-strategy='fixed'
                  />
                  {renderExpectedValuePoints()}
               </>
            )}
         </SliderTrack>
      </Slider>
   )
}

export default RACSlider
