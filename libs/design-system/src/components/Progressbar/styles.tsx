import { PROGRESS_BAR_THEME } from '../../Theme/components/ProgressBarTheme'
import {
   STEPS_PROGRESS_BAR_THUMB_THEME,
   STEPS_PROGRESS_BAR_TRACK_THEME
} from './StepsProgressbarConstants'

import {
   ColorVariantType,
   LabelPositionType,
   ProgressbarThemeType,
   StepsProgressbarState,
   SliderTrackThemeType,
   SliderThumbThemeType,
   StepStatus
} from './types'

export const getProgressBarStyles = (
   colorVariant: ColorVariantType
): ProgressbarThemeType => {
   try {
      return {
         leftHalfBgColor: PROGRESS_BAR_THEME[colorVariant].leftHalfBgColor,
         rightHalfBgColor: PROGRESS_BAR_THEME[colorVariant].rightHalfBgColor,
         labelTextColor: PROGRESS_BAR_THEME[colorVariant].labelTextColor,
         thumbBorderColor: PROGRESS_BAR_THEME[colorVariant].thumbBorderColor,
         trackBgColor: PROGRESS_BAR_THEME[colorVariant].trackBgColor,
         filledBgColor: PROGRESS_BAR_THEME[colorVariant].filledBgColor,
         thumbBgColor: PROGRESS_BAR_THEME[colorVariant].thumbBgColor
      }
   } catch {
      throw new Error(
         `ColorVariant: ${colorVariant}  Doesn't Exit. You can add this  in the theme config.`
      )
   }
}

const getSliderContainerStylesBasedOnLabelPosition = (
   labelPosition: LabelPositionType
): string => {
   switch (labelPosition) {
      case 'bottom':
         return `flex-col gap-y-md`
      case 'right':
         return `flex-row  items-center gap-x-lg`
      default:
         return ''
   }
}

export const getSliderContainerStyles = (
   labelPosition: LabelPositionType
): string =>
   `flex relative w-full ${getSliderContainerStylesBasedOnLabelPosition(labelPosition)}
   
   `

const getLabelStylesBasedOnLabelPosition = (
   labelPosition: LabelPositionType
): string => {
   switch (labelPosition) {
      case 'bottom':
         return `self-end`
      case 'right':
         return 'w-[54px]'
      case 'top-float':
      case 'bottom-float':
         return 'border border-secondary py-md px-lg rounded-md shadow-lg w-fit'
   }
}

export const getLabelTextStyles = (labelPosition: LabelPositionType): string =>
   `text-secondary-700 text-sm-medium text-left truncate shrink-0 ${getLabelStylesBasedOnLabelPosition(
      labelPosition
   )}`

export const labelTextToolTipClassName = `rounded-md !p-0 !bg-[#FFFFFF]`

export const lastThumbToolTipContainerClassName = `rounded-md !p-lg !p-md`

export const lastThumbToolTipContentClassName = `text-xs-semibold text-white`

export const baseTrackStyles = `
   relative z-0
   flex justify-between items-center
   grow rounded-full 
`

export const baseFillStyles = `
   absolute left-0 inset-y-0 z-[-1]
   flex flex-row items-center
   h-full
   overflow-hidden
   rounded-full
`

export const baseFillChildStyles = `
   absolute inset-0 rounded-full
`

export const thumbContainerStyles = `cursor-pointer z-1 absolute select-none`

export const sliderThumbStyles = `rounded-full  select-none`

export const sliderContainerStyles =
   'relative flex flex-col justify-center align-items-center grow'
export const sliderInputStyles = `min-w-[50px] w-full cursor-pointer`

export const getStepsProgressBarTrackStyles = (
   status: StepsProgressbarState
): SliderTrackThemeType => {
   try {
      return STEPS_PROGRESS_BAR_TRACK_THEME[status]
   } catch {
      throw new Error(
         `Status: ${status}  Doesn't Exit. You can add this  in the theme config.`
      )
   }
}

export const getStepsProgressBarThumbStyles = (
   state: StepsProgressbarState,
   status: StepStatus
): SliderThumbThemeType => {
   try {
      return STEPS_PROGRESS_BAR_THUMB_THEME[state][status]
   } catch {
      throw new Error(
         `State: ${state}, Status: ${status}  Doesn't Exit. You can add this  in the theme config.`
      )
   }
}

export const stepValueContainerStyles =
   'min-w-[54px] absolute top-3 text-xs-medium text-tertiary-600'

export const sliderProgressBarContainerStyles = 'flex flex-col relative grow'
