import { Key } from '@react-types/shared'

export type ExtraSmallAndSmall = 'ExtraSmall' | 'Small'
export type SmallAndMedium = 'Small' | 'Medium'
export type BasicSize = 'ExtraSmall' | SmallAndMedium
export type SmallMediumAndLarge = SmallAndMedium | 'Large'
export type ExtendedSize =
   | BasicSize
   | 'Large'
   | 'ExtraLarge'
   | 'DoubleExtraLarge'

export type AvatarSize = ExtendedSize | 'DoubleExtraSmall' | 'TrebleExtraLarge'
export type AvatarGroupSize = BasicSize
export type AvatarLabelSize = SmallAndMedium | 'Large' | 'ExtraLarge'
export type ButtonSize = ExtendedSize

export type FocusRingVariant =
   | 'Primary'
   | 'Destructive'
   | 'Gray'
   | 'GraySecondary'
   | 'None'

export type Placement =
   | 'bottom'
   | 'bottom left'
   | 'bottom right'
   | 'bottom start'
   | 'bottom end'
   | 'top'
   | 'top left'
   | 'top right'
   | 'top start'
   | 'top end'
   | 'left'
   | 'left top'
   | 'left bottom'
   | 'start'
   | 'start top'
   | 'start bottom'
   | 'right'
   | 'right top'
   | 'right bottom'
   | 'end'
   | 'end top'
   | 'end bottom'

export interface SelectedItem {
   key: string
   name: string

   profilePicURL?: string
}

export interface CustomBadgeArgs {
   onRemove: (key: Key) => void
   item: any
}

export type HealthStatusType =
   | 'NOT_STARTED'
   | 'NOT_TRACKED'
   | 'ON_TRACK'
   | 'BEHIND'
   | 'AT_RISK'
   | 'ACHIEVED'
   | 'EXCEEDED'

/**
 * @deprecated Use common ListItemType instead
 */
export interface OptionsSelectorOptionType {
   id: string
   name: string
}
