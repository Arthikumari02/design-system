import { useEffect, useState } from 'react'
import { useAsyncList } from './useAsyncList'

interface ApiProps {
   isInfiniteScrollable: boolean
   shouldFetchMore?: boolean
   apiFunction: (
      page: number,
      filterText?: string,
      signal?: AbortSignal
   ) => Promise<any>
}

interface Args {
   items?: { key: string | number; textValue: string }[]
   isAsync?: boolean
   apiProps?: ApiProps
   text: string
   removedKeys?: string[]
   disabledKeys?: string[]
}
interface Item {
   key: string | number
   textValue: string
}

const useOptionsList = (args: Args) => {
   const { items, isAsync, apiProps, text, removedKeys } = args

   const [isApiFailed, setIsApiFailed] = useState<boolean>(false)
   const [count, setCount] = useState<number>(0)
   const [filterData, setFilterData] = useState<any>({})

   if (isAsync) {
      if (!apiProps) {
         throw new Error(
            'AsyncPicker: apiProps is required when isAsync is true'
         )
      }
   }

   const list = useAsyncList<Item>({
      async load({ signal, filterText, defaultCount }) {
         let res = []

         if (!isAsync) {
            const filteredItems = filterText
               ? items?.filter(item =>
                    item.textValue
                       .toLowerCase()
                       .includes(filterText.toLowerCase().trim())
                 )
               : items

            return {
               items: filteredItems ?? []
            }
         }

         try {
            const shouldDoAPI =
               !(
                  filterData.filterText === filterText &&
                  !apiProps?.shouldFetchMore
               ) || defaultCount === 0

            if (shouldDoAPI) {
               const updatedCount =
                  defaultCount !== undefined ? defaultCount : count

               res = await apiProps?.apiFunction(updatedCount, filterText)
               setCount(updatedCount + 1)
               setFilterData({ filterText: filterText, data: res })
               setIsApiFailed(false)
            }
         } catch (error) {
            console.error(error)
            setIsApiFailed(true)
         }

         return {
            items: res ?? [],
            cursor: apiProps?.shouldFetchMore ? '' : undefined
         }
      },
      initialFilterText: text
      // enableCache,
      // setShouldInvalidate: props.setShouldInvalidate
   })

   useEffect(() => {
      removedKeys?.map(key => list.remove(key))
   }, [removedKeys])

   const onApiRetry = () => {
      setIsApiFailed(false)
   }

   const onLoadMore = (): void => {
      const fetchMore =
         apiProps?.isInfiniteScrollable && apiProps?.shouldFetchMore

      if (fetchMore) {
         list.loadMore()
      }
   }

   return {
      list,
      isApiFailed,
      count,
      setCount,
      setIsApiFailed,
      onApiRetry,
      onLoadMore
   }
}

export default useOptionsList
