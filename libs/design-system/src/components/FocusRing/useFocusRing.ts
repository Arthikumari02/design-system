import { DOMAttributes } from '@react-types/shared'
import {
   isFocusVisible,
   useFocus,
   useFocusVisibleListener,
   useFocusWithin
} from '@react-aria/interactions'
import { useCallback, useState } from 'react'
import { useRef } from 'react'

export interface AriaFocusRingProps {
   within?: boolean

   isTextInput?: boolean

   autoFocus?: boolean
}

export interface FocusRingAria {
   isFocused: boolean

   isFocusVisible: boolean

   focusProps: DOMAttributes
}

export function useFocusRing(props: AriaFocusRingProps = {}): FocusRingAria {
   const { autoFocus = false, isTextInput, within = true } = props
   const state = useRef({
      isFocused: false,
      isFocusVisible: autoFocus || isFocusVisible()
   })
   const [isFocused, setFocused] = useState(false)
   const [isFocusVisibleState, setFocusVisible] = useState(
      () => state.current.isFocused && state.current.isFocusVisible
   )

   const updateState = useCallback(
      () =>
         setFocusVisible(
            state.current.isFocused && state.current.isFocusVisible
         ),
      []
   )

   const onFocusChange = useCallback(
      (isFocused: boolean) => {
         state.current.isFocused = isFocused
         setFocused(isFocused)
         updateState()
      },
      [updateState]
   )

   useFocusVisibleListener(
      isFocusVisible => {
         state.current.isFocusVisible = isFocusVisible
         updateState()
      },
      [],
      { isTextInput }
   )

   const { focusProps } = useFocus({
      isDisabled: within,
      onFocusChange
   })

   const { focusWithinProps } = useFocusWithin({
      isDisabled: !within,
      onFocusWithinChange: onFocusChange
   })

   return {
      isFocused,
      isFocusVisible: state.current.isFocused && isFocusVisibleState,
      focusProps: within ? focusWithinProps : focusProps
   }
}
