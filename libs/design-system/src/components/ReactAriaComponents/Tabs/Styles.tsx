import cn from 'classnames'

export const tabsListStyles = `
flex gap-x-lg border-b border-secondary w-full
`

export const getTabStyles = (
   tabSize: any,
   isSelected: boolean,
   isHovered: boolean,
   isDisabled: boolean,
   shouldShowHoverStyle: boolean
) => {
   const textColor = isDisabled
      ? 'text-disabled'
      : isSelected
        ? 'text-brand-secondary-700'
        : shouldShowHoverStyle && isHovered
          ? 'text-brand-secondary-700'
          : 'text-quarterary-500'

   return cn(
      `relative box-border no-underline whitespace-nowrap outline-none cursor-pointer ${textColor}`,
      tabSize.typography,
      'px-xs pb-lg pt-sm'
   )
}

export const iconClassName = 'w-[20px] h-[20px] shrink-0'
