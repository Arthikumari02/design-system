import cn from 'classnames'

import { BasicSize } from '../../../../types/index'

import { commonDateFieldTriggerSizes } from './sizes'

export const dateFieldTriggerThemeStyles = (
   isDisabled: boolean | undefined
): string =>
   cn('flex', {
      [`bg-secondary`]: isDisabled,
      [`bg-primary`]: !isDisabled
   })

export const getDateFieldTriggerSizingStyles = (size: BasicSize): string => {
   const sizing = commonDateFieldTriggerSizes[size]

   return cn(sizing.padding, sizing.radius, sizing.shadow, sizing.height)
}
