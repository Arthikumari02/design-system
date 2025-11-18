import { observer } from 'mobx-react'
import React from 'react'

import OptionsListWithTrigger, {
   OptionsListWithTriggerPropsType
} from '../OptionsListWithTrigger/OptionsListWithTrigger'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

interface Props<T extends ListItemType = ListItemType>
   extends Omit<
      OptionsListWithTriggerPropsType,
      'isAsync' | 'apiProps' | 'items' | 'isSearchable'
   > {
   items: T[]
}

const MultiSelectPicker = observer(
   (props: Props): React.ReactElement => (
      <OptionsListWithTrigger isAsync={false} {...props} isSearchable={false} />
   )
)

export { MultiSelectPicker }
