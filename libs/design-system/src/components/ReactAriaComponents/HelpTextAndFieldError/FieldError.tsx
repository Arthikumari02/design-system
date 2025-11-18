import cn from 'classnames'
import { observer } from 'mobx-react'
import {
   FieldErrorProps,
   FieldError as RACFieldError
} from 'react-aria-components'

import { SmallAndMedium } from '../../../types'

import { helpTextAndFieldErrorSizes } from './sizes'

interface Props extends FieldErrorProps {
   size: SmallAndMedium
}

const FieldError = (props: Props) => {
   const { size, ...other } = props
   const sizes = helpTextAndFieldErrorSizes[size]

   return (
      <RACFieldError
         {...other}
         className={cn(
            props.className,
            'text-error-primary-600 truncate',
            sizes.errorText,
            sizes.containerClassName
         )}
      />
   )
}

export default observer(FieldError)
