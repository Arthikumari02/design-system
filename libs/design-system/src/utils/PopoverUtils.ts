import cn from 'classnames'

export const defaultPopoverStyles = `
   bg-primary
   border !border-secondary rounded-xl
   shadow-xl
   `

export const getPopoverStyles = (
   placement: string,
   isOpen?: boolean,
   popoverClassName?: string
) =>
   cn(
      defaultPopoverStyles,
      popoverClassName,
      'popover-animation',
      `popover-animation--${placement}`,
      `popover-scrollbar`,
      {
         'is-open': isOpen
      }
   )
