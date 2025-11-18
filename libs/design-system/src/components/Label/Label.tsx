import cn from 'classnames'
import React, { ReactElement, ReactNode } from 'react'

import { BasicSize } from '../../types'

import { labelSizes } from './sizes'
import { localContainerClassName } from './styles'

export type LabelProps = {
   /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
   id?: string
   /** The content of this label */
   children: ReactNode
   /** Additional props to spread over the label component */
   labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
   isRequired?: boolean
   renderRequiredIcon?: () => React.ReactElement
   containerClassName?: string
   size?: BasicSize | 'Large'
}

export function Label(props: LabelProps): ReactElement {
   const {
      id,
      children,
      labelProps,
      isRequired,
      containerClassName,
      renderRequiredIcon,
      size = 'Small'
   } = props

   const labelSize = labelSizes[size]

   const renderRequiredContent = (): ReactElement | null => {
      if (!isRequired) return null
      else if (renderRequiredIcon) return renderRequiredIcon()
      return <span className={cn(labelSize.requiredContentClassName)}>*</span>
   }

   return (
      <label
         {...labelProps}
         id={id}
         lens-role='label'
         className={cn(
            'text-secondary-700',
            labelSize.typography,
            labelSize.margin,
            localContainerClassName,
            containerClassName
         )}
      >
         <p>{children}</p>
         {renderRequiredContent()}
      </label>
   )
}
