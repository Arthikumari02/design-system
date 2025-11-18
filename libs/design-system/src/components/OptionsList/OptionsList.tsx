import cn from 'classnames'
import { observer } from 'mobx-react'
import { ReactElement, useEffect, useRef, useState } from 'react'
import {
   Autocomplete,
   ListBox,
   Input as RACInput,
   SearchField
} from 'react-aria-components'
import { Icon } from '@shared/icons'

import { AsyncListData } from '../../hooks/useAsyncList'
import useOptionsList from '../../hooks/useOptionsList'
import { XCloseIcon } from '../../icons/XCloseIcon/XCloseIcon'

import { Button, Hierarchy, SubVariant } from '../ReactAriaComponents/Button'
import { Loader } from '../Loader/Loader'
import { NoSearchResultsView } from '../NoSearchResultsView/NoSearchResultsView'
import { ListBoxItemContextProvider } from '../ReactAriaComponents/ListBoxItem/Context/Provider'
import ListBoxItem from '../ReactAriaComponents/ListBoxItem/ListBoxItem'
import {
   CustomOptionProps,
   ListItemType
} from '../ReactAriaComponents/ListBoxItem/types'

import CreateItem from './CreateItem'
import SelectedValueItem from './SelectedValueItem'
import * as styles from './styles'
import './styles.css'
import { OptionsListProps } from './types'

const OptionsList = (props: OptionsListProps) => {
   const {
      onSelectionChange,
      selectedKeys,
      selectedItems,
      removedKeys,
      selectionMode = 'multiple',
      size = 'Medium',
      isSearchable = true,
      disallowEmptySelection,
      placeholder,

      noItemsViewClassName,
      optionContainerClassName,
      showSelectedValue,
      apiProps,

      containerClassNames = '',
      description,
      autoFocus,
      renderCustomDescription,
      creatableOptionProps,
      forceFetchMoreId,
      shouldFixMaxHeight = true,
      renderCustomInput,
      loadingContainerClassName = '',
      errorViewContainerClassName = '',
      enableClearAll,
      renderCustomClearAll,
      renderFooter,
      renderPrefixEnhancer,
      renderSuffixEnhancer,
      inputRef: propsInputRef
   } = props

   const [text, setText] = useState('')
   const internalInputRef = useRef<HTMLInputElement>(null)
   const inputRef = propsInputRef || internalInputRef

   const renderSelectedValue = () => {
      if (props.renderSelectedValue) return props.renderSelectedValue()
      if (!showSelectedValue) return null

      return selectedKeys.map(key => {
         const item = selectedItems.find(item => item.key === key)

         const onRemoveOption = () => {
            const filteredItems = selectedKeys.filter(item => item !== key)

            handleOnSelectionChange(filteredItems)
         }

         if (!item) return null

         return (
            <SelectedValueItem
               item={item}
               onRemoveOption={onRemoveOption}
               isClearable={props.shouldShowClearForSelectedTag}
               key={item.key}
            />
         )
      })
   }

   const onCreateItem = () => {
      list?.setFilterText('', 0)
      setCount(0)
      setText('')
   }

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
   }

   const renderClearAll = () => {
      if (selectedKeys.length === 0) return null
      if (!enableClearAll) return null

      return renderCustomClearAll ? (
         renderCustomClearAll()
      ) : (
         <div
            onClick={e => {
               e.stopPropagation()
               e.preventDefault()

               onSelectionChange([])
            }}
         >
            <XCloseIcon
               height={20}
               width={20}
               className='stroke-fg-quinary-400'
            />
         </div>
      )
   }

   const renderSearchInputAndSelectedTags = () => (
      <div
         className={cn(
            styles.inputAndSelectedTagsContainerStyles,
            props.inputContainerClassName
         )}
      >
         <div
            className={cn(
               styles.inputAndSelectedTagsAndClearContainerStyles,
               props.inputAndSelectedTagsAndClearContainerStyles
            )}
         >
            <SearchField
               className={cn(
                  styles.inputAndSelectedTagsNestedContainerStyles,
                  props.inputAndSelectedTagsNestedContainerStyles
               )}
            >
               {renderPrefixEnhancer?.()}
               {renderSelectedValue()}
               {renderCustomInput ? (
                  renderCustomInput({
                     onInputChange: onInputChange,
                     onKeyDown: onKeyDown,
                     value: text,
                     ref: inputRef
                  })
               ) : (
                  <RACInput
                     value={text}
                     onChange={e => onInputChange(e.target.value)}
                     className={cn(
                        styles.inputStyles,
                        'options-list-search-input'
                     )}
                     autoFocus={autoFocus}
                     ref={inputRef}
                     onKeyDown={onKeyDown}
                     onFocus={() => {
                        inputRef.current?.select()
                     }}
                     placeholder={selectedKeys.length > 0 ? '' : placeholder}
                  />
               )}
               {renderSuffixEnhancer?.()}
            </SearchField>
            {renderClearAll()}
         </div>
      </div>
   )

   const isInitialRender = useRef(true)

   const { list, isApiFailed, setCount, onApiRetry, onLoadMore } =
      useOptionsList({
         apiProps,
         items: props.items,
         text,
         isAsync: props.isAsync,
         removedKeys,
         disabledKeys: props.disabledKeys
      })

   useEffect(() => {
      if (isInitialRender.current) {
         isInitialRender.current = false

         return
      }

      list.setFilterText(text as string)
   }, [])

   useEffect(() => {
      forceFetchMoreId && onLoadMore()
   }, [forceFetchMoreId])

   //NOTE: Doing initial api call
   const [_initialized] = useState(() => {
      list.reload(0)
      return true
   })

   const debounce = (func: any, timeout = 300) => {
      let timer: NodeJS.Timeout | null = null

      return (...args: any) => {
         timer && clearTimeout(timer)

         timer = setTimeout(() => {
            func.apply(this, args)
         }, timeout)
      }
   }

   const debounceTime = props.isAsync ? 300 : 0

   const debounceInputChange = useRef(
      debounce(
         (value: string, itemsList: AsyncListData<ListItemType>): void => {
            setCount(0)
            itemsList.setFilterText(value, 0)
         },
         debounceTime
      )
   )

   const onInputChange = (value: string) => {
      setText(value)
      debounceInputChange.current(value, list)
   }

   const onScroll = (e: React.UIEvent) => {
      const scrollOffset =
         e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2

      if (e.currentTarget.scrollTop > scrollOffset) {
         onLoadMore()
      }
   }

   const handleOnSelectionChange = (value: string[]) => {
      onSelectionChange(value)

      if (selectionMode === 'multiple') inputRef.current?.focus()
   }

   const hasFilteredOptions = list.items.length > 0

   const isFilterTextMatchesWithItem =
      creatableOptionProps?.isCreatable &&
      hasFilteredOptions &&
      list.items.some(
         item => item.textValue.toLowerCase() === text.trim().toLowerCase()
      )

   const shouldRenderCreatableOption =
      creatableOptionProps?.isCreatable &&
      text.trim() &&
      !isFilterTextMatchesWithItem

   //NOTE: added this to render the create option in case the filter text not matches with items
   const shouldRenderListBox = !(
      !hasFilteredOptions &&
      creatableOptionProps?.isCreatable &&
      text.trim()
   )

   const renderErrorView = () => (
      <div
         className={cn(
            styles.errorViewContainerStyles,
            errorViewContainerClassName
         )}
      >
         <Button
            leftIcon={({ fill }) => (
               <Icon
                  type='OUTLINE'
                  id='refresh-ccw-01'
                  height={20}
                  width={20}
                  className={fill}
               />
            )}
            size='Small'
            onClick={onApiRetry}
            hierarchy={Hierarchy.Secondary}
            subVariant={SubVariant.GrayOutline}
            children={'Retry'}
         />
      </div>
   )

   const renderNoItemsView = () => {
      //NOTE: As the items are already available, but getting no items view, we are showing loading view
      if (list.items.length > 0) return renderLoadingView()

      return (
         props.renderNoItemsView?.(text) || (
            <NoSearchResultsView textClassName={noItemsViewClassName} />
         )
      )
   }

   const renderLoadingView = () => (
      <div
         className={cn(
            styles.loadingViewContainerStyles,
            loadingContainerClassName
         )}
      >
         <Loader className='fill-utility-brand-500' />
      </div>
   )

   const renderDescription = () =>
      renderCustomDescription ? (
         renderCustomDescription()
      ) : description ? (
         <span className={cn(styles.descriptionStyles, props.descriptionClass)}>
            {description}
         </span>
      ) : null

   const renderUIBasedOnStatus = () => {
      const showLoadingView =
         list.loadingState === 'loading' ||
         isInitialRender.current ||
         list.loadingState === 'filtering'

      const showErrorView = list.loadingState === 'error' || isApiFailed

      switch (true) {
         case showLoadingView:
            return renderLoadingView()
         case showErrorView:
            return renderErrorView()
         default:
            return shouldRenderListBox ? (
               <ListBoxItemContextProvider
                  renderCustomOption={
                     props.renderCustomOption as (
                        props: CustomOptionProps<ListItemType>
                     ) => ReactElement
                  }
               >
                  <ListBox
                     items={list.items}
                     onScroll={onScroll}
                     renderEmptyState={renderNoItemsView}
                     selectedKeys={selectedKeys}
                     selectionMode={selectionMode}
                     onSelectionChange={val => {
                        const items = Array.from(val)

                        handleOnSelectionChange(items as string[])
                     }}
                     selectionBehavior={'toggle'}
                     disallowEmptySelection={disallowEmptySelection}
                     disabledKeys={props.disabledKeys}
                     className={styles.optionsListContainerClassName}
                  >
                     {item => (
                        <ListBoxItem
                           key={item.key}
                           containerClassName={optionContainerClassName}
                           item={item}
                           // @ts-ignore
                           textValue={item.textValue}
                        >
                           {item.textValue}
                        </ListBoxItem>
                     )}
                  </ListBox>
               </ListBoxItemContextProvider>
            ) : null
      }
   }

   const renderUI = () => (
      <div
         style={{
            width: props.targetRef?.current?.clientWidth
         }}
         className={cn(
            styles.containerStyles,
            { '!max-h-[400px]': shouldFixMaxHeight },
            containerClassNames
         )}
      >
         {isSearchable ? renderSearchInputAndSelectedTags() : null}

         {props.renderPreOptionsSection?.()}

         {renderDescription()}
         {renderUIBasedOnStatus()}

         {renderFooter?.()}

         {shouldRenderCreatableOption ? (
            <CreateItem
               {...creatableOptionProps}
               text={text}
               hasFilteredOptions={hasFilteredOptions}
               onCreate={onCreateItem}
            />
         ) : null}

         {list.loadingState === 'loadingMore' ? (
            <div className='flex items-center justify-center py-md'>
               <Loader className='fill-utility-brand-500' />
            </div>
         ) : null}
      </div>
   )

   return isSearchable ? <Autocomplete>{renderUI()}</Autocomplete> : renderUI()
}

export default observer(OptionsList)
