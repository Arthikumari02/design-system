import cn from 'classnames'
import { observer } from 'mobx-react'
import { ReactElement, useRef } from 'react'
import { ListBox, Select as RACSelect } from 'react-aria-components'

import HelpTextAndFieldError from '../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../Label/Label'
import { ListBoxItemContextProvider } from '../ListBoxItem/Context/Provider'
import ListBoxItem from '../ListBoxItem/ListBoxItem'
import { CustomOptionProps, ListItemType } from '../ListBoxItem/types'
import Popover from '../Popover/Popover'

import SelectButton from './SelectButton'
import { localListBoxClassName, popoverContainerClassName } from './styles'
import './styles.css'
import { SelectProps } from './types'

const Select = <T extends ListItemType = ListItemType>(
   props: SelectProps<T>
): ReactElement => {
   const {
      autoComplete,
      isDisabled,
      direction = 'bottom',
      align = 'start',
      shouldFlip = true,
      label,
      name,
      errorMessage,
      hint,
      size = 'Medium',
      showLabel = true,
      shouldOpenPopoverOnLabelClick = false,
      isRequired,
      labelClassName = '',
      hintClassName = '',
      containerClassName = '',
      popOverStyles = {},
      id = 'select',
      dataTestId = '',
      renderCustomOption,
      renderRequiredIcon,
      listboxClassName = '',
      onSelectionChange,
      items = [],
      selectedKey,
      defaultSelectedKey,
      focusRingVariant,
      children
   } = props

   const triggerRef = useRef<HTMLElement>(null)

   const buttonId = 'button-id'

   const renderLabel = (): React.ReactElement => (
      <Label
         isRequired={isRequired}
         htmlFor={buttonId}
         onClick={e => {
            if (!shouldOpenPopoverOnLabelClick) {
               e.preventDefault()
               e.stopPropagation()

               //TODO: below functionality is not working
               triggerRef.current?.focus()
            }
         }}
         size={'Medium'}
         contextualHelp={renderRequiredIcon}
         containerClassName={labelClassName}
      >
         {label}
      </Label>
   )

   const renderPopover = (): React.ReactElement => (
      <Popover
         className={popoverContainerClassName}
         placement={`${direction} ${align}`}
         offset={0}
         shouldFlip={shouldFlip}
         style={{ ...popOverStyles }}
      >
         <ListBoxItemContextProvider
            renderCustomOption={
               renderCustomOption as (
                  props: CustomOptionProps<ListItemType>
               ) => ReactElement
            }
         >
            <ListBox
               items={items}
               className={cn(localListBoxClassName, listboxClassName)}
            >
               {children ||
                  ((item: any) => (
                     <ListBoxItem
                        item={item}
                        key={item.key}
                        // @ts-ignore
                        textValue={item.textValue}
                     >
                        {item.textValue}
                     </ListBoxItem>
                  ))}
            </ListBox>
         </ListBoxItemContextProvider>
      </Popover>
   )

   return (
      <div id={id} data-testid={dataTestId} className={containerClassName}>
         <RACSelect
            selectedKey={selectedKey}
            defaultSelectedKey={defaultSelectedKey}
            onSelectionChange={onSelectionChange}
            isDisabled={isDisabled}
            autoComplete={autoComplete}
            name={name}
            isInvalid={Boolean(errorMessage)}
            {...props}
         >
            {({ isOpen, isFocused }) => (
               <>
                  {showLabel ? renderLabel() : null}

                  <SelectButton
                     {...props}
                     size={size}
                     buttonId={buttonId}
                     isOpen={isOpen}
                     within={true}
                     isError={Boolean(errorMessage)}
                     isFocused={isFocused}
                     variant={focusRingVariant}
                  />

                  {renderPopover()}

                  {hint || errorMessage ? (
                     <HelpTextAndFieldError
                        hint={hint}
                        error={errorMessage}
                        size={'Medium'}
                        containerClassName={cn(hintClassName, 'mt-xs')}
                     />
                  ) : null}
               </>
            )}
         </RACSelect>
      </div>
   )
}

export default observer(Select)
