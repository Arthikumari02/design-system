import cn from 'classnames'

import { ExtendedSize, FocusRingVariant } from '../../types'

import { FOCUS_RING_THEME } from './constants'
import { focusRingSizes } from '.'

export const getFocusRingSizes = (size: ExtendedSize) =>
   cn(`${focusRingSizes[size].borderRadius} `)

export const getFocusRingStyles = (variant: FocusRingVariant) =>
   cn([`${FOCUS_RING_THEME[variant].ring}`])

export const getFocusRingStylesWithBorder = (variant: FocusRingVariant) =>
   cn([
      `${FOCUS_RING_THEME[variant].ring} ${FOCUS_RING_THEME[variant].borderColor}`
   ])
