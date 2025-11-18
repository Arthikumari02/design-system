import { CSSProperties, ReactNode } from 'react'
import { SelectProps as RACSelectProps } from 'react-aria-components'

import { SmallAndMedium, FocusRingVariant } from '../../../types'

import { CustomOptionProps, ListItemType } from '../ListBoxItem/types'

export interface ValueContainerState {
   selectedText: string | null
}

interface MySelectProps<T extends ListItemType = ListItemType>
   extends Omit<RACSelectProps<T>, 'children'> {
   label?: ReactNode
   items?: Iterable<T>
   children?: React.ReactNode | ((item: T) => React.ReactNode)
}

export interface SelectProps<T extends ListItemType = ListItemType>
   extends MySelectProps<T> {
   direction?: 'bottom' | 'top'
   align?: 'start' | 'end'
   shouldFlip?: boolean
   focusRingVariant?: FocusRingVariant
   errorMessage?: ReactNode
   hint?: React.ReactNode
   size?: SmallAndMedium
   shouldShowClearButton?: boolean
   shouldOpenPopoverOnLabelClick?: boolean
   showLabel?: boolean
   isRequired?: boolean
   dataTestId?: string
   labelClassName?: string
   hintClassName?: string
   containerClassName?: string
   inputButtonTextClassName?: string
   buttonClassName?: string
   popOverStyles?: CSSProperties
   selectButtonRightIconHeight?: number
   selectButtonRightIconWidth?: number
   renderCustomOption?: (props: CustomOptionProps<T>) => React.ReactElement
   renderRequiredIcon?: () => React.ReactElement
   renderValueContainer?: (state: ValueContainerState) => React.ReactNode
   renderLeftIcon?: () => React.ReactNode
   showSelectButtonRightIcon?: boolean
   selectButtonClassName?: string
   listboxClassName?: string
}
