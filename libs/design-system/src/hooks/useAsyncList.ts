/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

//@ts-nocheck
import { Key, Reducer, useEffect, useReducer } from 'react'
import { LoadingState, Selection, SortDescriptor } from '@react-types/shared'
import { createListActions, ListData, ListState } from './useListData'

export interface AsyncListOptions<T, C> {
   /** The keys for the initially selected items. */
   initialSelectedKeys?: Iterable<Key>
   /** The initial sort descriptor. */
   initialSortDescriptor?: SortDescriptor
   /** The initial filter text. */
   initialFilterText?: string
   /** A function that returns a unique key for an item object. */
   getKey?: (item: T) => Key
   /** A function that loads the data for the items in the list. */
   load: AsyncListLoadFunction<T, C>
   /**
    * An optional function that performs sorting. If not provided,
    * then `sortDescriptor` is passed to the `load` function.
    */
   setShouldInvalidate?: (
      shouldInvalidate: boolean,
      sectionKey?: string
   ) => void
   sort?: AsyncListLoadFunction<T, C>

   enableCache?: boolean
}

type AsyncListLoadFunction<T, C> = (
   state: AsyncListLoadOptions<T, C>
) => AsyncListStateUpdate<T, C> | Promise<AsyncListStateUpdate<T, C>>

interface AsyncListLoadOptions<T, C> {
   /** The items currently in the list. */
   items: T[]
   /** The keys of the currently selected items in the list. */
   selectedKeys: Selection
   /** The current sort descriptor for the list. */
   sortDescriptor: SortDescriptor
   /** An abort signal used to notify the load function that the request has been aborted. */
   signal: AbortSignal
   /** The pagination cursor returned from the last page load. */
   cursor?: C
   /** The current filter text used to perform server side filtering. */
   filterText?: string
   /** The current loading state of the list. */
   loadingState?: LoadingState

   defaultCount?: number
}

interface AsyncListStateUpdate<T, C> {
   /** The new items to append to the list. */
   items: Iterable<T>
   /** The keys to add to the selection. */
   selectedKeys?: Iterable<Key>
   /** The sort descriptor to set. */
   sortDescriptor?: SortDescriptor
   /** The pagination cursor to be used for the next page load. */
   cursor?: C
   /** The updated filter text for the list. */
   filterText?: string
}

interface AsyncListState<T, C> extends ListState<T> {
   state: LoadingState
   items: T[]
   // disabledKeys?: Iterable<Key>,
   selectedKeys: Selection
   // selectedKey?: Key,
   // expandedKeys?: Iterable<Key>,

   setShouldInvalidate?: (
      shouldInvalidate: boolean,
      sectionKey?: string
   ) => void

   sortDescriptor?: SortDescriptor
   error?: Error
   abortController?: AbortController
   cursor?: C
}

type ActionType =
   | 'success'
   | 'error'
   | 'loading'
   | 'loadingMore'
   | 'sorting'
   | 'update'
   | 'filtering'
interface Action<T, C> {
   type: ActionType
   items?: Iterable<T>
   selectedKeys?: Iterable<Key>
   sortDescriptor?: SortDescriptor
   error?: Error
   abortController?: AbortController
   updater?: (state: ListState<T>) => ListState<T>
   cursor?: C
   filterText?: string
}

export interface AsyncListData<T> extends ListData<T> {
   /** Whether data is currently being loaded. */
   isLoading: boolean
   /** If loading data failed, then this contains the error that occurred. */
   error?: Error
   // disabledKeys?: Set<Key>,
   // selectedKey?: Key,
   // expandedKeys?: Set<Key>,
   /** The current sort descriptor for the list. */
   sortDescriptor?: SortDescriptor

   /** Reloads the data in the list. */
   reload(defaultCount?: number): void
   /** Loads the next page of data in the list. */
   loadMore(): void
   /** Triggers sorting for the list. */
   sort(descriptor: SortDescriptor): void
   /** The current loading state for the list. */
   loadingState: LoadingState
}

/**
 * Manages state for an immutable async loaded list data structure, and provides convenience methods to
 * update the data over time. Manages loading and error states, pagination, and sorting.
 */
export function useAsyncList<T, C = string>(
   options: AsyncListOptions<T, C>
): AsyncListData<T> {
   const {
      load,
      sort,
      initialSelectedKeys,
      initialSortDescriptor,
      getKey = (item: any) => item.id || item.key,
      initialFilterText = '',
      enableCache = true
   } = options

   const [data, dispatch] = useReducer<
      Reducer<AsyncListState<T, C>, Action<T, C>>
   >(reducer, {
      state: 'idle',
      error: null,
      items: [],
      selectedKeys:
         initialSelectedKeys === 'all' ? 'all' : new Set(initialSelectedKeys),
      sortDescriptor: initialSortDescriptor,
      filterText: initialFilterText,
      setShouldInvalidate: options.setShouldInvalidate
   })

   function reducer<T, C>(
      data: AsyncListState<T, C>,
      action: Action<T, C>
   ): AsyncListState<T, C> {
      let selectedKeys
      switch (data.state) {
         case 'idle':
         case 'error':
            switch (action.type) {
               case 'loading':
               case 'loadingMore':
               case 'sorting':
               case 'filtering':
                  return {
                     ...data,
                     filterText: action.filterText ?? data.filterText,
                     state: action.type,
                     // Reset items to an empty list if loading, but not when sorting.
                     items: action.type === 'loading' ? [] : data.items,
                     sortDescriptor:
                        action.sortDescriptor ?? data.sortDescriptor,
                     abortController: action.abortController
                  }
               case 'update':
                  return {
                     ...data,
                     ...action.updater(data)
                  }
               case 'success':
               case 'error':
                  return data
               default:
                  throw new Error(
                     `Invalid action "${action.type}" in state "${data.state}"`
                  )
            }
         case 'loading':
         case 'sorting':
         case 'filtering':
            switch (action.type) {
               case 'success':
                  // Ignore if there is a newer abortcontroller in state.
                  // This means that multiple requests were going at once.
                  // We want to take only the latest result.
                  if (action.abortController !== data.abortController) {
                     return data
                  }

                  selectedKeys = action.selectedKeys ?? data.selectedKeys
                  return {
                     ...data,
                     filterText: action.filterText ?? data.filterText,
                     state: 'idle',
                     //@ts-ignore

                     items: [...action.items],
                     selectedKeys:
                        selectedKeys === 'all' ? 'all' : new Set(selectedKeys),
                     sortDescriptor:
                        action.sortDescriptor ?? data.sortDescriptor,
                     //@ts-ignore

                     abortController: null,
                     cursor: action.cursor
                  }
               case 'error':
                  if (action.abortController !== data.abortController) {
                     return data
                  }

                  return {
                     ...data,
                     state: 'error',
                     error: action.error,
                     //@ts-ignore

                     abortController: null
                  }
               case 'loading':
               case 'loadingMore':
               case 'sorting':
               case 'filtering':
                  // We're already loading, and another load was triggered at the same time.
                  // We need to abort the previous load and start a new one.
                  //@ts-ignore

                  data.abortController.abort()
                  return {
                     ...data,
                     filterText: action.filterText ?? data.filterText,
                     state: action.type,
                     // Reset items to an empty list if loading, but not when sorting.
                     items: action.type === 'loading' ? [] : data.items,
                     abortController: action.abortController
                  }
               case 'update':
                  // We're already loading, and an update happened at the same time (e.g. selectedKey changed).
                  // Update data but don't abort previous load.
                  return {
                     ...data,
                     //@ts-ignore

                     ...action.updater(data)
                  }
               default:
                  throw new Error(
                     `Invalid action "${action.type}" in state "${data.state}"`
                  )
            }
         case 'loadingMore':
            switch (action.type) {
               case 'success': {
                  selectedKeys =
                     data.selectedKeys === 'all' ||
                     action.selectedKeys === 'all'
                        ? 'all'
                        : new Set([
                             ...data.selectedKeys,
                             ...(action.selectedKeys ?? [])
                          ])
                  // Append the new items
                  const prevItems = enableCache ? data.items : []

                  return {
                     ...data,
                     state: 'idle',
                     //@ts-ignore
                     items: [...prevItems, ...action.items],
                     //@ts-ignore

                     selectedKeys,
                     sortDescriptor:
                        action.sortDescriptor ?? data.sortDescriptor,
                     //@ts-ignore

                     abortController: null,
                     cursor: action.cursor
                  }
               }
               case 'error':
                  if (action.abortController !== data.abortController) {
                     return data
                  }

                  return {
                     ...data,
                     state: 'error',
                     error: action.error
                  }
               case 'loading':
               case 'sorting':
               case 'filtering':
                  // We're already loading more, and another load was triggered at the same time.
                  // We need to abort the previous load more and start a new one.
                  //@ts-ignore

                  data.abortController.abort()
                  return {
                     ...data,
                     filterText: action.filterText ?? data.filterText,
                     state: action.type,
                     // Reset items to an empty list if loading, but not when sorting.
                     items: action.type === 'loading' ? [] : data.items,
                     abortController: action.abortController
                  }
               case 'loadingMore':
                  // If already loading more and another loading more is triggered, abort the new load more since
                  // it is a duplicate request since the cursor hasn't been updated.
                  // Do not overwrite the data.abortController
                  //@ts-ignore

                  action.abortController.abort()

                  return data
               case 'update':
                  // We're already loading, and an update happened at the same time (e.g. selectedKey changed).
                  // Update data but don't abort previous load.
                  return {
                     ...data,
                     //@ts-ignore

                     ...action.updater(data)
                  }
               default:
                  throw new Error(
                     `Invalid action "${action.type}" in state "${data.state}"`
                  )
            }
         default:
            throw new Error(`Invalid state "${data.state}"`)
      }
   }

   const dispatchFetch = async (
      action: Action<T, C>,
      fn: AsyncListLoadFunction<T, C>,
      defaultCount?: number
   ) => {
      const abortController = new AbortController()
      try {
         //@ts-ignore

         dispatch({ ...action, abortController })
         //@ts-ignore

         const previousFilterText = action.filterText ?? data.filterText

         const response = await fn({
            //@ts-ignore

            items: data.items.slice(),
            //@ts-ignore

            selectedKeys: data.selectedKeys,
            //@ts-ignore

            sortDescriptor: action.sortDescriptor ?? data.sortDescriptor,
            signal: abortController.signal,
            //@ts-ignore

            cursor: action.type === 'loadingMore' ? data.cursor : null,
            filterText: previousFilterText,
            defaultCount
         })

         const filterText = response.filterText ?? previousFilterText
         //@ts-ignore

         dispatch({ type: 'success', ...response, abortController })

         // Fetch a new filtered list if filterText is updated via `load` response func rather than list.setFilterText
         // Only do this if not aborted (e.g. user triggers another filter action before load completes)
         if (
            filterText &&
            filterText !== previousFilterText &&
            !abortController.signal.aborted
         ) {
            dispatchFetch({ type: 'filtering', filterText }, load)
         }
      } catch (e) {
         //@ts-ignore

         dispatch({ type: 'error', error: e, abortController })
      }
   }

   return {
      //@ts-ignore
      items: data.items,
      //@ts-ignore
      selectedKeys: data.selectedKeys,
      //@ts-ignore

      sortDescriptor: data.sortDescriptor,
      isLoading:
         //@ts-ignore

         data.state === 'loading' ||
         //@ts-ignore

         data.state === 'loadingMore' ||
         //@ts-ignore

         data.state === 'sorting' ||
         //@ts-ignore

         data.state === 'filtering',
      //@ts-ignore

      loadingState: data.state,
      //@ts-ignore

      error: data.error,
      //@ts-ignore

      filterText: data.filterText,
      getItem(key: Key) {
         //@ts-ignore

         return data.items.find(item => getKey(item) === key)
      },
      reload(defaultCount?: number) {
         dispatchFetch({ type: 'loading' }, load, defaultCount)
      },
      loadMore() {
         // Ignore if already loading more or if performing server side filtering.
         if (
            //@ts-ignore

            data.state === 'loadingMore' ||
            //@ts-ignore

            data.state === 'filtering' ||
            //@ts-ignore

            data.cursor === null
         ) {
            return
         }

         dispatchFetch({ type: 'loadingMore' }, load)
      },
      sort(sortDescriptor: SortDescriptor) {
         dispatchFetch({ type: 'sorting', sortDescriptor }, sort || load)
      },
      //@ts-ignore

      ...createListActions({ ...options, getKey, cursor: data.cursor }, fn => {
         //@ts-ignore

         dispatch({ type: 'update', updater: fn })
      }),
      setFilterText(filterText: string, defaultCount?: number) {
         dispatchFetch({ type: 'filtering', filterText }, load, defaultCount)
      }
   }
}
