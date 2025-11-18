import { MenuOptionType } from './types'

const getOptionTextColor = (option: MenuOptionType): string => {
   if (option.isDisabled) return 'text-disabled'

   switch (option.variant) {
      case 'Destructive':
         return 'text-error-primary-600'
      case 'Neutral':
         return 'text-primary-900'
      default:
         return 'text-primary-900'
   }
}

export const menuIconStyles = `
        hover:button-tertiary-bg_hover w-full p-md rounded-md
        flex
        items-center
        justify-center
        cursor-pointer
`

export const popoverBodyContainerClassName = `w-[250px] h-fit-content py-xs_border-1 !shadow-lg`

export const getOptionContainerStyles = (
   optionProps: MenuOptionType
): string => `w-full flex items-center justify-between hover:bg-active px-md py-[10px] hover:rounded-sm overflow-hidden

${optionProps.isDisabled ? 'pointer-events-none' : 'cursor-pointer'}
${optionProps.shouldShowSeparator ? 'mt-[1px]' : ''}
   
   `

export const getOptionWrapperStyles = (optionProps: MenuOptionType): string =>
   `w-full px-sm_border-1  ${optionProps.shouldShowSeparator ? 'mt-[1px] border-t border-secondary' : ''} 
   
   ${optionProps.isDisabled ? 'cursor-not-allowed' : ''}
   `

export const IconWrapperStyles = 'mr-md shrink-0'
export const RightIconWrapperStyles = 'shrink-0 ml-md'

export const getOptionTextStyles = (optionProp: MenuOptionType): string =>
   `text-sm-medium flex-grow truncate ${getOptionTextColor(optionProp)}`

export const bodyContainerStyles = `
w-full max-h-[249px]
actions-list-scrollbar
`
