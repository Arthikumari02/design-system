import cn from 'classnames'

import { SmallAndMedium } from '../../../types'

import { placeholderTextSizes, sizes } from './sizes'

export const getButtonTextStyles = () => cn(`max-w-full truncate pr-4xl`)

export const getSelectButtonClass = (
   isError: boolean,
   isDisabled?: boolean,
   isOpen?: boolean
) =>
   cn(
      `flex items-center justify-between focus:outline-none w-full border shadow-xs bg-primary`,
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

export const getSelectSizeClasses = (size: SmallAndMedium) => cn(sizes[size])

export const getPlaceholderStyles = (size: SmallAndMedium) =>
   cn(`text-placeholder ${placeholderTextSizes[size]} text-left pr-4xl`)

export const clearIconContainerClassName = `absolute top-1/2 -translate-y-1/2 right-10 cursor-pointer`

export const popoverContainerClassName = `
   w-[--trigger-width]
   border border-secondary rounded-md 
   bg-primary 
   shadow-lg 
   !py-0 
   overflow-hidden
`

export const localListBoxClassName = `
   outline-none 
   max-h-[260px] 
   overflow-auto 
   select-listbox
   flex flex-col gap-xs px-sm py-xs
`

export const chevronRightIconClassName = `
   transform transition-transform duration-500 
   shrink-0 
`
