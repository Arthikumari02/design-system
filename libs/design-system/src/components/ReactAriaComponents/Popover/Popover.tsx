import cn from 'classnames'
import React from 'react'
import {
   Popover as AriaPopover,
   PopoverProps as AriaPopoverProps,
   OverlayArrow,
   PopoverContext,
   useSlottedContext
} from 'react-aria-components'
import { observer } from 'mobx-react'

import { defaultPopoverStyles } from './styles'
import './styles.css'

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
   showArrow?: boolean
   children: React.ReactNode
}

const Popover = (props: PopoverProps) => {
   const { children, showArrow, className, ...other } = props
   const popoverContext = useSlottedContext(PopoverContext)
   const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger'
   let offset = showArrow ? 12 : 8
   offset = isSubmenu ? offset - 6 : offset

   return (
      <AriaPopover
         offset={offset}
         {...other}
         className={({ placement }) =>
            cn(
               defaultPopoverStyles,
               className,
               'popover-animation',
               `popover-animation--${placement}`,
               `popover-scrollbar`,
               {
                  'is-open': true
               }
            )
         }
      >
         {showArrow && (
            <OverlayArrow className='group'>
               <svg
                  width={12}
                  height={12}
                  viewBox='0 0 12 12'
                  className='block fill-white dark:fill-[#1f1f21] forced-colors:fill-[Canvas] stroke-1 stroke-black/10 dark:stroke-zinc-600 forced-colors:stroke-[ButtonBorder] group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90'
               >
                  <path d='M0 0 L6 6 L12 0' />
               </svg>
            </OverlayArrow>
         )}
         {children}
      </AriaPopover>
   )
}

export default observer(Popover)
