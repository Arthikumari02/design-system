import cn from 'classnames'
import { observer } from 'mobx-react'
import { Text, TextProps } from 'react-aria-components'

import { BasicSize } from '../../../types'
import { helpTextAndFieldErrorSizes } from './sizes'

interface Props extends TextProps {
   size: BasicSize
}

const HelpText = (props: Props) => {
   const { size, ...other } = props
   const sizes = helpTextAndFieldErrorSizes[size]
   return (
      <Text
         {...other}
         slot='description'
         className={cn(
            'text-tertiary-600 truncate',
            props.className,
            sizes.hintText,
            sizes.containerClassName
         )}
         elementType='p'
      />
   )
}

export default observer(HelpText)
