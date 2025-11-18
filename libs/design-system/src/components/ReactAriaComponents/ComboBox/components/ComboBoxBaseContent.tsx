import { useResizeObserver } from '@react-aria/utils'
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, {
   ReactElement,
   useCallback,
   useContext,
   useEffect,
   useLayoutEffect,
   useRef
} from 'react'
import {
   ComboBoxRenderProps,
   ComboBoxStateContext,
   Group,
   ListBox
} from 'react-aria-components'

import { Loader } from '../../../Loader/Loader'
import { NoSearchResultsView } from '../../../NoSearchResultsView/NoSearchResultsView'
import CreateItem from '../../../OptionsList/CreateItem'

import HelpTextAndFieldError from '../../HelpTextAndFieldError/HelpTextAndFieldError'
import Label from '../../Label/Label'
import { ListBoxItemContextProvider } from '../../ListBoxItem/Context/Provider'
import { CustomOptionProps, ListItemType } from '../../ListBoxItem/types'
import Popover from '../../Popover/Popover'

import '../styles.css'
import { ComboboxProps } from '../types'

import { getInputPrefixDimensionsBasedOnSize } from '../styles'

import ComboboxInput from './ComboboxInput'

interface ComboBoxBaseContentProps<T extends ListItemType>
   extends ComboBoxRenderProps {
   defaultChildren: React.ReactNode
   comboboxProps: ComboboxProps<T>
   isFocused: boolean
   isListInitializedRef?: React.MutableRefObject<boolean>
}

const ComboBoxBaseContent = <T extends ListItemType = ListItemType>(
   props: ComboBoxBaseContentProps<T>
) => {
   const { comboboxProps, isDisabled, isRequired, isInvalid, isOpen } = props

   const {
      label,
      size = 'Medium',
      hint,
      errorMessage,
      placeholder,
      listState,

      renderNoResults,
      renderCustomError,
      renderLeftIcon,
      renderRightIcon,
      renderCustomLoading,
      focusRingVariant,

      labelClassName,
      popOverStyles = {},
      listboxClassName = '',

      isClearable = true,

      creatableOptionProps
   } = comboboxProps

   const inputGroupRef = useRef<HTMLDivElement>(null)
   const [menuWidth, setMenuWidth] = React.useState<number>()
   const isInitialRender = props.isListInitializedRef
   const isListInitialized = useRef(false)

   const comboBoxStateContext = useContext(ComboBoxStateContext)

   const onResize = useCallback(() => {
      if (inputGroupRef.current) {
         setMenuWidth(inputGroupRef.current.offsetWidth)
      }
   }, [inputGroupRef, setMenuWidth])

   useResizeObserver({
      ref: inputGroupRef,
      onResize: onResize
   })

   useLayoutEffect(onResize, [onResize])

   const iconSize = getInputPrefixDimensionsBasedOnSize(size)

   const onScroll = (e: React.UIEvent) => {
      const scrollOffset =
         e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2

      if (e.currentTarget.scrollTop > scrollOffset) {
         listState?.onLoadMore()
      }
   }

   const renderNoResultsView = () => {
      if (!isListInitialized.current && listState?.loadingState === 'idle')
         return renderLoadingView()

      return renderNoResults?.() || <NoSearchResultsView />
   }

   const onRetry = () => {
      listState?.onApiRetry()
   }

   const showClearIcon = isClearable && !!comboboxProps.selectedKey

   const renderErrorView = () =>
      renderCustomError?.(onRetry) || (
         <div className='flex items-center justify-center p-4'>
            <button
               className='flex items-center gap-2 rounded border border-gray-300 px-3 py-1'
               onClick={onRetry}
            >
               Retry
            </button>
         </div>
      )

   const renderLoadingView = () =>
      renderCustomLoading?.() || (
         <div className='flex items-center justify-center p-4'>
            <Loader className='fill-utility-brand-500' />
         </div>
      )

   useEffect(() => {
      if (isInitialRender?.current) {
         isInitialRender.current = false

         return
      }

      if (isOpen && !isListInitialized.current) {
         listState?.initializeList(comboBoxStateContext?.inputValue)
      }
   }, [isOpen])

   useEffect(() => {
      if (isOpen && !isListInitialized.current) {
         isListInitialized.current = true
      }
   }, [isOpen])

   //#region Create option

   //NOTE: added this to render the create option in case the filter text not matches with items

   const text =
      comboBoxStateContext?.inputValue || comboboxProps.inputValue || ''
   const hasFilteredOptions =
      (comboboxProps.items ? Array.from(comboboxProps.items) : [])?.length > 0
   const shouldRenderListBox = !(
      !hasFilteredOptions &&
      creatableOptionProps?.isCreatable &&
      text?.trim()
   )

   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (creatableOptionProps?.onKeyDown) {
         creatableOptionProps?.onKeyDown?.(e, hasFilteredOptions, text.trim())
         return //NOTE: Added this to stop triggering the next default condition
      }
      if (
         (e.key === 'Enter' || e.keyCode === 13) &&
         !creatableOptionProps?.shouldNotCreateOnEnter &&
         !hasFilteredOptions
      ) {
         creatableOptionProps?.onClickCreateOption?.(text.trim(), onCreateItem)
      }

      if (e.key === 'Escape') {
         e.stopPropagation()
         e.preventDefault?.()
      }
   }

   const isFilterTextMatchesWithItem =
      creatableOptionProps?.isCreatable &&
      comboBoxStateContext &&
      comboBoxStateContext.collection.size > 0 &&
      Array.from(comboBoxStateContext.collection).some(
         item =>
            item.textValue.toLowerCase() ===
            comboboxProps.inputValue?.trim().toLowerCase()
      )

   const shouldRenderCreatableOption =
      creatableOptionProps?.isCreatable &&
      comboboxProps.inputValue?.trim() &&
      !isFilterTextMatchesWithItem &&
      !comboboxProps.listState?.isApiFailed &&
      !(
         listState?.loadingState === 'loading' ||
         listState?.loadingState === 'filtering'
      )

   //#endregion

   const onClearIconClick = () => {
      comboboxProps.onSelectionChange?.('')
   }
   const onCreateItem = () => {
      comboboxProps.onInputChange?.(text)
   }

   const renderPopoverContent = () => {
      const showLoadingView =
         listState?.loadingState === 'loading' ||
         isInitialRender?.current ||
         listState?.loadingState === 'filtering'

      const showErrorView =
         listState?.loadingState === 'error' || listState?.isApiFailed

      if (showLoadingView) return renderLoadingView()
      if (showErrorView) return renderErrorView()

      return (
         <>
            {shouldRenderListBox ? (
               <ListBoxItemContextProvider
                  renderCustomOption={
                     comboboxProps.renderCustomOption as (
                        props: CustomOptionProps<ListItemType>
                     ) => ReactElement
                  }
               >
                  <ListBox
                     onScroll={onScroll}
                     renderEmptyState={renderNoResultsView}
                     className={cn(
                        'overflow-y-auto combobox-list-box',
                        listboxClassName
                     )}
                  >
                     {comboboxProps.children}
                  </ListBox>
               </ListBoxItemContextProvider>
            ) : null}
            {shouldRenderCreatableOption ? (
               <CreateItem
                  {...creatableOptionProps}
                  text={text}
                  hasFilteredOptions={hasFilteredOptions}
                  onCreate={onCreateItem}
               />
            ) : null}
            {listState?.loadingState === 'loadingMore' && (
               <div className='flex items-center justify-center'>
                  <Loader className='fill-utility-brand-500' />
               </div>
            )}
         </>
      )
   }

   return (
      <div className='w-full'>
         {label ? (
            <Label
               size={'Medium'}
               isRequired={isRequired}
               className={labelClassName}
               contextualHelp={comboboxProps.renderRequiredIcon}
            >
               {label}
            </Label>
         ) : null}
         <Group>
            <ComboboxInput
               size={size}
               isInvalid={isInvalid}
               isDisabled={isDisabled}
               focusRingVariant={focusRingVariant}
               placeholder={placeholder}
               showClearIcon={showClearIcon}
               onClearIconClick={onClearIconClick}
               leftIconContainerClassName={
                  comboboxProps.leftIconContainerClassName
               }
               inputClassName={comboboxProps.inputClassName}
               renderRightIcon={renderRightIcon}
               renderLeftIcon={renderLeftIcon}
               isOpen={isOpen}
               iconSize={iconSize}
               inputGroupRef={inputGroupRef}
               onKeyDown={onKeyDown}
               isError={!!errorMessage}
               isFocused={props.isFocused}
               within={true}
               isTextInput={true}
            />
            {(hint || errorMessage) && (
               <HelpTextAndFieldError
                  hint={hint}
                  error={errorMessage ? errorMessage.toString() : ''}
                  size={'Medium'}
                  containerClassName={'mt-xs'}
               />
            )}
         </Group>
         <Popover
            style={{ width: menuWidth, ...popOverStyles }}
            triggerRef={inputGroupRef}
            offset={-2}
            className={'overflow-hidden'}
         >
            {renderPopoverContent()}
         </Popover>
      </div>
   )
}

export default observer(ComboBoxBaseContent)
