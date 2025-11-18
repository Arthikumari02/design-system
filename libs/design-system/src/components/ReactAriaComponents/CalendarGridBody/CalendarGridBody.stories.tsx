import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDate } from '@internationalized/date'
import Calendar from '../Calendar/Calendar'
import CalendarGridBody from './CalendarGridBody'

const meta: Meta<typeof CalendarGridBody> = {
   title: 'Components/RACCalendarGridBody',
   component: CalendarGridBody,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that renders the body of a calendar grid with date cells.'
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

type Story = StoryObj<typeof CalendarGridBody>

// Template to wrap CalendarGridBody in Calendar
const CalendarGridBodyTemplate: React.FC<any> = args => (
   <div style={{ padding: '20px' }}>
      <Calendar size={args.size} defaultValue={new CalendarDate(2024, 6, 15)}>
         <CalendarGridBody size={args.size} />
      </Calendar>
   </div>
)

// Stories
export const Default: Story = {
   render: args => <CalendarGridBodyTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <CalendarGridBodyTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <CalendarGridBodyTemplate {...args} />,
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
               <CalendarGridBody size='ExtraSmall' />
            </Calendar>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size:</h4>
            <Calendar size='Small' defaultValue={new CalendarDate(2024, 6, 15)}>
               <CalendarGridBody size='Small' />
            </Calendar>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size:</h4>
            <Calendar
               size='Medium'
               defaultValue={new CalendarDate(2024, 6, 15)}
            >
               <CalendarGridBody size='Medium' />
            </Calendar>
         </div>
      </div>
   )
}
