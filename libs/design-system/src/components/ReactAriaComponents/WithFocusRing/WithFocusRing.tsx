import { mergeProps } from '@react-aria/utils'
import React, { ComponentType } from 'react'
import cn from 'classnames'
import { ExtendedSize, FocusRingVariant } from '../../../types'
import { getFocusRingSizes, getFocusRingStyles } from './styles'

export interface FocusRingProps {
   variant?: FocusRingVariant
   focusClass?: string
   focusRingClass?: string
   within?: boolean
   isTextInput?: boolean
   isFocused: boolean
   autoFocus?: boolean
   size?: ExtendedSize
   isError?: boolean
}

export function withFocusRing<P extends object>(
   WrappedComponent: ComponentType<P>
) {
   return function WithFocusRingComponent(props: P & FocusRingProps) {
      const {
         focusClass,
         focusRingClass,
         isError,
         variant = isError ? 'Destructive' : 'Primary',
         within = true,
         isFocused,
         ...restProps
      } = props

      const focusRingSize = props.size || 'Medium'
      const focusRingSizes = getFocusRingSizes(focusRingSize)
      const focusRingStyles = getFocusRingStyles(
         isError ? 'Destructive' : variant
      )

      const getFocusWithInStyles = (): string => {
         const ringStyles = `ring-offset-0 ring-4 outline-none ${focusRingSizes} ${focusRingStyles} ${focusClass}`
         if (within) return isFocused ? ringStyles : ''
         return isFocused ? '' : ringStyles
      }

      const combinedProps = mergeProps(restProps as any, {
         className: cn(getFocusWithInStyles(), {
            [focusRingClass || '']: isFocused
         })
      })

      return <WrappedComponent {...(combinedProps as P)} />
   }
}
