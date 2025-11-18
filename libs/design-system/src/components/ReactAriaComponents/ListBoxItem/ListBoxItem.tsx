import cn from 'classnames'
import React from 'react'
import {
   ListBoxItemRenderProps,
   ListBoxItem as RACListBoxItem
} from 'react-aria-components'

import { TickMark } from '../../../icons/TickMark'
import { useListBoxItemContext } from './Context/Provider'
import {
   LIST_BOX_OPTION_THEME,
   getListBoxOptionStyles,
   optionStyles
} from './styles'
import { ListItemType } from './types'

interface CustomListBoxItemProps<Item extends ListItemType>
   extends ListBoxItemRenderProps {
   children: React.ReactNode
   item: Item
   containerClassName?: string
}

function ListBoxItem<T extends ListItemType>(props: CustomListBoxItemProps<T>) {
   const { containerClassName = '' } = props

   const { renderCustomOption } = useListBoxItemContext()

   const getListBoxOptionStylesV1 = (args: ListBoxItemRenderProps) => {
      const { isSelected, isFocused, isDisabled, isHovered } = args
      const listBoxOptionStyles = getListBoxOptionStyles({
         isFocused,
         isHovered,
         isSelected,
         isDisabled
      })

      return cn(
         'border-none',
         listBoxOptionStyles,
         optionStyles,
         'list-box-option',
         containerClassName
      )
   }

   const renderTickIcon = () => (
      <div className='self-end ml-md'>
         <TickMark
            className={LIST_BOX_OPTION_THEME.selected.tickColor}
            width={18}
            height={18}
         />
      </div>
   )

   return (
      <RACListBoxItem
         {...props}
         textValue={props.item.textValue}
         className={getListBoxOptionStylesV1}
         id={props.item.key}
      >
         {args =>
            renderCustomOption ? (
               renderCustomOption({ ...props, ...args })
            ) : (
               <div
                  className='flex flex-row justify-between flex-1 items-center w-full truncate'
                  title={props.item.textValue}
               >
                  <div className={'w-[75%] truncate flex-1'}>
                     {props.children}
                  </div>
                  {args.isSelected ? renderTickIcon() : null}
               </div>
            )
         }
      </RACListBoxItem>
   )
}

export default ListBoxItem
