import { useRef } from 'react'
import { MenuTriggerAction } from '@react-types/combobox'

import useOptionsList from '../../../hooks/useOptionsList'

import { ListItemType } from '../ListBoxItem/types'

import { ComboBox } from './ComboBox'
import { ComboboxProps } from './types'

export interface EnhancedComboboxProps<T extends ListItemType>
   extends ComboboxProps<T> {
   apiProps: {
      isInfiniteScrollable: boolean
      shouldFetchMore?: boolean
      apiFunction: (
         page: number,
         filterText?: string,
         signal?: AbortSignal
      ) => Promise<any>
   }
   removedKeys?: string[]
}

const AsyncComboBox = <T extends ListItemType>(
   props: EnhancedComboboxProps<T>
) => {
   const { apiProps, removedKeys, ...otherProps } = props

   // Initialize useOptionsList with input value tracking
   const { list, isApiFailed, onApiRetry, onLoadMore } = useOptionsList({
      apiProps,
      text: props.inputValue ?? '',
      isAsync: true,
      removedKeys
   })

   const initializeList = async (text = '', defaultCount = 0) => {
      // Reset to page 0 and load initial data
      await list.setFilterText(text, defaultCount)
   }

   // Create debounced input handler
   const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout
      return (...args: any[]) => {
         clearTimeout(timeout)
         timeout = setTimeout(() => func(...args), wait)
      }
   }

   // Handle input changes with debouncing
   const debounceInputChange = useRef(
      debounce((value: string) => {
         list.setFilterText(value, 0) // Reset to page 0 when filter text changes
      }, 500)
   )

   const onInputChange = (value: string) => {
      debounceInputChange.current(value)
      props.onInputChange?.(value)
   }

   const isListInitialized = useRef(false)

   const onOpenChange = (
      isOpen: boolean,
      menuTrigger?: MenuTriggerAction | undefined
   ): void => {
      props.onOpenChange?.(isOpen, menuTrigger)

      if (isOpen) {
         if (menuTrigger === 'manual') {
            isListInitialized.current = true
            initializeList(props.inputValue ?? '', 0)
         }
      }
   }

   return (
      <ComboBox
         {...otherProps}
         onInputChange={onInputChange}
         onOpenChange={onOpenChange}
         listState={{
            isApiFailed,
            onApiRetry,
            onLoadMore,
            loadingState: list.loadingState,
            initializeList
         }}
         isListInitializedRef={isListInitialized}
         items={list.items as T[]}
      />
   )
}

export { AsyncComboBox }
