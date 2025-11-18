import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useLayoutEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import uuid from 'react-uuid'

import { Icon } from '@shared/icons'

import { useId } from '../../hooks'
import { SmallAndMedium } from '../../types'

import { FocusRing } from '../FocusRing'
import { Hint } from '../Hint'
import { Label } from '../Label'
import {
   getComboboxTextInputContainerStylesBasedOnSize,
   getInputPrefixDimensionsBasedOnSize
} from '../ReactAriaComponents/ComboBox/styles'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

import * as styles from './Styles'

interface Props {
   isOpen: boolean
   selectedValues: ListItemType[]
   triggerRef: React.RefObject<HTMLButtonElement>
   onClear: () => void
   onRemoveOption: (optionId: string) => void
   setIsOpen: (isOpen: boolean) => void

   label?: string
   placeholder?: string
   hint?: string
   errorMessage?: string
   isRequired?: boolean
   isClearable?: boolean
   isDisabled?: boolean
   labelClassName?: string

   isDefaultTagClearable?: boolean
   prefixEnhancer?: () => React.ReactElement
   customSelectedTag?: (item: ListItemType) => React.ReactElement
   defaultSelectedTagClass?: string
   defaultSelectedTagTextClass?: string
   defaultSelectedTagWidth?: number
   size?: SmallAndMedium
   triggerContainerClassName?: string
   shouldShowDropdownIcon?: boolean
}

const OptionsListTrigger = (props: Props) => {
   const {
      onClear,
      onRemoveOption,
      selectedValues,

      isOpen,
      setIsOpen,

      placeholder,
      label,
      hint,
      errorMessage,
      isRequired,
      isClearable = true,
      isDefaultTagClearable = true,
      isDisabled,

      triggerRef,
      prefixEnhancer,
      customSelectedTag,
      size = 'Medium',

      labelClassName = '',
      defaultSelectedTagWidth = 100,
      triggerContainerClassName = '',
      shouldShowDropdownIcon = true
   } = props

   const areOptionsSelected = selectedValues.length ?? 0 > 0

   const hintId = useId()
   const [noOfOptionsToDisplay, setNoOfTOptionsToDisplay] = useState(2)

   useLayoutEffect(() => {
      if (!triggerRef.current) return

      const handleResize = (entries: ResizeObserverEntry[]) => {
         for (const entry of entries) {
            if (entry.contentRect) {
               // NOTE:get triggerRef width occupied and set noOfOptionsToDisplay by dividing the width of each option (100)
               const triggerWidth = entry.contentRect.width
               const possibleOptionsCount = Math.floor(
                  triggerWidth / defaultSelectedTagWidth
               )

               // NOTE: -1 for extra space like padding, close icon etc.
               setNoOfTOptionsToDisplay(possibleOptionsCount - 1)
            }
         }
      }

      const resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(triggerRef.current)

      return () => {
         resizeObserver.disconnect()
      }
   }, [triggerRef.current])

   const handleOnClear = (event: React.SyntheticEvent) => {
      event.preventDefault()
      event.stopPropagation()

      onClear()
   }

   const renderClearIcon = () => (
      <div onClick={handleOnClear}>
         <Icon
            type='OUTLINE'
            id='x'
            className='fill-fg-quarterary-500'
            width={iconSize}
            height={iconSize}
         />
      </div>
   )

   const renderCustomSelectedOption = (
      option: ListItemType
   ): React.ReactElement => {
      const onRemoveSelectedOption = (event: React.SyntheticEvent): void => {
         event.preventDefault()
         event.stopPropagation()

         onRemoveOption(option.key as string)
      }

      return customSelectedTag ? (
         customSelectedTag(option)
      ) : (
         <div
            className={cn(
               styles.selectedOptionContainerStyles,
               styles.SelectedOptionContainerSizeStyles[size],
               'default-option-tag',
               props.defaultSelectedTagClass
            )}
         >
            <p
               className={cn(
                  styles.optionTextStyles,
                  props.defaultSelectedTagTextClass
               )}
               title={option.textValue}
            >
               {option.textValue}
            </p>

            {isDefaultTagClearable ? (
               <div
                  onClick={onRemoveSelectedOption}
                  className={styles.closeIconContainerStyles}
               >
                  <Icon
                     type='OUTLINE'
                     id='x'
                     className='fill-fg-quarterary-500'
                     height={12}
                     width={12}
                  />
               </div>
            ) : null}
         </div>
      )
   }

   const renderSelectedValue = (selectedValues: ListItemType[]) => {
      const displayableValues = selectedValues.slice(0, noOfOptionsToDisplay)
      const renderPlusMore = selectedValues.length > noOfOptionsToDisplay

      const tooltipId = uuid()
      const names = selectedValues.map(option => option.textValue)

      return (
         <div className={styles.selectedOptionsListContainerStyles}>
            {displayableValues?.map(renderCustomSelectedOption)}

            {renderPlusMore && (
               <>
                  <p
                     data-tooltip-id={tooltipId}
                     className={styles.moreTextStyles}
                  >
                     +{selectedValues.length - noOfOptionsToDisplay}
                  </p>
                  <Tooltip
                     id={tooltipId}
                     className={styles.tooltipStyles}
                     opacity={1}
                  >
                     <p>{names.join(', ')}</p>
                  </Tooltip>
               </>
            )}
         </div>
      )
   }

   const rightIconContainerStyles = styles.getRightIconContainerStyles(isOpen)

   const renderLabel = () => {
      if (!label) return null

      return (
         <Label
            isRequired={isRequired}
            size={'Medium'}
            containerClassName={cn('!mb-sm', labelClassName)}
         >
            {label}
         </Label>
      )
   }

   const renderHelpTextOrError = () => {
      if (!hint && !errorMessage) return null

      return (
         <Hint id={hintId} hint={hint} error={errorMessage} size={'Small'} />
      )
   }

   const onClickTrigger = () => {
      !isDisabled && setIsOpen(!isOpen)
   }

   const iconSize = getInputPrefixDimensionsBasedOnSize(size)

   const renderTrigger = (): React.ReactElement => (
      <div className='flex flex-col w-full'>
         {renderLabel()}
         <FocusRing variant={isOpen ? 'Primary' : 'None'} within>
            <button
               ref={triggerRef}
               onClick={onClickTrigger}
               className={cn(
                  styles.getTriggerContainerStyles(Boolean(errorMessage)),
                  isOpen || isDisabled ? 'pointer-events-none' : '',
                  getComboboxTextInputContainerStylesBasedOnSize(size),
                  triggerContainerClassName
               )}
            >
               {areOptionsSelected ? (
                  renderSelectedValue(selectedValues ?? [])
               ) : (
                  <div className='flex items-center gap-md w-full min-w-0 min-h-[24px]'>
                     {prefixEnhancer?.()}
                     <p className={styles.PlaceholderTextSizeStyles[size]}>
                        {placeholder}
                     </p>
                  </div>
               )}
               <div className={styles.rightIconsContainerStyles}>
                  {areOptionsSelected && isClearable ? renderClearIcon() : null}
                  {shouldShowDropdownIcon ? (
                     <div className={rightIconContainerStyles}>
                        <Icon
                           type='OUTLINE'
                           id='chevron-right'
                           className='fill-gray-light-mode-500'
                           width={iconSize}
                           height={iconSize}
                        />
                     </div>
                  ) : null}
               </div>
            </button>
         </FocusRing>

         {renderHelpTextOrError()}
      </div>
   )

   return renderTrigger()
}

export default observer(OptionsListTrigger)
