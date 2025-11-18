import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CalendarHeader } from './CalendarHeader'

const meta: Meta<typeof CalendarHeader> = {
   title: 'Components/RACCalendarHeader',
   component: CalendarHeader,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that renders the header of a calendar with month title and navigation buttons.'
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

type Story = StoryObj<typeof CalendarHeader>

// Stories
export const Default: Story = {
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
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
            <CalendarHeader size='ExtraSmall' />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size:</h4>
            <CalendarHeader size='Small' />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size:</h4>
            <CalendarHeader size='Medium' />
         </div>
      </div>
   )
}
