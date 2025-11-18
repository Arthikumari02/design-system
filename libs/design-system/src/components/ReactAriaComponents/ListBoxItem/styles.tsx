import cn from 'classnames'

export const LIST_BOX_OPTION_THEME = {
   selected: {
      backgroundColor: 'bg-active',
      textColor: 'text-primary-900',
      tickColor: 'fill-fg-brand-primary-600'
   },
   focused: { backgroundColor: 'bg-active', textColor: 'text-primary-900' },
   hovered: {
      backgroundColor: 'bg-primary_hover',
      textColor: 'text-primary-900'
   },
   disabled: {
      backgroundColor: 'bg-secondary_subtle',
      textColor: 'text-disabled'
   },
   default: {
      backgroundColor: 'bg-primary',
      textColor: 'text-primary-900'
   }
}

interface ListBoxOptionState {
   isHovered: boolean
   isDisabled?: boolean
   isSelected: boolean
   isFocused: boolean
}

export const getListBoxOptionStyles = ({
   isHovered,
   isDisabled,
   isSelected,
   isFocused
}: ListBoxOptionState) =>
   cn(
      `flex items-center outline-none cursor-pointer`,
      {
         [`${LIST_BOX_OPTION_THEME.focused.backgroundColor} ${LIST_BOX_OPTION_THEME.focused.textColor}`]:
            isFocused
      },
      {
         [`${LIST_BOX_OPTION_THEME.default.backgroundColor} ${LIST_BOX_OPTION_THEME.default.textColor}`]:
            !isFocused && !isDisabled && !isSelected && !isHovered
      },
      {
         [`${LIST_BOX_OPTION_THEME.disabled.backgroundColor} ${LIST_BOX_OPTION_THEME.disabled.textColor} !cursor-default`]:
            isDisabled
      },
      {
         [`${LIST_BOX_OPTION_THEME.selected.backgroundColor} ${LIST_BOX_OPTION_THEME.selected.textColor}`]:
            isSelected
      },
      {
         [`${LIST_BOX_OPTION_THEME.hovered.backgroundColor} ${LIST_BOX_OPTION_THEME.hovered.textColor}`]:
            isHovered || isFocused
      }
   )

export const optionStyles = `text-sm-medium py-xs px-sm rounded-sm`
