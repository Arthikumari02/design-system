import { useFocus, useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'

import { observer } from 'mobx-react'
import React, { ReactElement, useMemo, useRef, useState } from 'react'

import { FocusRing } from '../FocusRing/FocusRing'
import RACPopoverWithTrigger from '../RACPopoverWithTrigger/RACPopoverWithTrigger'

import { OptionsList } from './OptionsList/OptionsList'
import { DefaultTrigger } from './Triggers/DefaultTrigger'
import { IconTrigger } from './Triggers/IconTrigger'
import { OutlineButtonGroup } from './Variants/OutlineButtonGroup'
import { PlainButtonGroup } from './Variants/PlainButtonGroup'
import './index.css'
import { ButtonGroupProps, DefaultOptionType, MenuOptionType } from './types'

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
   const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(
      props.isOpen ?? false
   )
   const triggerRef = useRef<HTMLDivElement>(null)

   const {
      isOpen = isPopoverOpen,
      variant,
      onOpenChange = setIsPopoverOpen,
      size = 'Small',
      onSelectionChange,
      placement = 'bottom right',
      selectedOptionId,
      placeholderText = 'Add Here',
      selectedValue,
      shouldStopPropagation = false,
      isButtonHovered = false,
      renderCustomTrigger,
      underlayClassName
   } = props

   const selectedText = selectedValue ? selectedValue : placeholderText
   const [isFocused, onFocusChange] = useState(false)
   const { focusProps } = useFocus({ onFocusChange, isDisabled: false })
   const { hoverProps, isHovered } = useHover({ isDisabled: false })

   const selectedOption = useMemo(
      () =>
         props.options.find(eachOption => eachOption.id === selectedOptionId),
      [selectedOptionId, props.options]
   )

   const onClickOption = (option: MenuOptionType): void => {
      onSelectionChange?.(option.id, option.value)
      onOpenChange(!isOpen)
      option.onClick?.()
   }

   const onClickTrigger = (e: React.MouseEvent): void => {
      if (props.shouldStopPropagation) {
         e.stopPropagation()
      }
      onOpenChange(true)
   }

   const renderPopoverTrigger = (
      renderTrigger: () => ReactElement
   ): ReactElement => (
      <RACPopoverWithTrigger
         isOpen={isOpen}
         renderPopoverBody={() => (
            <OptionsList
               options={props.options}
               selectedOption={selectedOption}
               size={size}
               variant={variant}
               optionTextClassName={props.optionTextClassName}
               optionContainerClassName={props.optionContainerClassName}
               optionsListContainerClassName={
                  props.optionsListContainerClassName
               }
               shouldStopPropagation={shouldStopPropagation}
               onClickOption={onClickOption}
               renderCustomOption={props.renderCustomOption}
            />
         )}
         renderTrigger={
            renderCustomTrigger
               ? () => renderCustomTrigger(triggerRef)
               : renderTrigger
         }
         triggerRef={triggerRef}
         onOpenChange={onOpenChange}
         placement={placement}
         underlayClassName={underlayClassName}
      />
   )

   const renderButtonGroupBasedOnVariant = (): ReactElement => {
      switch (variant) {
         case 'OUTLINE':
            return (
               <OutlineButtonGroup
                  selectedOption={selectedOption as DefaultOptionType}
                  selectedText={selectedText}
                  variant={variant}
                  size={size}
                  containerClassName={props.containerClassName}
                  renderPopoverTrigger={renderPopoverTrigger}
                  renderDefaultVariantTrigger={() => (
                     <DefaultTrigger
                        triggerRef={triggerRef}
                        isOpen={isOpen}
                        variant={variant}
                        size={size}
                        onClickTrigger={onClickTrigger}
                     />
                  )}
               />
            )
         case 'ICON':
            return (
               <FocusRing within variant={'Gray'} focusClass='!rounded-xs'>
                  <div tabIndex={0} {...mergeProps(focusProps)}>
                     {renderPopoverTrigger(() => (
                        <IconTrigger
                           triggerRef={triggerRef}
                           isOpen={isOpen}
                           selectedOption={selectedOption}
                           containerClassName={props.containerClassName}
                           onClickTrigger={onClickTrigger}
                        />
                     ))}
                  </div>
               </FocusRing>
            )
         case 'PLAIN':
            return (
               <PlainButtonGroup
                  selectedOption={selectedOption as DefaultOptionType}
                  selectedText={selectedText}
                  variant={variant}
                  size={size}
                  isHovered={isHovered}
                  isButtonHovered={isButtonHovered}
                  isFocused={isFocused}
                  containerClassName={props.containerClassName}
                  hoverProps={hoverProps}
                  focusProps={focusProps}
                  renderPopoverTrigger={renderPopoverTrigger}
                  renderDefaultVariantTrigger={() => (
                     <DefaultTrigger
                        triggerRef={triggerRef}
                        isOpen={isOpen}
                        variant={variant}
                        size={size}
                        onClickTrigger={onClickTrigger}
                     />
                  )}
               />
            )
      }
   }

   return renderButtonGroupBasedOnVariant()
}

export default observer(ButtonGroup)
