export type ActionVariantType = 'Neutral' | 'Destructive'

export interface MenuOptionType {
   label: string
   value: string
   variant: ActionVariantType

   onClick: (value: string, event?: React.MouseEvent) => void
   renderLeftIcon?: () => React.ReactElement
   renderRightIcon?: () => React.ReactElement

   isDisabled?: boolean
   shouldShowSeparator?: boolean
}
