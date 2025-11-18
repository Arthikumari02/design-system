import RACSlider from '../RACSlider/RACSlider'
import { SliderProps } from '../types'

interface InvertedSliderProps extends SliderProps {
   maxValue: number
   minValue: number
}

export const InvertedSlider = (props: InvertedSliderProps) => {
   const mapValueInRange = (value: number) =>
      props.maxValue + props.minValue - value

   const onChangeProgress = (currentProgressValue: string) => {
      const convertedProgressValue = mapValueInRange(
         parseInt(currentProgressValue)
      )
      props.onChangeProgress?.(convertedProgressValue.toString())
   }

   return (
      <RACSlider
         {...props}
         minValue={props.maxValue}
         maxValue={props.minValue}
         progress={mapValueInRange(props.progress)}
         onChangeProgress={onChangeProgress}
      />
   )
}
