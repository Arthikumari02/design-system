import cn from 'classnames'

export const getMonthTitleStyles = (sizing: any) =>
   `${sizing.monthTitleSize} text-secondary-700`

export const getButtonStyles = ({ isDisabled }: { isDisabled: boolean }) =>
   cn('outline-none focus:bg-primary_hover p-md rounded-full', {
      'cursor-not-allowed': isDisabled,
      'cursor-pointer': !isDisabled,
      'hover:bg-primary_hover': !isDisabled
   })
