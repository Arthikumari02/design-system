import cn from 'classnames'
import { observer } from 'mobx-react'
import { Button, SelectValue } from 'react-aria-components'

import { Icon } from '@shared/icons'

import { FocusRingVariant, SmallAndMedium } from '../../../types'

import { ListItemType } from '../ListBoxItem/types'
import { withFocusRing } from '../WithFocusRing/WithFocusRing'

import { sizes } from './sizes'
import {
   chevronRightIconClassName,
   clearIconContainerClassName,
   getButtonTextStyles,
   getPlaceholderStyles,
   getSelectButtonClass,
   getSelectSizeClasses
} from './styles'
import { SelectProps } from './types'

interface Props<T extends ListItemType = ListItemType> extends SelectProps<T> {
   size: SmallAndMedium
   buttonId: string
   isOpen: boolean
   within?: boolean
   isFocused: boolean
   isError?: boolean
   variant?: FocusRingVariant
}

const SelectButton = withFocusRing((props: any): React.ReactElement => {
   const {
      autoFocus,
      errorMessage,
      isDisabled,
      shouldShowClearButton = false,
      buttonClassName = '',
      selectButtonRightIconHeight,
      selectButtonRightIconWidth,
      showSelectButtonRightIcon = true,
      placeholder = 'select an option',
      inputButtonTextClassName = '',
      selectButtonClassName,
      size,
      buttonId,
      isOpen,
      selectedKey,
      onSelectionChange,
      renderValueContainer,
      renderLeftIcon
   } = props

   const buttonClass = getSelectButtonClass(Boolean(errorMessage), isDisabled)
   const buttonSizeStyles = getSelectSizeClasses(size)

   const renderSelectValue = (): React.ReactElement => (
      <SelectValue
         className={cn(
            getButtonTextStyles(),
            renderLeftIcon ? 'ml-md' : 'ml-none',
            inputButtonTextClassName
         )}
      >
         {({ isPlaceholder, selectedText }) =>
            isPlaceholder ? (
               <span className={getPlaceholderStyles(size)}>{placeholder}</span>
            ) : renderValueContainer ? (
               <span title={selectedText || undefined}>
                  {renderValueContainer({
                     selectedText
                  })}
               </span>
            ) : (
               <span title={selectedText || undefined}>{selectedText}</span>
            )
         }
      </SelectValue>
   )

   return (
      <div className={cn('relative', props.className)}>
         <Button
            className={cn(buttonClass, buttonSizeStyles, buttonClassName)}
            autoFocus={autoFocus}
            id={buttonId}
         >
            <div
               className={cn(
                  'flex items-center w-[90%]',
                  selectButtonClassName
               )}
            >
               {renderLeftIcon ? (
                  <div className='shrink-0'>{renderLeftIcon()}</div>
               ) : null}

               {renderSelectValue()}
            </div>

            {showSelectButtonRightIcon ? (
               <div
                  className={cn(chevronRightIconClassName, {
                     'rotate-[-90deg]': isOpen,
                     'rotate-90': !isOpen
                  })}
               >
                  <Icon
                     type='OUTLINE'
                     id='chevron-right'
                     className='fill-fg-quarterary-500'
                     height={selectButtonRightIconHeight || sizes.sizes[size]}
                     width={selectButtonRightIconWidth || sizes.sizes[size]}
                  />
               </div>
            ) : null}
         </Button>

         {shouldShowClearButton && selectedKey ? (
            <div
               onClick={e => {
                  onSelectionChange?.('' as any)
                  e.stopPropagation()
               }}
               className={clearIconContainerClassName}
            >
               <Icon
                  type='OUTLINE'
                  id='x'
                  className='fill-fg-quarterary-500'
                  height={20}
                  width={20}
               />
            </div>
         ) : null}
      </div>
   )
})

const SelectButtonWrapper = <T extends ListItemType>(props: Props<T>) => (
   <SelectButton {...props} className={props.className} />
)

export default observer(SelectButtonWrapper)
