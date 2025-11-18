interface CommonCellClassNameArgs {
   isDisabled: boolean
   isTodayDate: boolean
}

const getCommonCellClassName = (args: CommonCellClassNameArgs) => {
   const commonClassName = `w-full h-full 
   flex items-center justify-center rounded-full 
   ${args.isDisabled ? 'cursor-default text-disabled' : 'cursor-pointer'}
   ${args.isTodayDate ? 'bg-active' : ''}`

   return commonClassName
}

interface CellClassNameArgs extends CommonCellClassNameArgs {
   selectionState: 'none' | 'middle' | 'cap'
}

export const getRCCellClassNames = (args: CellClassNameArgs) => {
   const commonClassName = getCommonCellClassName({
      isDisabled: args.isDisabled,
      isTodayDate: args.isTodayDate
   })

   let selectionStateClassName = ''

   switch (args.selectionState) {
      case 'none': {
         if (!args.isDisabled) {
            selectionStateClassName =
               'text-secondary-700 hover:bg-primary_hover hover:text-secondary_hover focus:bg-primary_hover'
         }
         break
      }
      case 'middle':
         selectionStateClassName = 'bg-brand-secondary text-secondary-700'
         break
      case 'cap':
         selectionStateClassName = 'bg-brand-solid text-primary_on-brand'
         break

      default:
         break
   }
   return `${commonClassName} ${selectionStateClassName}`
}

interface CalendarCellClassNameArgs extends CommonCellClassNameArgs {
   isSelected: boolean
}

export const calendarCellClassName = (args: CalendarCellClassNameArgs) => {
   const commonClassName = getCommonCellClassName({
      isDisabled: args.isDisabled,
      isTodayDate: args.isTodayDate
   })

   const selectionStateClassName = args.isSelected
      ? 'bg-brand-solid text-primary_on-brand'
      : args.isDisabled
        ? ''
        : 'text-secondary-700 hover:bg-primary_hover hover:text-secondary_hover focus:bg-primary_hover'

   return `${commonClassName} ${selectionStateClassName}`
}

interface CellContainerClassNameArgs {
   isSelectionStart: boolean
   isSelectionEnd: boolean
   isSelected: boolean
   sizes: any
}

export const getRCCellContainerClassName = (args: CellContainerClassNameArgs) =>
   `group w-[40px] h-[40px] outline-0 relative
[td:first-child_&]:rounded-s-full selection-start:rounded-s-full 
[td:last-child_&]:rounded-e-full selection-end:rounded-e-full 
${args.isSelected ? 'bg-brand-secondary' : ''}
${args.isSelectionStart ? 'rounded-s-full' : ''}
${args.isSelectionEnd ? 'rounded-e-full' : ''}
${args.isSelected || args.isSelectionStart || args.isSelectionEnd ? args.sizes.textMedium : args.sizes.textRegular}`

export const calendarCellContainerClassName =
   'group w-[40px] h-[40px] outline-0 relative rounded-full'
