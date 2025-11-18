import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import {
   DatePicker as AriaDatePicker,
   DateValue,
   I18nProvider
} from 'react-aria-components'

import {
   convertDateObjToCalendarDateTimeObj,
   convertDateObjToDateValueObj,
   convertDateValueObjToDateObj
} from '../../../utils/DateAndTimeUtils'

import Calendar from '../../ReactAriaComponents/Calendar/Calendar'
import Dialog from '../../ReactAriaComponents/Dialog/Dialog'
import FieldError from '../../ReactAriaComponents/HelpTextAndFieldError/FieldError'
import HelpText from '../../ReactAriaComponents/HelpTextAndFieldError/HelpText'
import Label from '../../ReactAriaComponents/Label/Label'
import Popover from '../../ReactAriaComponents/Popover/Popover'

import FooterComponent from '../DateRangePicker/FooterComponent'

import DateTimeFieldWrapper from './DateTimeFieldWrapper'
import TriggerComponent from './TriggerComponent'
import { RACDatePickerProps } from './types'

const RACDatePicker = <T extends DateValue>(props: RACDatePickerProps<T>) => {
   const {
      value,
      onChange,
      label,
      description,
      errorMessage,
      size = 'Small',
      containerClassName,
      renderCustomTrigger,
      renderHeader,
      footerProps,
      shouldShowClearButton,
      hourCycle = 12,
      shouldForceLeadingZeros = true,
      validationBehavior = 'aria',
      isDateTimePicker = false,
      customTriggerFocusRingVariant,
      popoverProps,
      showAsInline = false,
      datePickerContainerClassName = '',
      ...otherProps
   } = props

   const granularity = isDateTimePicker ? 'minute' : 'day'

   const getInitialValue = (): T | null | undefined => {
      if (value === null) return null
      if (value === undefined) return undefined //NOTE: Added this to make sure default value works fine
      if (isDateTimePicker) {
         return convertDateObjToCalendarDateTimeObj(value) as T
      }
      return convertDateObjToDateValueObj(value) as T
   }

   const [selectedValue, setSelectedValue] = React.useState<
      T | null | undefined
   >(getInitialValue())

   useEffect(() => {
      setSelectedValue(getInitialValue())
   }, [value])

   const isApplyButtonDisabled = React.useMemo(() => {
      const selectedDate = selectedValue
         ? convertDateValueObjToDateObj(selectedValue)
         : null

      return selectedDate?.toISOString() === value?.toISOString()
   }, [selectedValue, value])

   const handleChange = (newValue: DateValue | null) => {
      const typedNewValue = newValue as T

      setSelectedValue(typedNewValue)
      if (!isDateTimePicker) {
         onChange?.(newValue ? convertDateValueObjToDateObj(newValue) : null)
      }
   }

   const onClickApply = () => {
      onChange?.(
         selectedValue ? convertDateValueObjToDateObj(selectedValue) : null
      )
   }

   const onPressEnterWithValidTime = (
      updatedDateTime: Date,
      close?: () => void
   ) => {
      onChange?.(updatedDateTime)
      close?.()
   }

   const onClickCancel = () => {
      setSelectedValue(
         value ? (convertDateObjToCalendarDateTimeObj(value) as T) : null
      )
   }

   const onClickClear = () => {
      setSelectedValue(null)
      if (!isDateTimePicker) return
      onChange?.(null)
   }

   const renderDatePicker = () => (
      <>
         {renderHeader?.()}
         <div
            className={cn(
               'flex flex-col px-xl py-2xl gap-y-md',
               datePickerContainerClassName
            )}
         >
            <DateTimeFieldWrapper
               size={size}
               shouldShowTime={isDateTimePicker}
               minValue={props.minValue ?? undefined}
               maxValue={props.maxValue ?? undefined}
               errorMessage={errorMessage}
               dateTimeInputStrings={props.dateTimeInputStrings}
               autoFocusDateInput={props.autoFocusDateInput}
               shouldShowErrorInTooltip={props.shouldShowErrorInTooltip}
               onPressEnterWithValidTime={onPressEnterWithValidTime}
            />
            <Calendar
               size={size}
               autoFocus={false}
               key={selectedValue?.toString()}
            />
         </div>
         {isDateTimePicker || shouldShowClearButton ? (
            <FooterComponent
               size={size}
               shouldShowClearButton={shouldShowClearButton}
               isDateTimePicker={isDateTimePicker}
               onClear={onClickClear}
               onApply={onClickApply}
               onCancel={onClickCancel}
               isApplyButtonDisabled={isApplyButtonDisabled}
               {...footerProps}
            />
         ) : null}
      </>
   )

   const renderFieldErrorOrHelpText = () =>
      errorMessage || props.isInvalid ? (
         <FieldError size={size}>{errorMessage}</FieldError>
      ) : description ? (
         <HelpText size={size} title={description}>
            {description}
         </HelpText>
      ) : null

   return (
      <I18nProvider locale='en-GB'>
         <AriaDatePicker
            {...otherProps}
            value={selectedValue}
            onChange={handleChange}
            shouldCloseOnSelect={isDateTimePicker ? false : true}
            hourCycle={hourCycle}
            shouldForceLeadingZeros={shouldForceLeadingZeros}
            validationBehavior={validationBehavior}
            granularity={granularity}
            className={cn(
               props.className,
               'group flex flex-col gap-y-sm',
               containerClassName
            )}
         >
            {label ? (
               <Label
                  size={size}
                  contextualHelp={props.contextualHelp}
                  isRequired={props.isRequired}
                  containerClassName={'!mb-0'}
               >
                  {label}
               </Label>
            ) : null}
            {showAsInline ? null : (
               <TriggerComponent
                  size={size}
                  isDisabled={props.isDisabled}
                  isReadOnly={props.isReadOnly}
                  shouldShowClearButton={shouldShowClearButton}
                  renderCustomTrigger={renderCustomTrigger}
                  onClickClear={onClickClear}
                  customTriggerFocusRingVariant={customTriggerFocusRingVariant}
               />
            )}
            {!showAsInline ? renderFieldErrorOrHelpText() : null}
            {showAsInline ? (
               renderDatePicker()
            ) : (
               <Popover
                  className={'!py-0'}
                  triggerRef={popoverProps?.triggerRef}
                  offset={popoverProps?.offset}
                  placement={popoverProps?.placement}
               >
                  <Dialog className='w-full'>{renderDatePicker()}</Dialog>
               </Popover>
            )}
         </AriaDatePicker>
      </I18nProvider>
   )
}

export default observer(RACDatePicker)
