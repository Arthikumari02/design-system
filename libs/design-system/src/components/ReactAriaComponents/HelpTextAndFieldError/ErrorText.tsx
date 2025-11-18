import cn from 'classnames'
import { observer } from 'mobx-react'
import { ReactNode } from 'react'

import { BasicSize } from '../../../types'
import { helpTextAndFieldErrorSizes } from './sizes'

interface Props {
   size: BasicSize
   children: ReactNode
   className?: string
   title?: string
}

const ErrorText = (props: Props) => {
   const { size, children } = props
   const sizes = helpTextAndFieldErrorSizes[size]

   return (
      <p
         className={cn(
            'text-error-primary-600 truncate',
            sizes.errorText,
            sizes.containerClassName,
            props.className
         )}
         title={props.title}
      >
         {children}
      </p>
   )
}

export default observer(ErrorText)
