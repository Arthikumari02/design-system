import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { CSSProperties, useRef, useState } from 'react'

import { Placement, SmallAndMedium } from '../../types'

import OptionsList from '../OptionsList/OptionsList'
import { OptionsListProps } from '../OptionsList/types'
import RACPopoverWithTrigger from '../RACPopoverWithTrigger/RACPopoverWithTrigger'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

import * as Styles from './Styles'
import OptionsListTrigger from './Trigger'

export interface OptionsListWithTriggerPropsType
   extends Omit<OptionsListProps, 'targetRef'> {
   isOpen?: boolean

   setIsOpen?: (isOpen: boolean) => void

   errorMessage?: string
   hint?: string | null
   isRequired?: boolean
   label?: string
   placeholder?: string
   isClearable?: boolean
   isDisabled?: boolean
   labelClassName?: string

   customTrigger?: (
      triggerRef: React.RefObject<HTMLElement>
   ) => React.ReactElement

   prefixEnhancer?: () => React.ReactElement
   renderCustomSelectedOption?: (option: ListItemType) => React.ReactElement
   defaultSelectedTagClass?: string
   defaultSelectedTagTextClass?: string

   isDefaultTagClearable?: boolean
   containerStyles?: string
   popoverStyles?: CSSProperties
   popoverClassNames?: string
   offset?: number
   defaultSelectedTagWidth?: number
   onSelectionChange: (keys: string[], isFromPopover?: boolean) => void
   triggerContainerClassName?: string
   shouldShowDropdownIcon?: boolean
   popoverPlacement?: Placement
   size?: SmallAndMedium
}

const OptionsListWithTrigger = (
   props: OptionsListWithTriggerPropsType
): React.ReactElement => {
   const [isPopoverOpen, setIsPopoverOpen] = useState(false)

   const {
      isOpen = isPopoverOpen,
      selectedItems,
      setIsOpen = setIsPopoverOpen,
      customTrigger,
      errorMessage,
      hint,
      isRequired,
      label,
      placeholder,
      isClearable,
      prefixEnhancer,
      renderCustomSelectedOption,
      offset = 4,
      defaultSelectedTagWidth,
      triggerContainerClassName,
      shouldShowDropdownIcon
   } = props

   const triggerRef = useRef(null)

   const onSelectionChange = (
      selectedValues: string[],
      isFromPopover: boolean
   ) => {
      props.onSelectionChange(selectedValues, isFromPopover)

      if (props.selectionMode === 'single') {
         setIsOpen(false)
      }
   }

   const renderPopoverBody = (): React.ReactElement => (
      <OptionsList
         {...props}
         onSelectionChange={val => {
            onSelectionChange(val, true)
         }}
         targetRef={triggerRef}
      />
   )

   const onClear = (): void => {
      onSelectionChange([], false)
   }

   const onRemoveOption = (optionId: string): void => {
      const filteredOptions = selectedItems
         .filter(item => item.key !== optionId)
         .map(each => each.key)

      onSelectionChange(filteredOptions as string[], false)
   }

   const renderTrigger = (): React.ReactElement =>
      customTrigger ? (
         customTrigger(triggerRef)
      ) : (
         <OptionsListTrigger
            isOpen={isOpen}
            selectedValues={selectedItems}
            triggerRef={triggerRef}
            onClear={onClear}
            onRemoveOption={onRemoveOption}
            setIsOpen={setIsOpen}
            errorMessage={errorMessage}
            isDisabled={props.isDisabled}
            hint={hint ?? ''}
            isRequired={isRequired}
            label={label}
            placeholder={placeholder}
            prefixEnhancer={prefixEnhancer}
            customSelectedTag={renderCustomSelectedOption}
            defaultSelectedTagClass={props.defaultSelectedTagClass}
            defaultSelectedTagTextClass={props.defaultSelectedTagTextClass}
            isClearable={isClearable}
            isDefaultTagClearable={props.isDefaultTagClearable}
            labelClassName={props.labelClassName}
            defaultSelectedTagWidth={defaultSelectedTagWidth}
            size={props.size}
            triggerContainerClassName={triggerContainerClassName}
            shouldShowDropdownIcon={shouldShowDropdownIcon}
         />
      )

   return (
      <RACPopoverWithTrigger
         renderTrigger={renderTrigger}
         renderPopoverBody={renderPopoverBody}
         isOpen={isOpen}
         onOpenChange={setIsOpen}
         style={props.popoverStyles}
         triggerRef={triggerRef}
         popoverClassName={cn(Styles.containerStyles, props.popoverClassNames)}
         offset={offset}
         placement={props.popoverPlacement}
      />
   )
}

export default observer(OptionsListWithTrigger)
