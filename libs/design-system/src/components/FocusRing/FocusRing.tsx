import { mergeProps } from '@react-aria/utils'
import React, { ReactElement } from 'react'

import cn from 'classnames'

import { ExtendedSize, FocusRingVariant } from '../../types'

import { getFocusRingSizes, getFocusRingStyles } from './styles'

import { useFocusRing } from './useFocusRing'

export interface FocusRingProps {
   children: ReactElement
   variant?: FocusRingVariant
   focusClass?: string
   focusRingClass?: string
   within?: boolean
   isTextInput?: boolean
   autoFocus?: boolean
   size?: ExtendedSize
   isError?: boolean
}

export function FocusRing(props: FocusRingProps) {
   const {
      children,
      focusClass,
      focusRingClass,
      size = 'Medium',
      isError,
      variant = isError ? 'Destructive' : 'Primary',
      within = true
   } = props
   const { isFocused, isFocusVisible, focusProps } = useFocusRing(props)
   const child = React.Children.only(children)

   const focusRingSizes = getFocusRingSizes(size)
   const focusRingStyles = getFocusRingStyles(isError ? 'Destructive' : variant)

   const getFocusWithInStyles = (): string => {
      const ringStyles = `ring-offset-0 ring-4 outline-none ${focusRingSizes} ${focusRingStyles} ${focusClass}`
      if (within) return isFocused ? ringStyles : ''

      return isFocused ? '' : ringStyles
   }

   return React.cloneElement(
      child,
      mergeProps(child.props, {
         ...focusProps,
         className: cn(getFocusWithInStyles(), {
            [focusRingClass || '']: isFocusVisible
         })
      })
   )
}
