import { mergeProps } from '@react-aria/utils'
import React, { ReactElement } from 'react'

import cn from 'classnames'

import { BasicSize } from '../../types'

import { getFocusRingSizes, getFocusRingStylesWithBorder } from './styles'

import { useFocusRing } from './useFocusRing'

import { Variant } from '.'

export interface FocusRingWithBorderProps {
   children: ReactElement
   variant?: Variant
   focusClass?: string
   focusRingClass?: string
   within?: boolean
   isTextInput?: boolean
   autoFocus?: boolean
   size?: BasicSize | 'Large'
   isError?: boolean
}

export function FocusRingWithBorder(props: FocusRingWithBorderProps) {
   const {
      children,
      focusClass,
      focusRingClass,
      size = 'Small',
      isError,
      variant = isError ? 'Destructive' : 'Primary'
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
            'border border-primary': !isFocused && !isError,
            'border border-error': !isFocused && isError,
            [`border ring-4 ring-offset-0 outline-none  ${focusRingStyles} ${focusRingSizes} ${focusClass}`]:
               isFocused,
            [focusRingClass || '']: isFocusVisible
         })
      })
   )
}
