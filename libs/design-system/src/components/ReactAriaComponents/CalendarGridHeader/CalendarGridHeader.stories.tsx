import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDate } from '@internationalized/date'
import Calendar from '../Calendar/Calendar'
import { CalendarGridHeader } from './CalendarGridHeader'

const meta: Meta<typeof CalendarGridHeader> = {
   title: 'Components/RACCalendarGridHeader',
   component: CalendarGridHeader,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that renders the header of a calendar grid with day names.'
         }
      }
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

type Story = StoryObj<typeof CalendarGridHeader>

// Template to wrap CalendarGridHeader in Calendar
const CalendarGridHeaderTemplate: React.FC<any> = args => (
   <div style={{ padding: '20px' }}>
      <Calendar size={args.size} defaultValue={new CalendarDate(2024, 6, 15)}>
         <CalendarGridHeader size={args.size} />
      </Calendar>
   </div>
)

// Stories
export const Default: Story = {
   render: args => <CalendarGridHeaderTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <CalendarGridHeaderTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <CalendarGridHeaderTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const AllSizes: Story = {
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
            <h4 style={{ margin: '0 0 8px 0' }}>Extra Small Size:</h4>
            <Calendar
               size='ExtraSmall'
               defaultValue={new CalendarDate(2024, 6, 15)}
            >
               <CalendarGridHeader size='ExtraSmall' />
            </Calendar>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size:</h4>
            <Calendar size='Small' defaultValue={new CalendarDate(2024, 6, 15)}>
               <CalendarGridHeader size='Small' />
            </Calendar>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size:</h4>
            <Calendar
               size='Medium'
               defaultValue={new CalendarDate(2024, 6, 15)}
            >
               <CalendarGridHeader size='Medium' />
            </Calendar>
         </div>
      </div>
   )
}
