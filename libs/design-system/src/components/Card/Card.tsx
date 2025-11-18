import cn from 'classnames'
import React from 'react'

import { getCardContainerClassNames } from './styles'
import { Elevation } from './types'

export interface CardProps {
   children: React.ReactNode

   className?: string
   elevation?: Elevation
   isOutline?: boolean

   onClick?: (e: React.MouseEvent<HTMLElement>) => void
   onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
   onMouseLeave?: React.MouseEventHandler<HTMLDivElement>

   ref?: React.Ref<HTMLDivElement>
}

export const Card = (props: CardProps): React.ReactElement => {
   const {
      children,

      className,
      elevation = 'None',
      isOutline = false,

      onClick,
      onMouseEnter,
      onMouseLeave,
      ref
   } = props

   return (
      <div
         ref={ref}
         className={cn(
            getCardContainerClassNames(elevation),
            isOutline ? `border` : 'border-none',
            className
         )}
         onClick={onClick}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
      >
         {children}
      </div>
   )
}
