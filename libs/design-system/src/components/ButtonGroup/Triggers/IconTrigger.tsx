import cn from 'classnames'
import React from 'react'

import { ChevronDownIcon } from '../../../icons/ChevronDownIcon'

import * as Styles from '../styles'
import { MenuOptionType } from '../types'

interface IconTriggerProps {
   triggerRef: React.RefObject<HTMLDivElement>
   isOpen: boolean
   selectedOption?: MenuOptionType
   containerClassName?: string
   onClickTrigger: (e: React.MouseEvent) => void
}

export const IconTrigger: React.FC<IconTriggerProps> = ({
   triggerRef,
   isOpen,
   selectedOption,
   containerClassName,
   onClickTrigger
}) => {
   const iconProps = { width: 16, height: 16 }

   return (
      <div
         className={cn(
            Styles.iconVariantTriggerContainerStyles,
            { '!border-secondary': isOpen },
            containerClassName
         )}
         ref={triggerRef}
         onClick={onClickTrigger}
      >
         {selectedOption?.icon?.(iconProps) ?? (
            <ChevronDownIcon
               {...iconProps}
               className='stroke-fg-quarterary-500'
            />
         )}
      </div>
   )
}
