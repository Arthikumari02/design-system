import { ReactElement, RefObject } from 'react'

import { SmallMediumAndLarge } from '../../types'

import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

interface ApiProps {
   isInfiniteScrollable: boolean
   shouldFetchMore?: boolean
   apiFunction: (
      page: number,
      filterText?: string,
      signal?: AbortSignal
   ) => Promise<any>
}

export interface CreatableOptionType {
   filterText: string
   hasFilteredOptions: boolean

   //NOTE: This should be triggered on success of create
   onCreate: () => void
}

export interface CreatableOptionProps {
   isCreatable: boolean
   onClickCreateOption?: (optionText: string, onCreate: () => void) => void
   createText?: string
   createOptionName?: (optionText: string) => React.ReactElement
   isLoading?: boolean
   onKeyDown?: (
      e: React.KeyboardEvent<HTMLInputElement>,
      hasFilteredOptions: boolean,
      filterText: string
   ) => void
   shouldNotCreateOnEnter?: boolean
   customCreatableOption?: (props: CreatableOptionType) => React.ReactElement
   getContainerStyles?: (hasFilteredOptions?: boolean) => string
}

export interface InputArgs {
   onInputChange: (value: string) => void
   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
   value: string
   ref: RefObject<HTMLInputElement>
}

export interface Item {
   key: string | number
   textValue: string
}

export interface OptionsListProps {
   targetRef?: React.RefObject<HTMLElement>
   inputRef?: React.RefObject<HTMLInputElement>

   renderFooter?: () => React.ReactElement
   selectedKeys: string[]
   disabledKeys?: string[]
   removedKeys?: string[]
   onSelectionChange: (keys: string[]) => void

   selectionMode?: 'single' | 'multiple'
   size?: SmallMediumAndLarge
   renderCustomOption?: (args: any) => ReactElement
   renderSelectedValue?: () => ReactElement
   renderNoItemsView?: (searchText?: string) => React.ReactElement
   renderPreOptionsSection?: () => React.ReactElement

   showSelectedValue?: boolean
   isSearchable?: boolean
   disallowEmptySelection?: boolean

   isAsync?: boolean

   apiProps?: ApiProps
   description?: string | null
   containerClassNames?: string
   items?: ListItemType[]
   noItemsViewClassName?: string
   optionContainerClassName?: string
   //NOTE: Selected items should be passed, if renderSelectedValue is not passed
   selectedItems: ListItemType[]
   autoFocus?: boolean
   creatableOptionProps?: CreatableOptionProps
   renderPrefixEnhancer?: () => ReactElement
   renderSuffixEnhancer?: () => ReactElement
   forceFetchMoreId?: string
   renderCustomInput?: (args: InputArgs) => ReactElement
   inputContainerClassName?: string
   inputAndSelectedTagsNestedContainerStyles?: string
   inputAndSelectedTagsAndClearContainerStyles?: string
   descriptionClass?: string
   shouldShowClearForSelectedTag?: boolean
   placeholder?: string
   shouldFixMaxHeight?: boolean
   renderCustomDescription?: () => React.ReactElement
   loadingContainerClassName?: string
   errorViewContainerClassName?: string
   renderCustomClearAll?: () => React.ReactElement
   enableClearAll?: boolean
}
