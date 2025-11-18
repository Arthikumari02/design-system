import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { Button, DatePickerStateContext, Group } from 'react-aria-components'

import { CalenderIcon } from '../../../icons/CalenderIcon'
import { BasicSize, FocusRingVariant } from '../../../types'

import { CloseIcon } from '../../../icons/CloseIcon'
import DateInput from '../../ReactAriaComponents/DateInput/DateInput'
import FieldGroup from '../../ReactAriaComponents/FieldGroup/FieldGroup'
import { FocusRing } from '../../FocusRing/FocusRing'

interface Props {
   size: BasicSize
   isDisabled?: boolean
   isReadOnly?: boolean
   shouldShowClearButton?: boolean
   renderCustomTrigger?: (isOpen: boolean) => React.ReactElement
   customTriggerFocusRingVariant?: FocusRingVariant
   onClickClear?: () => void
}

const TriggerComponent = (props: Props) => {
   const {
      size,
      renderCustomTrigger,
      shouldShowClearButton,
      isDisabled,
      isReadOnly,
      customTriggerFocusRingVariant
   } = props

   const state = useContext(DatePickerStateContext)

   if (renderCustomTrigger) {
      return (
         <Group className={'flex'} tabIndex={-1}>
            <FocusRing
               within
               isError={state?.isInvalid}
               variant={customTriggerFocusRingVariant}
            >
               <Button className='outline-none w-full'>
                  {renderCustomTrigger(Boolean(state?.isOpen))}
               </Button>
            </FocusRing>
         </Group>
      )
   }

   const isValueExists = !!state?.dateValue || !!state?.timeValue

   const shouldRenderClearIcon =
      shouldShowClearButton && isValueExists && !isReadOnly && !isDisabled

   const iconClassName =
      isDisabled || !isValueExists || isReadOnly
         ? 'stroke-fg-disabled'
         : 'stroke-button-secondary-fg'

   const onClickClear = () => {
      state?.setValue(null)
      props.onClickClear?.()
   }

   return (
      <FieldGroup size={size}>
         <Button className='mr-xs outline-none'>
            <CalenderIcon width={20} height={20} className={iconClassName} />
         </Button>
         <DateInput size={size} />
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
