import { ComboBoxProps } from 'react-aria-components'
import { CSSProperties, ReactNode } from 'react'

import { FocusRingVariant, SmallAndMedium } from '../../../types'

import { CreatableOptionProps } from '../../OptionsList/types'

import { CustomOptionProps, ListItemType } from '../ListBoxItem/types'

interface ComboboxUIConfigProps<T extends ListItemType> {
   renderNoResults?: () => React.ReactNode
   renderLeftIcon?: () => React.ReactNode
   renderRightIcon?: () => React.ReactNode

   renderCustomOption?: (args: CustomOptionProps<T>) => React.ReactElement

   renderCustomLoading?: () => React.ReactNode
   renderCustomError?: (onApiRetry: () => void) => React.ReactNode
}

export interface ComboboxProps<T extends ListItemType = ListItemType>
   extends ComboBoxProps<T>,
      ComboboxUIConfigProps<T> {
   label?: ReactNode
   size?: SmallAndMedium
   hint?: React.ReactNode
   errorMessage?: ReactNode
   placeholder?: string
   focusRingVariant?: FocusRingVariant

   popOverStyles?: CSSProperties
   labelClassName?: string
   listboxClassName?: string
   leftIconContainerClassName?: string
   inputClassName?: string
   renderRequiredIcon?: () => React.ReactElement

   isClearable?: boolean

   listState?: {
      isApiFailed: boolean
      onApiRetry: () => void
      onLoadMore: () => void
      loadingState: string
      initializeList: (text?: string) => void
   }
   creatableOptionProps?: CreatableOptionProps
   //NOTE: This prop is used to check if the list has been initialized or not, need not pass this from outside
   isListInitializedRef?: React.MutableRefObject<boolean>
}

export { Key as SharedKeyType } from '@react-types/shared'
