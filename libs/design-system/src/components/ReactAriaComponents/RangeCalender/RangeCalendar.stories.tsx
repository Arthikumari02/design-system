import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CalendarDate } from '@internationalized/date'

import RangeCalendar from './RangeCalendar'

const meta: Meta<typeof RangeCalendar> = {
   title: 'Components/RACRangeCalendar',
   component: RangeCalendar,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Medium'
      }
   }
}

export default meta

type Story = StoryObj<typeof RangeCalendar>

// Template component to handle state
const RangeCalendarTemplate: React.FC<any> = args => {
   const [value, setValue] = useState<
      { start: CalendarDate | null; end: CalendarDate | null } | undefined
   >(undefined)

   const handleValueChange = (range: {
      start: CalendarDate | null
      end: CalendarDate | null
   }) => {
      setValue(range)
      action('onValueChange')(range)
   }

   // Only pass value if at least one date is selected
   const calendarValue = value && (value.start || value.end) ? value : undefined

   return (
      <div style={{ padding: '20px' }}>
         <RangeCalendar
            {...args}
            value={calendarValue}
            onValueChange={handleValueChange}
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
            Start: {value?.start ? value.start.toString() : 'None'}
            <br />
            End: {value?.end ? value.end.toString() : 'None'}
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const WithError: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      errorMessage: 'Please select a valid date range'
   }
}

export const WithMinMaxDate: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      minValue: new CalendarDate(2024, 1, 1),
      maxValue: new CalendarDate(2024, 12, 31)
   }
}

export const WithDefaultValue: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      defaultValue: {
         start: new CalendarDate(2024, 6, 15),
         end: new CalendarDate(2024, 6, 20)
      }
   }
}

export const Disabled: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      isDisabled: true
   }
}

export const ReadOnly: Story = {
   render: args => <RangeCalendarTemplate {...args} />,
   args: {
      size: 'Medium',
      isReadOnly: true
   }
}
