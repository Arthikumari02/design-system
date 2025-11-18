import { ListBoxItemRenderProps } from 'react-aria-components'

export interface ListItemType {
   key: string | number
   textValue: string
}
export interface CustomOptionProps<Item extends ListItemType>
   extends ListBoxItemRenderProps {
   item: Item
}
