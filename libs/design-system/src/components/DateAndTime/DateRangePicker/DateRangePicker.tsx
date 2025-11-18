import cn from 'classnames'
import { observer } from 'mobx-react'
import {
   DateRangePicker as AriaDateRangePicker,
   DateRangePickerProps as AriaDateRangePickerProps,
   DateValue,
   I18nProvider,
   ValidationResult
} from 'react-aria-components'

import { ReactNode } from 'react'
import { SmallAndMedium } from '../../../types'
import Dialog from '../../ReactAriaComponents/Dialog/Dialog'
import FieldError from '../../ReactAriaComponents/HelpTextAndFieldError/FieldError'
import HelpText from '../../ReactAriaComponents/HelpTextAndFieldError/HelpText'
import Label from '../../ReactAriaComponents/Label/Label'
import Popover from '../../ReactAriaComponents/Popover/Popover'
import RangeCalendar from '../../ReactAriaComponents/RangeCalender/RangeCalendar'
import FooterComponent, { FooterProps } from './FooterComponent'
import TimeRangePicker from './TimeRangePicker'
import TriggerComponent from './TriggerComponent'

interface Props<T extends DateValue> extends AriaDateRangePickerProps<T> {
   label?: string
   description?: string
   errorMessage?: string | ((validation: ValidationResult) => string) | null
   size?: SmallAndMedium
   footerProps?: FooterProps
   containerClassName?: string
   shouldShowClearButton?: boolean
   contextualHelp?: () => ReactNode
   renderCustomTrigger?: (isOpen: boolean) => React.ReactElement
}

const DateRangePicker = <T extends DateValue>(props: Props<T>) => {
   const {
      label,
      description,
      errorMessage,
      size = 'Small',
      containerClassName,
      renderCustomTrigger,
      footerProps,
      shouldShowClearButton,
      shouldCloseOnSelect = false,
      hourCycle = 12,
      shouldForceLeadingZeros = true,
      validationBehavior = 'aria',
      ...otherProps
   } = props

   return (
      <I18nProvider locale='en-GB'>
         <AriaDateRangePicker
            {...otherProps}
            shouldCloseOnSelect={shouldCloseOnSelect}
            hourCycle={hourCycle}
            shouldForceLeadingZeros={shouldForceLeadingZeros}
            validationBehavior={validationBehavior}
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
               >
                  {label}
               </Label>
            ) : null}
            <TriggerComponent
               size={size}
               isDisabled={props.isDisabled}
               isReadOnly={props.isReadOnly}
               shouldShowClearButton={shouldShowClearButton}
               renderCustomTrigger={renderCustomTrigger}
            />
            {errorMessage || props.isInvalid ? (
               <FieldError size={size}>{errorMessage}</FieldError>
            ) : (
               <HelpText size={size}>{description}</HelpText>
            )}
            <Popover className={'px-lg'}>
               <Dialog className='w-full'>
                  <RangeCalendar size={size} />
                  {props.granularity === 'minute' ? <TimeRangePicker /> : null}
                  <FooterComponent
                     size={size}
                     contextType='dateRange'
                     {...footerProps}
                  />
               </Dialog>
            </Popover>
         </AriaDateRangePicker>
      </I18nProvider>
   )
}

export default observer(DateRangePicker)
