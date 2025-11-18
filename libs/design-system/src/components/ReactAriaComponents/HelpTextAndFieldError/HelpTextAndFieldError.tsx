import cn from 'classnames'
import { ReactNode } from 'react'
import { SmallAndMedium } from '../../../types'

import HelpText from './HelpText'
import { helpTextAndFieldErrorSizes } from './sizes'

import FieldError from './FieldError'
export interface Props {
   hint: ReactNode
   error?: ReactNode
   size?: SmallAndMedium
   renderLeftIcon?: () => ReactNode
   renderRightIcon?: () => ReactNode
   containerClassName?: string
   errorTransitionClassName?: string
}

const HelpTextAndFieldError = (props: Props): React.ReactElement => {
   const {
      error,
      hint,
      renderLeftIcon,
      renderRightIcon,
      size = 'Small',
      containerClassName,
      errorTransitionClassName
   } = props

   const hintSize = helpTextAndFieldErrorSizes[size]

   const renderContent = (): React.ReactElement | null => {
      if (error) return <FieldError size={size}>{error}</FieldError>
      else if (hint) return <HelpText size={size}>{hint}</HelpText>
      return null
   }

   return error || hint ? (
      <div
         className={cn(
            hintSize.containerClassName,
            containerClassName,
            error && errorTransitionClassName
         )}
         title={
            typeof error === 'string'
               ? error
               : typeof hint === 'string'
                 ? hint
                 : ''
         }
      >
         {renderLeftIcon && renderLeftIcon()}
         {renderContent()}
         {renderRightIcon && renderRightIcon()}
      </div>
   ) : (
      <></>
   )
}

export default HelpTextAndFieldError
