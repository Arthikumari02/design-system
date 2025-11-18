import {
   CalendarDate,
   CalendarDateTime,
   parseDate,
   parseDateTime
} from '@internationalized/date'
import { RangeValue } from '@react-types/shared'
import type { Meta } from '@storybook/react'
import React from 'react'
import DateRangePicker from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
   title: 'Components/DateRangePicker',
   component: DateRangePicker,
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

export const Default = (args: any) => <DateRangePicker {...args} />
export const Disabled = (args: any) => (
   <DateRangePicker
      {...args}
      isDisabled={true}
      defaultValue={{
         start: parseDate('2024-01-01'),
         end: parseDate('2024-01-02')
      }}
   />
)

export const ReadOnly = (args: any) => (
   <DateRangePicker
      {...args}
      isReadOnly={true}
      defaultValue={{
         start: parseDate('2024-01-01'),
         end: parseDate('2024-01-02')
      }}
   />
)

export const Required = (args: any) => (
   <DateRangePicker {...args} isRequired={true} />
)
export const RequiredWithCustomContextualHelp = (args: any) => (
   <DateRangePicker
      {...args}
      isRequired={true}
      contextualHelp={() => <span>This is Custom Contextual Help.</span>}
   />
)

export const WithError = (args: any) => (
   <DateRangePicker
      label='Date range (error)'
      errorMessage='This is an error message.'
      description='This is a hint text to help user.'
      isInvalid={true}
      {...args}
   />
)

export const DefaultCalenderOpen = (args: any) => (
   <DateRangePicker {...args} defaultOpen={true} />
)

export const WithControlledValue = (args: any) => {
   const [value, setValue] = React.useState<RangeValue<CalendarDate>>({
      start: parseDate('2020-02-03'),
      end: parseDate('2020-02-08')
   })

   return (
      <DateRangePicker
         label='Date range (controlled)'
         value={value}
         onChange={setValue}
         description='This is a hint text to help user.'
      />
   )
}

export const WithTime = (args: any) => (
   <DateRangePicker {...args} granularity='minute' />
)

export const WithTimeControlledValue = (args: any) => {
   const [value, setValue] = React.useState<RangeValue<CalendarDateTime>>({
      start: parseDateTime('2024-08-23T15:34:45'),
      end: parseDateTime('2024-08-24T15:34:45')
   })

   return (
      <DateRangePicker
         label='Date range (controlled)'
         value={value}
         onChange={setValue}
         description='This is a hint text to help user.'
         hideTimeZone={true}
         granularity='minute'
      />
   )
}

export const WithLeadingZeros = (args: any) => (
   <DateRangePicker
      {...args}
      shouldForceLeadingZeros={true}
      defaultValue={{
         start: parseDateTime('2024-08-23T15:34:45'),
         end: parseDateTime('2024-08-24T15:34:45')
      }}
      granularity='minute'
   />
)

export const WithMinAndMaxRange = (args: any) => (
   <DateRangePicker
      {...args}
      minValue={parseDate('2024-02-03')}
      maxValue={parseDate('2024-02-08')}
   />
)

export const WithPlaceholderValue = (args: any) => (
   <DateRangePicker
      {...args}
      placeholderValue={parseDateTime('1820-08-23T15:34:45')}
      granularity='minute'
   />
)

export const WithCustomTrigger = (args: any) => {
   const [value, setValue] = React.useState<RangeValue<CalendarDateTime>>()

   const renderCustomTrigger = () => (
      <div className='cursor-pointer p-md hover:bg-primary_hover'>
         {value
            ? `${value.start.toString()} to ${value?.end.toString()}`
            : 'Custom Trigger'}
      </div>
   )

   return (
      <DateRangePicker
         {...args}
         value={value}
         onChange={setValue}
         renderCustomTrigger={renderCustomTrigger}
         granularity='minute'
      />
   )
}

export const WithClearButton = (args: any) => (
   <DateRangePicker
      {...args}
      shouldForceLeadingZeros={true}
      defaultValue={{
         start: parseDate('2024-01-01'),
         end: parseDate('2024-01-02')
      }}
      shouldShowClearButton={true}
      containerClassName='w-[500px]'
   />
)

export const ValidateDateRangeOnChange = (args: any) => {
   const [value, setValue] = React.useState<RangeValue<CalendarDateTime>>()

   const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

   const validDateRange = (dateRange: RangeValue<CalendarDateTime>) => {
      if (!dateRange) return
      if (dateRange.start.compare(dateRange.end) > 0) {
         setErrorMessage(
            'Start date time cannot be greater than end date time.'
         )
         return
      } else if (dateRange.start.compare(dateRange.end) < 0) {
         setErrorMessage(null)

         return
      }
      setErrorMessage('Start date time cannot be equal to end date time.')
   }

   const onChangeDateRange = (dateRange: RangeValue<CalendarDateTime>) => {
      setValue(dateRange)
      validDateRange(dateRange)
   }

   return (
      <DateRangePicker
         {...args}
         label='Date range (controlled)'
         value={value}
         onChange={onChangeDateRange}
         description='This is a hint text to help user.'
         hideTimeZone={true}
         granularity='minute'
         errorMessage={errorMessage}
         isInvalid={!!errorMessage}
      />
   )
}

export const ValidateDateRangeOnBlurAndOnApply = (args: any) => {
   const [value, setValue] = React.useState<RangeValue<CalendarDateTime>>()

   const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

   const validDateRange = () => {
      if (!value) return
      if (!value) return
      if (value.start.compare(value.end) > 0) {
         setErrorMessage(
            'Start date time cannot be greater than end date time.'
         )
         return
      } else if (value.start.compare(value.end) < 0) {
         setErrorMessage(null)

         return
      }
      setErrorMessage('Start date time cannot be equal to end date time.')
   }

   return (
      <DateRangePicker
         {...args}
         label='Date range'
         value={value}
         onChange={setValue}
         description='This is a hint text to help user.'
         hideTimeZone={true}
         granularity='minute'
         errorMessage={errorMessage}
         isInvalid={!!errorMessage}
         footerProps={{
            onApply: validDateRange
         }}
         onBlur={validDateRange}
      />
   )
}
