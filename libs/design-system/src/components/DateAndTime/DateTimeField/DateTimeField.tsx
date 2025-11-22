import { CalendarDate, Time } from '@internationalized/date'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React, { useRef } from 'react'

import {
   DateValue,
   GroupContext,
   Provider,
   ValidationResult
} from 'react-aria-components'
import { createPortal } from 'react-dom'
import { Tooltip } from 'react-tooltip'
import uuidV4 from 'react-uuid'

import { SmallAndMedium } from '../../../types'

import FieldGroup from '../../ReactAriaComponents/FieldGroup/FieldGroup'
import ErrorText from '../../ReactAriaComponents/HelpTextAndFieldError/ErrorText'
import FieldError from '../../ReactAriaComponents/HelpTextAndFieldError/FieldError'

import { CloseIcon } from '../../../icons/CloseIcon'

import DateInput, { DateInputStrings } from './DateInput'
import TimeInput, { TimeInputStrings } from './TimeInput'
import { tooltipClassName } from './styles'

export interface DateTimeInputStrings
   extends DateInputStrings,
   TimeInputStrings { }

interface Props {
   size: SmallAndMedium
   initialDate?: CalendarDate
   initialTime?: Time
   onUpdateDate?: (date: CalendarDate | null) => void
   onUpdateTime?: (time: Time) => void
   className?: string
   shouldShowTime?: boolean
   isInvalid?: boolean
   minValue?: DateValue
   maxValue?: DateValue
   errorMessage?: string | ((validation: ValidationResult) => string) | null
   shouldShowErrorInTooltip?: boolean
   dateTimeInputStrings?: DateTimeInputStrings
   tooltipClassName?: string
   autoFocusDateInput?: boolean
   shouldClearDateInput?: boolean
   shouldShowClearIcon?: boolean
   onPressEnterWithValidTime?: (updatedDateTime: Date) => void
}

export interface ValidationResultType {
   isInvalid: boolean
   errorMessage: string
   isInvalidDate?: boolean
}

const DateTimeField = (props: Props): React.ReactElement => {
   const {
      initialDate,
      initialTime,
      shouldShowTime = false,
      dateTimeInputStrings,
      shouldShowErrorInTooltip = true,
      autoFocusDateInput = true,
      shouldClearDateInput,
      shouldShowClearIcon = false
   } = props

   const [validationResult, setValidationResult] =
      React.useState<ValidationResultType | null>(null)
   const tooltipIdRef = useRef(uuidV4())

   const shouldDisplayError = !!(
      props.errorMessage || validationResult?.isInvalid
   )

   const onClickClear = () => {
      props.onUpdateDate?.(null)
   }
   const errorMessage = validationResult?.errorMessage || props.errorMessage

   const renderErrorInTooltip = () => {
      if (!shouldDisplayError) return null

      return createPortal(
         <Tooltip
            id={tooltipIdRef.current}
            className={`${tooltipClassName} ${props.tooltipClassName}`}
            offset={12}
            opacity={1}
            place={'left'}
            isOpen={shouldDisplayError}
         >
            {errorMessage}
         </Tooltip>,
         document.body
      )
   }

   const renderInlineErrorMessage = () => {
      if (props.errorMessage)
         return (
            <FieldError size={props.size} className='mt-xs max-w-[280px]'>
               {props.errorMessage}
            </FieldError>
         )

      return (
         <ErrorText
            size={props.size}
            className='mt-xs max-w-[280px]'
            title={validationResult?.errorMessage}
         >
            {validationResult?.errorMessage}
         </ErrorText>
      )
   }

   return (
      <>
         <Provider values={[[GroupContext, {}]]}>
            <FieldGroup
               size={props.size}
               className={classNames(
                  'focus-within:ring-2 focus-within:ring-primary ',
                  props.className,
                  {
                     'bg-error-primary': validationResult?.isInvalid
                  }
               )}
               isInvalid={props.isInvalid || validationResult?.isInvalid}
               data-tooltip-id={tooltipIdRef.current}
            >
               <DateInput
                  initialDate={initialDate}
                  setValidationResult={setValidationResult}
                  onUpdateDate={props.onUpdateDate}
                  size={props.size}
                  minValue={props.minValue}
                  maxValue={props.maxValue}
                  dateInputStrings={dateTimeInputStrings}
                  autoFocus={autoFocusDateInput}
                  shouldClearDateInput={shouldClearDateInput}
               />
               {shouldShowClearIcon && initialDate ? (
                  <div className='ml-auto p-xs' onClick={onClickClear}>
                     <CloseIcon
                        width={12}
                        height={12}
                        svgClassName='fill-fg-quarterary-500'
                     />
                  </div>
               ) : null}
               {shouldShowTime ? (
                  <TimeInput
                     initialTime={initialTime}
                     setValidationResult={setValidationResult}
                     onUpdateTime={props.onUpdateTime}
                     size={props.size}
                     isDisabled={validationResult?.isInvalidDate}
                     timeInputStrings={dateTimeInputStrings}
                     minValue={props.minValue}
                     maxValue={props.maxValue}
                     currentDate={initialDate}
                     onPressEnterWithValidTime={props.onPressEnterWithValidTime}
                  />
               ) : null}
            </FieldGroup>
         </Provider>
         {shouldShowErrorInTooltip
            ? renderErrorInTooltip()
            : renderInlineErrorMessage()}
      </>
   )
}

export default observer(DateTimeField)
