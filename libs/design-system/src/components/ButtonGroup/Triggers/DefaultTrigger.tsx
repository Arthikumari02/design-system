import cn from 'classnames'
import React from 'react'

import { ChevronDownIcon } from '../../../icons/ChevronDownIcon'

import { getMenuTriggerBoxSizeStyles } from '../sizes'
import * as Styles from '../styles'
import { ButtonGroupVariant, ExtendedSize } from '../types'

interface DefaultTriggerProps {
   triggerRef: React.RefObject<HTMLDivElement>
   isOpen: boolean
   variant: ButtonGroupVariant
   size: ExtendedSize
   onClickTrigger: (e: React.MouseEvent) => void
}

export const DefaultTrigger: React.FC<DefaultTriggerProps> = ({
   triggerRef,
   isOpen,
   variant,
   size,
   onClickTrigger
}) => {
   const { triggerBoxPadding } = getMenuTriggerBoxSizeStyles(variant, size)

   return (
      <div
         className={cn(Styles.triggerIconContainerStyles, triggerBoxPadding)}
         style={{
            transform: isOpen ? 'rotate(180deg)' : '',
            transition: 'transform 0.5s'
         }}
         ref={triggerRef}
         onClick={onClickTrigger}
      >
         <ChevronDownIcon
            width={20}
            height={20}
            className='stroke-fg-quarterary-500'
         />
      </div>
   )
}
