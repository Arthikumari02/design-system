import classNames from 'classnames'

export const getPickerButtonClass = (
   isError: boolean,
   isDisabled?: boolean,
   isOpen?: boolean
) =>
   classNames(
      `flex items-center focus:outline-none w-full border shadow-xs truncate`,
      {
         '!text-disabled !border-disabled !bg-disabled_subtle ': isDisabled
      },
      {
         [`text-primary`]: !isDisabled
      },
      {
         [`border-error focus:border-error focus:shadow-md`]: isError
      },
      {
         [`border-primary focus:border-brand focus:shadow-md`]: !isError
      },
      {
         [`border-primary focus:border-brand`]: isOpen && !isError
      },
      {
         [`border-error focus:border-error`]: isOpen && isError
      }
   )

export const getFocusRingClass = (isFocusWithin: boolean, isInvalid: boolean) =>
   classNames(
      { 'ring-4 ring-error': isFocusWithin && isInvalid },
      { 'ring-4 ring-brand': isFocusWithin && !isInvalid }
   )
