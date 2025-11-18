import { useState, useRef, useCallback, useEffect } from 'react'
import { findStep } from '../components/Progressbar/StepSliderUtils'

interface Props {
   steps: number[]
   thumbSize: number
   sliderMinValue: number
   sliderMaxValue: number
   updateSliderColor: (
      element: HTMLInputElement,
      gradientStartValue: number
   ) => void
   onChangeSliderValue?: (value: string) => void
}

const useSliderThumbDraggableEvents = ({
   onChangeSliderValue,
   updateSliderColor,
   sliderMaxValue,
   sliderMinValue,
   steps,
   thumbSize
}: Props) => {
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const sliderThumbRef = useRef<number | null>(null)
   const initialMouseXRef = useRef<number>(0)
   const initialThumbLeftRef = useRef<number>(0)
   const sliderContainerRef = useRef<HTMLInputElement | null>(null)

   const getNewLeftPosition = (
      clientX: number,
      containerWidth: number
   ): number =>
      Math.max(
         0,
         Math.min(
            initialThumbLeftRef.current + (clientX - initialMouseXRef.current),
            containerWidth - thumbSize
         )
      )

   const updateSliderState = (
      newLeftPosition: number,
      containerElement: HTMLInputElement
   ): void => {
      const newSliderValue = calculateNewSliderValue(
         newLeftPosition,
         containerElement.clientWidth
      )
      const maxLeft = containerElement.clientWidth - thumbSize
      const currentActiveStep = findStep(newSliderValue, steps)

      if (currentActiveStep !== undefined) {
         const sliderFilledValue =
            (currentActiveStep - sliderMinValue) /
            (sliderMaxValue - sliderMinValue)
         onChangeSliderValue?.(currentActiveStep.toString())
         updateSliderColor(containerElement, sliderFilledValue * maxLeft)
      }
   }

   const calculateNewSliderValue = (
      newLeftPosition: number,
      containerWidth: number
   ): number =>
      Math.round(
         (newLeftPosition / (containerWidth - thumbSize)) *
            (sliderMaxValue - sliderMinValue) +
            sliderMinValue
      )

   const handleMouseMove = useCallback(
      (event: MouseEvent) => {
         if (!isDragging) return
         event.preventDefault()

         const containerElement = sliderContainerRef.current
         if (!containerElement) return

         const newLeftPosition = getNewLeftPosition(
            event.clientX,
            containerElement.clientWidth
         )
         sliderThumbRef.current = newLeftPosition
         updateSliderState(newLeftPosition, containerElement)
      },
      [isDragging]
   )

   const handleMouseUp = useCallback(() => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
   }, [handleMouseMove])

   const handleContainerClick = useCallback(
      (event: React.MouseEvent) => {
         const containerElement = sliderContainerRef.current
         if (!containerElement) return

         const containerRect = containerElement.getBoundingClientRect()
         const clickXPosition = event.clientX - containerRect.left

         const newLeftPosition = Math.max(
            0,
            Math.min(
               clickXPosition - thumbSize / 2,
               containerElement.clientWidth - thumbSize
            )
         )

         sliderThumbRef.current = newLeftPosition
         updateSliderState(newLeftPosition, containerElement)

         setIsDragging(true)
         initialMouseXRef.current = event.clientX
         initialThumbLeftRef.current = sliderThumbRef.current || 0
      },
      [handleMouseMove]
   )

   useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
         document.removeEventListener('mousemove', handleMouseMove)
         document.removeEventListener('mouseup', handleMouseUp)
      }
   }, [handleMouseMove, handleMouseUp])

   return {
      handleContainerClick,
      containerRef: sliderContainerRef,
      sliderThumbRef
   }
}

export default useSliderThumbDraggableEvents
