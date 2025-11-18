import { observer } from 'mobx-react'
import { useContext } from 'react'
import {
   DatePickerStateContext,
   DateRangePickerStateContext
} from 'react-aria-components'

import { ButtonSize } from '../../../types'
import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { actionButtonsContainerClassName, clearButtonClassName } from './styles'

export interface FooterProps {
   isApplyButtonLoading?: boolean
   applyButtonText?: string
   cancelButtonText?: string
   clearButtonText?: string
}

interface Props extends FooterProps {
   size: ButtonSize
   onApply?: (closePopover?: () => void) => void
   onCancel?: () => void
   contextType?: 'date' | 'dateRange'
   shouldShowClearButton?: boolean
   onClear?: () => void
   isDateTimePicker?: boolean
   isApplyButtonDisabled?: boolean
}

const FooterComponent = (props: Props) => {
   const {
      onApply,
      onCancel,
      onClear,
      isApplyButtonDisabled,
      isApplyButtonLoading,
      applyButtonText = 'Apply',
      cancelButtonText = 'Cancel',
      clearButtonText = 'Clear',
      size,
      contextType = 'date'
   } = props

   const dateRangeState = useContext(DateRangePickerStateContext)
   const dateState = useContext(DatePickerStateContext)

   // Get the appropriate state based on context type
   const state = contextType === 'date' ? dateState : dateRangeState

   const onClickCancelBtn = (): void => {
      onCancel?.()
      state?.close()
   }

   const onClickApply = (): void => {
      onApply?.(state?.close)

      if (!isApplyButtonLoading) state?.close()
   }

   const onClickClear = () => {
      state?.setValue(null)
      state?.close()

      onClear?.()
   }

   return (
      <>
         {props.shouldShowClearButton ? (
            <>
               <div className='border-t border-secondary' />
               <div className='my-md mx-md-utility flex'>
                  <button
                     className={clearButtonClassName}
                     onClick={onClickClear}
                  >
                     {clearButtonText}
                  </button>
               </div>
            </>
         ) : null}
         {props.isDateTimePicker ? (
            <div className={actionButtonsContainerClassName}>
               <Button
                  hierarchy={Hierarchy.Secondary}
                  subVariant={SubVariant.GrayOutline}
                  size={size}
                  onClick={onClickCancelBtn}
                  className='w-full'
               >
                  {cancelButtonText}
               </Button>

               <Button
                  hierarchy={Hierarchy.Primary}
                  subVariant={SubVariant.Primary}
                  size={size}
                  onClick={onClickApply}
                  isDisabled={isApplyButtonDisabled}
                  isLoading={isApplyButtonLoading}
                  className='w-full'
               >
                  {applyButtonText}
               </Button>
            </div>
         ) : null}
      </>
   )
}

export default observer(FooterComponent)
