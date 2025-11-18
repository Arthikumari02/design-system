import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { RefObject, useRef, useState } from 'react'

import OutlineDotsHorizontal from '../../icons/OutlineDotsHorizontal/OutlineDotsHorizontal'
import { Placement } from '../../types'

import RACPopoverWithTrigger from '../RACPopoverWithTrigger/RACPopoverWithTrigger'

import ActionMenuOption from './ActionMenuOption'
import './index.css'
import * as Styles from './styles'
import { MenuOptionType } from './types'

interface ActionsMenuProps {
   options: MenuOptionType[]

   optionContainerClassName?: string
   bodyContainerClassName?: string
   optionTextClassName?: string
   placement?: Placement
   popoverBodyContainerClassName?: string
   triggerContainerClassName?: string
   setPopoverHoverState?: (isHover: boolean) => void
   renderCustomOption?: (optionProps: MenuOptionType) => React.ReactElement

   shouldStopOptionClickPropagation?: boolean

   isOpen?: boolean
   onOpenChange?: (isOpen: boolean, optionProps?: MenuOptionType) => void

   triggerConfig?: {
      triggerRef: RefObject<HTMLElement>
      renderTrigger: () => React.ReactElement
   }
   underlayClassName?: string
   underlayStyles?: React.CSSProperties
}

const ActionsMenuDropdownV2 = (props: ActionsMenuProps): React.ReactElement => {
   //NOTE: Don't use this state directly, use isOpen & onOpenChange only
   const [isPopoverOpen, setIsPopoverOpen] = useState(props.isOpen ?? false)

   const {
      placement = 'bottom right',

      shouldStopOptionClickPropagation,
      triggerConfig,

      popoverBodyContainerClassName,
      underlayClassName,
      underlayStyles,
      isOpen = isPopoverOpen,
      onOpenChange = setIsPopoverOpen
   } = props

   const triggerRef = useRef<HTMLDivElement>(null)

   const onClickAction = (optionProps: MenuOptionType): void => {
      optionProps.onClick(optionProps.value)

      onOpenChange(!isOpen)
   }

   const onMouseLeave = (): void => {
      props.setPopoverHoverState?.(false)
   }

   const onMouseEnter = (): void => {
      props.setPopoverHoverState?.(true)
   }

   const onClickTrigger = (): void => onOpenChange(true)

   const renderTrigger = (): React.ReactElement => (
      <div
         className={cn(Styles.menuIconStyles, props.triggerContainerClassName)}
         onClick={onClickTrigger}
         ref={triggerRef}
      >
         <OutlineDotsHorizontal
            width={20}
            height={20}
            className='stroke-button-tertiary-fg'
         />
      </div>
   )

   const renderMenuOption = (option: MenuOptionType): React.ReactElement => (
      <ActionMenuOption
         key={option.value}
         menuOption={option}
         optionTextClassName={props.optionTextClassName}
         optionContainerClassName={props.optionContainerClassName}
         onClickAction={onClickAction}
         shouldStopPropagation={shouldStopOptionClickPropagation}
      />
   )

   const renderPopoverBody = (): React.ReactElement => (
      <div
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         className={cn(
            Styles.bodyContainerStyles,
            props.bodyContainerClassName
         )}
      >
         {props.options.map(props.renderCustomOption ?? renderMenuOption)}
      </div>
   )

   return (
      <RACPopoverWithTrigger
         renderTrigger={
            triggerConfig ? triggerConfig.renderTrigger : renderTrigger
         }
         renderPopoverBody={renderPopoverBody}
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         triggerRef={triggerConfig ? triggerConfig.triggerRef : triggerRef}
         placement={placement}
         popoverClassName={cn(
            Styles.popoverBodyContainerClassName,
            popoverBodyContainerClassName
         )}
         underlayClassName={underlayClassName}
         underlayStyles={underlayStyles}
      />
   )
}

export default observer(ActionsMenuDropdownV2)
