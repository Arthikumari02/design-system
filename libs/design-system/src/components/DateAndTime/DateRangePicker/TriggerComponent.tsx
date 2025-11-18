import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import {
   Button,
   DateRangePickerStateContext,
   Group
} from 'react-aria-components'

import ArrowRightIcon from '../../../icons/ArrowRightIcon'
import { CalenderIcon } from '../../../icons/CalenderIcon'
import { BasicSize } from '../../../types'

import { CloseIcon } from '../../../icons/CloseIcon'
import DateInput from '../../ReactAriaComponents/DateInput/DateInput'
import FieldGroup from '../../ReactAriaComponents/FieldGroup/FieldGroup'

interface Props {
   size: BasicSize
   isDisabled?: boolean
   isReadOnly?: boolean
   shouldShowClearButton?: boolean
   renderCustomTrigger?: (isOpen: boolean) => React.ReactElement
}

const TriggerComponent = (props: Props) => {
   const {
      size,
      renderCustomTrigger,
      shouldShowClearButton,
      isDisabled,
      isReadOnly
   } = props

   const state = useContext(DateRangePickerStateContext)

   if (renderCustomTrigger) {
      return (
         <Group>
            <Button className='outline-none'>
               {renderCustomTrigger(Boolean(state?.isOpen))}
            </Button>
         </Group>
      )
   }

   const isValueExists = !!state?.dateRange || !!state?.timeRange

   const shouldRenderClearIcon =
      shouldShowClearButton && isValueExists && !isReadOnly && !isDisabled

   const iconClassName =
      isDisabled || !isValueExists || isReadOnly
         ? 'stroke-fg-disabled'
         : 'stroke-button-secondary-fg'

   const onClickClear = () => {
      state?.setValue(null)
   }

   return (
      <FieldGroup size={size}>
         <Button className='mr-xs outline-none'>
            <CalenderIcon width={20} height={20} className={iconClassName} />
         </Button>
         <DateInput slot='start' size={size} />
         <div className='mx-sm'>
            <ArrowRightIcon width={18} height={18} className={iconClassName} />
         </div>
         <DateInput slot='end' size={size} />
         {shouldRenderClearIcon ? (
            <div className='ml-auto p-sm' onClick={onClickClear}>
               <CloseIcon
                  width={12}
                  height={12}
                  svgClassName={'fill-button-secondary-fg'}
               />
            </div>
         ) : null}
      </FieldGroup>
   )
}

export default observer(TriggerComponent)
