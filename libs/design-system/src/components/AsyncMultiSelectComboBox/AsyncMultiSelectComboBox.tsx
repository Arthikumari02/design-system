import OptionsListWithTrigger, {
   OptionsListWithTriggerPropsType
} from '../OptionsListWithTrigger/OptionsListWithTrigger'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

type OmittedPropsType = Omit<
   OptionsListWithTriggerPropsType,
   'renderSelectedValue'
>

interface Props extends OmittedPropsType {
   renderCustomSelectedOption?: (
      item: ListItemType,
      isInPopover?: boolean
   ) => React.ReactElement
}

export const AsyncMultiSelectComboBox = (props: Props) => {
   const {
      showSelectedValue = true,
      renderCustomSelectedOption,
      ...rest
   } = props

   const renderSelectedValue = (): React.ReactElement => (
      <>
         {props.selectedItems.map(each =>
            renderCustomSelectedOption?.(each, true)
         )}
      </>
   )

   return (
      <OptionsListWithTrigger
         showSelectedValue={showSelectedValue}
         renderSelectedValue={
            renderCustomSelectedOption ? renderSelectedValue : undefined
         }
         renderCustomSelectedOption={renderCustomSelectedOption}
         {...rest}
      />
   )
}
