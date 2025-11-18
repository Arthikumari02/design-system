import { observer } from 'mobx-react'
import cn from 'classnames'

import XIcon2 from '../../icons/XIcon2/XIcon2'

import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

import * as styles from './styles'

interface Props {
   item: ListItemType
   onRemoveOption: () => void
   isClearable?: boolean
}

const SelectedValueItem = (props: Props) => {
   const { item, onRemoveOption, isClearable = true } = props

   return (
      <div
         className={cn(
            styles.selectedItemTagContainerStyles,
            `${isClearable ? 'pr-xs' : 'pr-[10px]'}`
         )}
         key={item.key}
      >
         <p className={styles.selectedItemTagTextStyles} title={item.textValue}>
            {item.textValue}
         </p>
         {isClearable ? (
            <div onClick={onRemoveOption} className={'cursor-pointer'}>
               <XIcon2 width={20} height={20} className='fill-fg-quinary-400' />
            </div>
         ) : null}
      </div>
   )
}

export default observer(SelectedValueItem)
