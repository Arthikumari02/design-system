import cn from 'classnames'

export const closeIconContainerStyles = `
cursor-pointer 
flex-shrink-0
`

export const triggerContainerStyles = `
flex items-center justify-between 
focus:outline-none border border-primary
shadow-xs
cursor-pointer`

export const getTriggerContainerStyles = (isError: boolean) =>
   cn(
      `flex items-center justify-between 
focus:outline-none border shadow-xs
cursor-pointer bg-primary`,
      {
         'border-error focus:border-error focus:shadow-md': isError
      },
      {
         'border-primary focus:border-brand focus:shadow-md': !isError
      }
   )

export const placeholderTextStyles = `
text-md-regular text-placeholder
`

export const tooltipStyles = `
max-w-[200px] text-wrap
`

export const moreTextStyles = `
text-secondary-700 text-sm-regular
`

export const getRightIconContainerStyles = (isOpen: boolean) =>
   `${isOpen ? '-rotate-90' : 'rotate-90'} transition-transform duration-500`

export const rightIconsContainerStyles = `flex flex-row items-center`

export const selectedOptionContainerStyles = `
flex items-center justify-between gap-md
rounded-sm
border border-solid border-primary 
!truncate !max-w-[100px]
`

export const optionTextStyles = `
text-secondary-700 text-sm-medium truncate
`
export const selectedOptionsListContainerStyles = `
flex flex-row items-center gap-md
`

export const containerStyles = `bg-primary rounded-md border border-secondary shadow-lg overflow-hidden`

export const SelectedOptionContainerSizeStyles = {
   Small: 'pl-[5px] pr-xs py-[1px]',
   Medium: 'pl-[5px] pr-xs py-[1px]'
}

export const PlaceholderTextSizeStyles = {
   Small: 'text-md-regular text-placeholder truncate',
   Medium: 'text-md-regular text-placeholder truncate'
}
