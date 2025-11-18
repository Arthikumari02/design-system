import { useCallback, useState } from 'react'
import { ComboBox as RACComboBox } from 'react-aria-components'

import { ListItemType } from '../ListBoxItem/types'

import ComboBoxBaseContent from './components/ComboBoxBaseContent'
import './styles.css'
import { ComboboxProps } from './types'

const ComboBox = <T extends ListItemType = ListItemType>(
   props: ComboboxProps<T>
) => {
   const [isFocused, setIsFocused] = useState(false)

   const onFocusChange = useCallback(
      (isFocused: boolean) => {
         setIsFocused(isFocused)
         props.onFocusChange?.(isFocused)
      },
      [setIsFocused, props.onFocusChange]
   )

   return (
      <RACComboBox
         {...props}
         onFocusChange={onFocusChange}
         isInvalid={Boolean(props.errorMessage)}
      >
         {args => (
            <ComboBoxBaseContent
               {...args}
               comboboxProps={props}
               isFocused={isFocused}
               isListInitializedRef={props.isListInitializedRef}
            />
         )}
      </RACComboBox>
   )
}

export { ComboBox }
