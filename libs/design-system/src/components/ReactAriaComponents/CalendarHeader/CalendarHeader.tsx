import cn from 'classnames'
import { Button, Heading, useLocale } from 'react-aria-components'

import { ChevronLeftIcon } from '../../../icons/ChevronLeftIcon'
import { ChevronRightIcon } from '../../../icons/ChevronRightIcon'
import { BasicSize } from '../../../types'
import { datePickerSizes } from './sizes'
import * as Styles from './styles'

interface Props {
   size: BasicSize
}

export function CalendarHeader(props: Props) {
   const { size } = props
   const { direction } = useLocale()
   const datePickerSize = datePickerSizes[size]

   const getIconFillColor = (isDisabled: boolean) =>
      isDisabled ? 'stroke-fg-disabled' : 'stroke-button-secondary-fg'

   return (
      <header className='flex items-center justify-between gap-1 pb-md w-full'>
         <Heading className={cn(Styles.getMonthTitleStyles(datePickerSize))} />
         <div className='flex items-center gap-x-md'>
            <Button slot='previous' className={Styles.getButtonStyles}>
               {({ isDisabled }) => {
                  const iconColor = getIconFillColor(isDisabled)

                  return direction === 'rtl' ? (
                     <ChevronRightIcon className={iconColor} />
                  ) : (
                     <ChevronLeftIcon className={iconColor} />
                  )
               }}
            </Button>
            <Button slot='next' className={Styles.getButtonStyles}>
               {({ isDisabled }) => {
                  const iconColor = getIconFillColor(isDisabled)

                  return direction === 'rtl' ? (
                     <ChevronLeftIcon className={iconColor} />
                  ) : (
                     <ChevronRightIcon className={iconColor} />
                  )
               }}
            </Button>
         </div>
      </header>
   )
}
