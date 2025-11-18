import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CalendarDate, Time } from '@internationalized/date'

import DateRangeCalenderWithInput from './DateRangeCalenderWithInput'

const meta: Meta<typeof DateRangeCalenderWithInput> = {
   title: 'Components/DateAndTime/DateRangeCalenderWithInput',
   component: DateRangeCalenderWithInput,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that combines date range inputs with a calendar for date range selection.'
         }
      }
   },
   argTypes: {
      shouldShowTime: {
         control: 'boolean',
         defaultValue: false
      },
      size: {
         control: 'radio',
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      shouldShowClearIcon: {
         control: 'boolean',
         defaultValue: false
      },
      dateInputsContainerClassName: {
         control: 'text',
         description: 'Custom CSS class for the date inputs container'
      }
   }
}

export default meta

type Story = StoryObj<typeof DateRangeCalenderWithInput>

// Template component to handle state
const DateRangeCalenderWithInputTemplate: React.FC<any> = args => {
   const [fromDate, setFromDate] = useState<CalendarDate | null>(null)
   const [toDate, setToDate] = useState<CalendarDate | null>(null)
   const [fromTime, setFromTime] = useState<Time | null>(null)
   const [toTime, setToTime] = useState<Time | null>(null)

   const handleFromDateUpdate = (date: CalendarDate | null) => {
      setFromDate(date)
      action('onFromDateUpdate')(date)
   }

   const handleToDateUpdate = (date: CalendarDate | null) => {
      setToDate(date)
      action('onToDateUpdate')(date)
   }

   const handleFromTimeUpdate = (time: Time) => {
      setFromTime(time)
      action('onFromTimeUpdate')(time)
   }

   const handleToTimeUpdate = (time: Time) => {
      setToTime(time)
      action('onToTimeUpdate')(time)
   }

   return (
      <div style={{ padding: '20px', width: '600px' }}>
         <DateRangeCalenderWithInput
            {...args}
            fromDateProps={{
               fromDate: fromDate,
               fromTime: fromTime,
               onUpdateDate: handleFromDateUpdate,
               onUpdateTime: handleFromTimeUpdate,
               errorMessage: args.fromDateError
            }}
            toDateProps={{
               toDate: toDate,
               toTime: toTime,
               onUpdateDate: handleToDateUpdate,
               onUpdateTime: handleToTimeUpdate,
               errorMessage: args.toDateError
            }}
         />
         <div
            style={{
               marginTop: '16px',
               padding: '8px',
               backgroundColor: '#f0f0f0',
               borderRadius: '4px'
            }}
         >
            <strong>Selected Range:</strong>
            <br />
            From: {fromDate ? fromDate.toString() : 'None'}{' '}
            {fromTime ? `at ${fromTime.toString()}` : ''}
            <br />
            To: {toDate ? toDate.toString() : 'None'}{' '}
            {toTime ? `at ${toTime.toString()}` : ''}
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const WithTime: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowTime: true
   }
}

export const SmallSize: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const WithClearIcon: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowClearIcon: true
   }
}

export const WithTimeAndClearIcon: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowTime: true,
      shouldShowClearIcon: true
   }
}

export const WithCustomClass: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium',
      dateInputsContainerClassName: 'custom-date-inputs-container'
   }
}

export const WithErrors: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '600px' }}>
         <DateRangeCalenderWithInput
            {...args}
            size='Medium'
            fromDateProps={{
               onUpdateDate: action('onFromDateUpdate'),
               onUpdateTime: action('onFromTimeUpdate'),
               errorMessage: 'Please select a valid start date'
            }}
            toDateProps={{
               onUpdateDate: action('onToDateUpdate'),
               onUpdateTime: action('onToTimeUpdate'),
               errorMessage: 'Please select a valid end date'
            }}
         />
      </div>
   )
}

export const WithMinMaxDates: Story = {
   render: args => <DateRangeCalenderWithInputTemplate {...args} />,
   args: {
      size: 'Medium',
      fromDateProps: {
         minValue: new CalendarDate(2024, 1, 1)
      },
      toDateProps: {
         maxValue: new CalendarDate(2024, 12, 31)
      }
   }
}

export const AllVariants: Story = {
   render: () => (
      <div
         style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
         }}
      >
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Default (Date Only):</h4>
            <DateRangeCalenderWithInput
               shouldShowTime={false}
               size='Medium'
               fromDateProps={{
                  onUpdateDate: action('onFromDateUpdate'),
                  onUpdateTime: action('onFromTimeUpdate')
               }}
               toDateProps={{
                  onUpdateDate: action('onToDateUpdate'),
                  onUpdateTime: action('onToTimeUpdate')
               }}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>With Time:</h4>
            <DateRangeCalenderWithInput
               shouldShowTime={true}
               size='Medium'
               fromDateProps={{
                  onUpdateDate: action('onFromDateUpdate'),
                  onUpdateTime: action('onFromTimeUpdate')
               }}
               toDateProps={{
                  onUpdateDate: action('onToDateUpdate'),
                  onUpdateTime: action('onToTimeUpdate')
               }}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size:</h4>
            <DateRangeCalenderWithInput
               shouldShowTime={false}
               size='Small'
               fromDateProps={{
                  onUpdateDate: action('onFromDateUpdate'),
                  onUpdateTime: action('onFromTimeUpdate')
               }}
               toDateProps={{
                  onUpdateDate: action('onToDateUpdate'),
                  onUpdateTime: action('onToTimeUpdate')
               }}
            />
         </div>
      </div>
   )
}
