import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CalendarDate } from '@internationalized/date'

import DateInput from './DateInput'

const meta: Meta<typeof DateInput> = {
   title: 'Components/RACDateInput',
   component: DateInput,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Medium'
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof DateInput>

// Template component to handle state
const DateInputTemplate: React.FC<any> = args => {
   const [value, setValue] = useState<CalendarDate | null>(null)

   const handleValueChange = (date: CalendarDate | null) => {
      setValue(date)
      action('onValueChange')(date)
   }

   return (
      <div style={{ padding: '20px' }}>
         <DateInput {...args} value={value} onValueChange={handleValueChange} />
         {value && (
            <div
               style={{
                  marginTop: '16px',
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px'
               }}
            >
               Selected Date: {value.toString()}
            </div>
         )}
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <DateInputTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <DateInputTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <DateInputTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const WithCustomClass: Story = {
   render: args => <DateInputTemplate {...args} />,
   args: {
      size: 'Medium',
      className: 'custom-date-input-class'
   }
}
