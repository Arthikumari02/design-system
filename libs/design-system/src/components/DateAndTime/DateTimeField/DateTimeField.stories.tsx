import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CalendarDate, Time } from '@internationalized/date'

import DateTimeField from './DateTimeField'

const meta: Meta<typeof DateTimeField> = {
   title: 'Components/DateAndTime/DateTimeField',
   component: DateTimeField,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that combines date and time input fields with validation and error handling.'
         }
      }
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      shouldShowTime: {
         control: 'boolean',
         defaultValue: false
      },
      isInvalid: {
         control: 'boolean',
         defaultValue: false
      },
      shouldShowErrorInTooltip: {
         control: 'boolean',
         defaultValue: true
      },
      autoFocusDateInput: {
         control: 'boolean',
         defaultValue: true
      },
      shouldClearDateInput: {
         control: 'boolean',
         defaultValue: false
      },
      shouldShowClearIcon: {
         control: 'boolean',
         defaultValue: false
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      },
      tooltipClassName: {
         control: 'text',
         description: 'Custom CSS class for tooltip'
      }
   }
}

export default meta

type Story = StoryObj<typeof DateTimeField>

// Template component to handle state
const DateTimeFieldTemplate: React.FC<any> = args => {
   const [date, setDate] = useState<CalendarDate | null>(null)
   const [time, setTime] = useState<Time | null>(null)

   const handleDateUpdate = (newDate: CalendarDate | null) => {
      setDate(newDate)
      action('onUpdateDate')(newDate)
   }

   const handleTimeUpdate = (newTime: Time) => {
      setTime(newTime)
      action('onUpdateTime')(newTime)
   }

   const handlePressEnterWithValidTime = (updatedDateTime: Date) => {
      action('onPressEnterWithValidTime')(updatedDateTime)
   }

   return (
      <div style={{ padding: '20px', width: '400px' }}>
         <DateTimeField
            {...args}
            initialDate={date}
            initialTime={time}
            onUpdateDate={handleDateUpdate}
            onUpdateTime={handleTimeUpdate}
            onPressEnterWithValidTime={handlePressEnterWithValidTime}
         />
         <div
            style={{
               marginTop: '16px',
               padding: '8px',
               backgroundColor: '#f0f0f0',
               borderRadius: '4px'
            }}
         >
            <strong>Current Values:</strong>
            <br />
            Date: {date ? date.toString() : 'None'}
            <br />
            Time: {time ? time.toString() : 'None'}
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const WithTime: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowTime: true
   }
}

export const SmallSize: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const WithTimeSmallSize: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Small',
      shouldShowTime: true
   }
}

export const WithClearIcon: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowClearIcon: true
   }
}

export const WithTimeAndClearIcon: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      shouldShowTime: true,
      shouldShowClearIcon: true
   }
}

export const WithError: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date and time'
   }
}

export const WithErrorInTooltip: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date and time',
      shouldShowErrorInTooltip: true
   }
}

export const WithInlineError: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date and time',
      shouldShowErrorInTooltip: false
   }
}

export const WithCustomClass: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      className: 'custom-datetime-field-class'
   }
}

export const WithCustomTooltipClass: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date and time',
      tooltipClassName: 'custom-tooltip-class'
   }
}

export const WithMinMaxDates: Story = {
   render: args => <DateTimeFieldTemplate {...args} />,
   args: {
      size: 'Medium',
      minValue: new CalendarDate(2024, 1, 1),
      maxValue: new CalendarDate(2024, 12, 31)
   }
}

export const WithInitialValues: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '400px' }}>
         <DateTimeField
            {...args}
            size='Medium'
            initialDate={new CalendarDate(2024, 6, 15)}
            initialTime={new Time(10, 30)}
            onUpdateDate={action('onUpdateDate')}
            onUpdateTime={action('onUpdateTime')}
         />
      </div>
   )
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
            <h4 style={{ margin: '0 0 8px 0' }}>Date Only (Medium):</h4>
            <DateTimeField
               size='Medium'
               shouldShowTime={false}
               onUpdateDate={action('onUpdateDate')}
               onUpdateTime={action('onUpdateTime')}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Date and Time (Medium):</h4>
            <DateTimeField
               size='Medium'
               shouldShowTime={true}
               onUpdateDate={action('onUpdateDate')}
               onUpdateTime={action('onUpdateTime')}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Date Only (Small):</h4>
            <DateTimeField
               size='Small'
               shouldShowTime={false}
               onUpdateDate={action('onUpdateDate')}
               onUpdateTime={action('onUpdateTime')}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Date and Time (Small):</h4>
            <DateTimeField
               size='Small'
               shouldShowTime={true}
               onUpdateDate={action('onUpdateDate')}
               onUpdateTime={action('onUpdateTime')}
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>With Error:</h4>
            <DateTimeField
               size='Medium'
               shouldShowTime={false}
               errorMessage='Please select a valid date'
               onUpdateDate={action('onUpdateDate')}
               onUpdateTime={action('onUpdateTime')}
            />
         </div>
      </div>
   )
}
