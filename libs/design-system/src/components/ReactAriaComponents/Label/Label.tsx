import cn from 'classnames'
import { observer } from 'mobx-react'
import { LabelProps, Label as RACLabel } from 'react-aria-components'

import { ReactNode } from 'react'
import { SmallAndMedium } from '../../../types'
import { labelSizes } from './sizes'
import { localContainerClassName } from './styles'

interface Props extends LabelProps {
   size: SmallAndMedium
   isRequired?: boolean
   contextualHelp?: () => ReactNode
   containerClassName?: string
}

const Label = (props: Props) => {
   const { size, isRequired, contextualHelp, containerClassName, ...other } =
      props
   const labelSize = labelSizes[size]

   const renderRequiredContent = () => {
      if (!isRequired) return null
      else if (contextualHelp) return contextualHelp()
      return <span className={cn(labelSize.requiredContentClassName)}>*</span>
   }

   return (
      <div
         className={cn(
            labelSize.typography,
            labelSize.margin,
            localContainerClassName,
            containerClassName
         )}
      >
         <RACLabel {...other} />
         {renderRequiredContent()}
      </div>
   )
}

export default observer(Label)
