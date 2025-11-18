import {
   CalendarDate,
   CalendarDateTime,
   parseDate,
   parseDateTime
} from '@internationalized/date'
import type { Meta } from '@storybook/react'
import React from 'react'
import RACDatePicker from './RACDatePicker'

const meta: Meta<typeof RACDatePicker> = {
   title: 'Components/RACDatePicker',
   component: RACDatePicker,
   decorators: [
      Story => (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'flex-start',
               height: '100vh',
               paddingTop: '20px'
            }}
         >
            <Story />
         </div>
      )
   ],
   parameters: {
      layout: 'fullscreen'
   },
   args: {
      label: 'Trip dates'
   }
}

export default meta

export const Default = (args: any) => <RACDatePicker {...args} />
export const Disabled = (args: any) => (
   <RACDatePicker
      {...args}
      isDisabled={true}
      defaultValue={parseDate('2024-01-01')}
   />
)

export const ReadOnly = (args: any) => (
   <RACDatePicker
      {...args}
      isReadOnly={true}
      defaultValue={parseDate('2024-01-01')}
   />
)

export const Required = (args: any) => (
   <RACDatePicker {...args} isRequired={true} />
)
export const RequiredWithCustomContextualHelp = (args: any) => (
   <RACDatePicker
      {...args}
      isRequired={true}
      contextualHelp={() => <span>This is Custom Contextual Help.</span>}
   />
)

export const WithError = (args: any) => (
   <RACDatePicker
      label='Date (error)'
      errorMessage='This is an error message.'
      description='This is a hint text to help user.'
      isInvalid={true}
      {...args}
   />
)

export const DefaultCalenderOpen = (args: any) => (
   <RACDatePicker {...args} defaultOpen={true} />
)

export const WithControlledValue = (args: any) => {
   const [value, setValue] = React.useState<Date | null>(new Date('2020-02-03'))

   return (
      <RACDatePicker
         label='Date (controlled)'
         value={value}
         onChange={setValue}
         description='This is a hint text to help user.'
      />
   )
}

export const WithTime = (args: any) => (
   <RACDatePicker {...args} isDateTimePicker={true} />
)

export const WithTimeControlledValue = (args: any) => {
   const [value, setValue] = React.useState<Date | null>(new Date())

   return (
      <RACDatePicker
         label='Date (controlled)'
         value={value}
         onChange={setValue}
         description='This is a hint text to help user.'
         hideTimeZone={true}
         isDateTimePicker={true}
      />
   )
}

export const WithLeadingZeros = (args: any) => (
   <RACDatePicker
      {...args}
      shouldForceLeadingZeros={true}
      defaultValue={parseDateTime('2024-08-24T15:34:45')}
      isDateTimePicker={true}
   />
)

export const WithMinAndMaxDates = (args: any) => (
   <RACDatePicker
      {...args}
      minValue={parseDate('2024-02-03')}
      maxValue={parseDate('2024-02-08')}
   />
)

export const WithMinAndMaxDatesForDateTime = (args: any) => (
   <RACDatePicker
      {...args}
      minValue={parseDateTime('2024-02-03T09:00:00')}
      maxValue={parseDateTime('2024-02-08T18:00:00')}
      isDateTimePicker={true}
      dateTimeInputStrings={{
         datePlaceholder: 'Select Date',
         timePlaceholder: 'Select Time',
         invalidDateErrorMessage: 'Invalid Date Format',
         invalidTimeErrorMessage: 'Invalid Time Format',
         dateOutOfRangeErrorMessage:
            'Entered date is out of range, give value between 2024-02-03 and 2024-02-08',
         timeOutOfRangeErrorMessage: 'Entered time is out of range'
      }}
   />
)

export const WithPlaceholderValue = (args: any) => (
   <RACDatePicker
      {...args}
      placeholderValue={parseDateTime('1820-08-23T15:34:45')}
      isDateTimePicker={true}
   />
)

export const WithCustomTrigger = (args: any) => {
   const [value, setValue] = React.useState<Date | null>()

   const renderCustomTrigger = () => (
      <div className='cursor-pointer p-md hover:bg-primary_hover'>
         {value ? `${value.toString()}` : 'Custom Trigger'}
      </div>
   )

   return (
      <RACDatePicker
         {...args}
         value={value}
         onChange={setValue}
         renderCustomTrigger={renderCustomTrigger}
         isDateTimePicker={true}
      />
   )
}

export const WithClearButton = (args: any) => (
   <>
      <RACDatePicker
         {...args}
         shouldForceLeadingZeros={true}
         defaultValue={parseDate('2024-01-02')}
         shouldShowClearButton={true}
         containerClassName='w-[300px]'
         label='Start Date'
      />
      <RACDatePicker
         {...args}
         shouldForceLeadingZeros={true}
         defaultValue={parseDateTime('1820-08-23T15:34:45')}
         shouldShowClearButton={true}
         containerClassName='w-[300px]'
         isDateTimePicker={true}
         label='End Date Time'
      />
   </>
)

export const ValidateDateOnChange = (args: any) => {
   const [value, setValue] = React.useState<Date | null>()

   const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

   const validDate = (date: Date | null) => {
      if (!date) return

      setErrorMessage(`Date cannot be ${date.toString()}`)
   }

   const onChangeDate = (date: Date | null) => {
      setValue(date)
      validDate(date)
   }

   return (
      <RACDatePicker
         {...args}
         label='Date  (controlled)'
         value={value}
         onChange={onChangeDate}
         description='This is a hint text to help user.'
         hideTimeZone={true}
         isDateTimePicker={true}
         errorMessage={errorMessage}
         isInvalid={!!errorMessage}
      />
   )
}
