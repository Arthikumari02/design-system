import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CalendarDate } from '@internationalized/date'

import Calendar from './Calendar'

const meta: Meta<typeof Calendar> = {
   title: 'Components/RACCalendar',
   component: Calendar,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Medium'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isReadOnly: {
         control: 'boolean',
         defaultValue: false
      },
      autoFocus: {
         control: 'boolean',
         defaultValue: false
      }
   }
}

export default meta

type Story = StoryObj<typeof Calendar>

// Template component to handle state
const CalendarTemplate: React.FC<any> = args => {
   const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)

   const handleSelectionChange = (date: CalendarDate | null) => {
      setSelectedDate(date)
      action('onSelectionChange')(date)
   }

   return (
      <div style={{ padding: '20px' }}>
         <Calendar
            {...args}
            value={selectedDate}
            onSelectionChange={handleSelectionChange}
         />
         {selectedDate && (
            <div
               style={{
                  marginTop: '16px',
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px'
               }}
            >
               Selected Date: {selectedDate.toString()}
            </div>
         )}
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const Disabled: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      isDisabled: true
   }
}

export const ReadOnly: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      isReadOnly: true
   }
}

export const WithError: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date'
   }
}

export const WithMinMaxDate: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      minValue: new CalendarDate(2024, 1, 1),
      maxValue: new CalendarDate(2024, 12, 31)
   }
}

export const WithDefaultValue: Story = {
   render: args => <CalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      defaultValue: new CalendarDate(2024, 6, 15)
   }
}
