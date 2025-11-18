import React, { ReactNode, ReactElement } from 'react'
import cn from 'classnames'

import { BasicSize } from '../../types'
import { hintSizes } from './sizes'

export interface HintProps {
   id: string
   hint?: ReactNode
   error?: React.ReactNode
   containerClassName?: string
   size?: BasicSize | 'Large'
   renderLeftIcon?: () => ReactNode
   renderRightIcon?: () => ReactNode
   errorTransitionClassName?: string
}

export function Hint(props: HintProps): ReactElement {
   const {
      id,
      error,
      renderLeftIcon,
      renderRightIcon,
      size = 'Small',
      containerClassName,
      hint,
      errorTransitionClassName
   } = props

   const hintSize = hintSizes[size]
   const renderContent = (): ReactElement | null => {
      if (error)
         return (
            <div
               title={error.toString()}
               className={cn(
                  hintSize.errorText.containerClassName,
                  'text-error-primary-600'
               )}
            >
               {error}
            </div>
         )
      else if (hint)
         return (
            <div
               title={hint.toString()}
               className={cn(
                  hintSize.hintText.containerClassName,
                  'text-tertiary-600'
               )}
            >
               {hint}
            </div>
         )
      else return null
   }

   return error || hint ? (
      <div
         id={id}
         className={cn(
            hintSize.containerClassName,
            containerClassName,
            error && errorTransitionClassName
         )}
      >
         {renderLeftIcon && renderLeftIcon()}
         {renderContent()}
         {renderRightIcon && renderRightIcon()}
      </div>
   ) : (
      <></>
   )
}
