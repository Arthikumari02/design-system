import { mergeProps } from '@react-aria/utils'
import React, { ReactElement } from 'react'

import cn from 'classnames'

import { BasicSize } from '../../types'

import { getFocusRingSizes, getFocusRingStylesWithBorder } from './styles'

import { useFocusRing } from './useFocusRing'

import { Variant } from '.'

export interface HoverFocusBorderProps {
   children: ReactElement
   variant?: Variant
   focusClass?: string
   focusRingClass?: string
   isHovered?: boolean
   isTextInput?: boolean
   autoFocus?: boolean
   size?: BasicSize
   isError?: boolean
}

export function HoverFocusBorder(props: HoverFocusBorderProps) {
   const {
      children,
      focusClass,
      focusRingClass,
      size = 'Small',
      isError,
      variant = isError ? 'Destructive' : 'Primary',
      isHovered
   } = props
   const { isFocused, isFocusVisible, focusProps } = useFocusRing(props)
   const child = React.Children.only(children)

   const focusRingSizes = getFocusRingSizes(size)
   const focusRingStyles = getFocusRingStylesWithBorder(
      isError ? 'Destructive' : variant
   )

   return React.cloneElement(
      child,
      mergeProps(child.props, {
         ...focusProps,
         className: cn({
            [`border  outline-none  ${focusRingStyles} ${focusRingSizes} ${focusClass}`]:
               isFocused || isHovered,
            [`border !border-transparent  outline-none  ${focusRingStyles} ${focusRingSizes} ${focusClass}`]:
               !isFocused && !isHovered,
            [focusRingClass || '']: isFocusVisible
         })
      })
   )
}
