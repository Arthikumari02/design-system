import classNames from 'classnames'
import { format } from 'date-fns'
import { observer } from 'mobx-react'
import React from 'react'

import { defaultDateTimeFormat } from '../../../constants/DateTimeConstants'
import { CalenderIcon } from '../../../icons/CalenderIcon'
import { CloseIcon } from '../../../icons/CloseIcon'
import { BasicSize } from '../../../types'

import {
   dateFieldTriggerThemeStyles,
   getDateFieldTriggerSizingStyles
} from '../common/styles/styles'

export function getDateFromDateObject(
   date: Date | null,
   customFormat: string
): string {
   if (date && customFormat) {
      return format(date, customFormat)
   }
   return ''
}

interface Props {
   className?: string
   isDisabled: boolean
   size?: BasicSize
   shouldShowCloseButton?: boolean
   onClickCloseIcon?: () => void
   value?: Date | null
   placeholderText?: string
   customFormat?: string
}

const DateAndTimeTrigger = (props: Props): React.ReactElement => {
   const {
      className,
      size = 'Small',
      isDisabled,
      onClickCloseIcon,
      shouldShowCloseButton,
      value,
      placeholderText = 'Select Date Time',
      customFormat = defaultDateTimeFormat
   } = props

   const formattedDate = getDateFromDateObject(value ?? null, customFormat)

   const onClickClose = e => {
      e.stopPropagation()
      e.preventDefault()
      onClickCloseIcon?.()
   }

   return (
      <div
         className={classNames(
            dateFieldTriggerThemeStyles(isDisabled),
            getDateFieldTriggerSizingStyles(size),
            'items-center w-full border border-primary',
            { 'cursor-not-allowed': isDisabled },
            className
         )}
      >
         <div className={'flex items-center justify-between w-full'}>
            <div className='flex items-center justify-center truncate'>
               <div className='mr-md'>
                  <CalenderIcon
                     className={
                        isDisabled ? 'stroke-fg-disabled' : 'stroke-gray-500'
                     }
                  />
               </div>
               <p
                  className={classNames({
                     'text-primary-900 text-sm-medium': value,
                     'text-placeholder text-sm-regular truncate': !value,
                     '!text-disabled': isDisabled
                  })}
               >
                  {value ? formattedDate : placeholderText}
               </p>
            </div>
            {value && shouldShowCloseButton ? (
               <button
                  className='p-md ml-sm'
                  onClick={onClickClose}
                  onPointerDown={e => e.stopPropagation()}
                  tabIndex={-1}
               >
                  <CloseIcon
                     width={12}
                     height={12}
                     svgClassName='fill-gray-600'
                  />
               </button>
            ) : null}
         </div>
      </div>
   )
}

export default observer(DateAndTimeTrigger)
