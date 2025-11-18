import { observer } from 'mobx-react'
import React from 'react'

import OptionsListWithTrigger, {
   OptionsListWithTriggerPropsType
} from '../OptionsListWithTrigger/OptionsListWithTrigger'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

interface Props<T extends ListItemType = ListItemType>
   extends Omit<
      OptionsListWithTriggerPropsType,
      'isAsync' | 'apiProps' | 'items'
   > {
   items: T[]
}

const MultiSelectComboBox = observer((props: Props): React.ReactElement => {
   const { renderCustomSelectedOption, autoFocus = true, ...rest } = props

   const renderSelectedValue = (): React.ReactElement => (
      <>{props.selectedItems.map(each => renderCustomSelectedOption?.(each))}</>
   )

   return (
      <OptionsListWithTrigger
         isAsync={false}
         renderSelectedValue={
            renderCustomSelectedOption ? renderSelectedValue : undefined
         }
         renderCustomSelectedOption={renderCustomSelectedOption}
         autoFocus={autoFocus}
         {...rest}
      />
   )
})

export { MultiSelectComboBox }
