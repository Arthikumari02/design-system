export type ColorVariantType =
   | 'GRAY'
   | 'GRAY_SLATE'
   | 'PRIMARY'
   | 'SUCCESS'
   | 'WARNING'
   | 'ERROR'
   | 'PURPLE'

export type ProgressBarVariant = 'Default' | 'Slider'
export type StepsProgressBarSize = 'Large'
export type RangeSliderSize = 'Small' | 'Large'
export type StepsProgressbarState = 'DISABLE' | 'ACTIVE'
export type ProgressbarVariant = 'DEFAULT' | 'SLIDER'
export type ProgressBarUIVariant = 'LINE' | 'CIRCULAR'
export type ProgressbarSize = 'ExtraSmall' | 'Small' | 'Large'

export interface ProgressbarThemeType {
   trackBgColor: string
   filledBgColor: string
   labelTextColor: string
   leftHalfBgColor: string
   rightHalfBgColor: string
   thumbBorderColor: string
   thumbBgColor: string
}
export interface ProgressbarVariantThemeType {
   [key: string]: ProgressbarThemeType
}

export interface SliderTrackThemeType {
   leftHalfBgColor: string
   rightHalfBgColor: string
}

export interface StepsProgressbarSliderTrackThemeType {
   [key: string]: SliderTrackThemeType
}

export interface SliderThumbThemeType {
   bgColor: string
   lastStepBgColor?: string
   lastStepBorderColor?: string
}

export type StepStatus = 'FILLED' | 'UNOCCUPIED'

export interface StepsProgressbarVariantThumbThemeType {
   [key: string]: Record<StepStatus, SliderThumbThemeType>
}

export interface ProgressBarSizesBasedOnVariantType {
   height: string
   borderRadius: string
   thumbWidth?: string
   thumbHeight?: string
}

export interface StepsProgressBarSizes {
   height: string
   borderRadius: string
   thumbWidth?: string
   thumbHeight?: string
}
export type LabelPositionType =
   | 'right'
   | 'bottom'
   | 'bottom-float'
   | 'top-float'
export interface ExpectedValueSizesBasedOnVariantType {
   expectedValueContainerStyles: string
   expectedValueIconWidth: number
   expectedValueIconHeight: number
}

export interface ExpectedValueOption {
   title?: string
   value: number
}

export interface ExpectedValueProps {
   expectedValues?: ExpectedValueOption[]
   showExpectedValues?: boolean
   customExpectedIconSize?: {
      width: number
      height: number
   }
}

export interface CommonProgressbarProps {
   progress: number
   colorVariant: ColorVariantType
   variant?: ProgressbarVariant
   uiVariant?: ProgressBarUIVariant
   isDisabled?: boolean
   size?: ProgressbarSize

   renderExpectedValuePoints: () => React.ReactElement | undefined
}

export interface SliderProps extends CommonProgressbarProps {
   minValue?: number
   maxValue?: number
   step?: number
   labelTooltipId?: string
   customTooltipId?: string
   onChangeProgress?: (value: string) => void
}
