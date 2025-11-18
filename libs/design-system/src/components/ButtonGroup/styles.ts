import { BUTTON_GROUP_THEME } from './ButtonGroupConstants'
import { ButtonGroupVariant, MenuOptionThemeStyles } from './types'

export const menuTriggerText = `text-sm-medium text-quarterary-500 truncate`
export const outlineButtonGroupContainerStyles = `
        flex flex-row
        items-center
        justify-between
        border border-solid border-primary
        
`
export const plainButtonGroupContainerStyles = `
        flex flex-row
        items-center
        justify-between
`

export const outlineSelectedValueContainer = `flex items-center grow overflow-hidden border-r border-primary`
export const plainSelectedValueContainer = `flex items-center grow overflow-hidden border-r border-transparent`
export const triggerIconContainerStyles = `h-full flex justify-center items-center cursor-pointer`

export const iconVariantTriggerContainerStyles = `!rounded-xs p-xs_border-1 cursor-pointer border border-transparent`

export const optionContainerStyles = `
   grow
   flex items-center justify-start
   overflow-hidden,
   cursor-pointer
   gap-x-md
   hover:bg-primary_hover
`

export const IconWrapperStyles = 'shrink-0'
export const CheckIconStyles = 'ml-common-sm-8'
export const RightIconWrapperStyles = 'shrink-0'

export const optionTextStyles = `flex-grow truncate`

export const optionsListStyles =
   'max-h-[222px] menu-options-list-scrollbar gap-y-xxs flex flex-col'

export const getMenuOptionThemeStyles = (
   variant: ButtonGroupVariant
): MenuOptionThemeStyles => {
   try {
      return BUTTON_GROUP_THEME[variant]
   } catch {
      throw new Error(
         `Variant: ${variant}  Doesn't Exit. You can add this in the theme config.`
      )
   }
}
