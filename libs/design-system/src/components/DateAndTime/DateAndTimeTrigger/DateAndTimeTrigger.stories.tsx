import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DateAndTimeTrigger from './DateAndTimeTrigger'

const meta: Meta<typeof DateAndTimeTrigger> = {
   title: 'Components/DateAndTime/DateAndTimeTrigger',
   component: DateAndTimeTrigger,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A trigger component for date and time selection with calendar icon and optional close button.'
         }
      }
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Small'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      shouldShowCloseButton: {
         control: 'boolean',
         defaultValue: false
      },
      placeholderText: {
         control: 'text',
         defaultValue: 'Select Date Time'
      },
      customFormat: {
         control: 'text',
         defaultValue: 'MMM dd, yyyy HH:mm'
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof DateAndTimeTrigger>

// Stories
export const Default: Story = {
   args: {
      size: 'Small',
      isDisabled: false,
      placeholderText: 'Select Date Time'
   }
}

export const WithValue: Story = {
   args: {
      ...Default.args,
      value: new Date('2024-06-15T10:30:00')
   }
}

export const WithCloseButton: Story = {
   args: {
      ...WithValue.args,
      shouldShowCloseButton: true,
      onClickCloseIcon: action('onClickCloseIcon')
   }
}

export const Disabled: Story = {
   args: {
      ...Default.args,
      isDisabled: true
   }
}

export const DisabledWithValue: Story = {
   args: {
      ...WithValue.args,
      isDisabled: true
   }
}

export const SmallSize: Story = {
   args: {
      ...Default.args,
      size: 'Small'
   }
}

export const MediumSize: Story = {
   args: {
      ...Default.args,
      size: 'Medium'
   }
}

export const ExtraSmallSize: Story = {
   args: {
      ...Default.args,
      size: 'ExtraSmall'
   }
}

export const CustomFormat: Story = {
   args: {
      ...WithValue.args,
      customFormat: 'yyyy-MM-dd HH:mm:ss'
   }
}

export const CustomPlaceholder: Story = {
   args: {
      ...Default.args,
      placeholderText: 'Choose your preferred date and time'
   }
}

export const WithCustomClass: Story = {
   args: {
      ...Default.args,
      className: 'custom-date-trigger-class'
   }
}

export const LongDateValue: Story = {
   args: {
      ...Default.args,
      value: new Date('2024-12-25T23:59:59'),
      customFormat: "EEEE, MMMM do, yyyy 'at' h:mm a"
   }
}

export const AllVariants: Story = {
   render: () => (
      <div
         style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
         }}
      >
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Default (Empty):</h4>
            <DateAndTimeTrigger
               isDisabled={false}
               placeholderText='Select Date Time'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>With Value:</h4>
            <DateAndTimeTrigger
               isDisabled={false}
               value={new Date('2024-06-15T10:30:00')}
               placeholderText='Select Date Time'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>With Close Button:</h4>
            <DateAndTimeTrigger
               isDisabled={false}
               value={new Date('2024-06-15T10:30:00')}
               shouldShowCloseButton={true}
               onClickCloseIcon={action('onClickCloseIcon')}
               placeholderText='Select Date Time'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Disabled:</h4>
            <DateAndTimeTrigger
               isDisabled={true}
               placeholderText='Select Date Time'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Different Sizes:</h4>
            <div
               style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
               <DateAndTimeTrigger
                  isDisabled={false}
                  size='ExtraSmall'
                  placeholderText='Extra Small'
               />
               <DateAndTimeTrigger
                  isDisabled={false}
                  size='Small'
                  placeholderText='Small'
               />
               <DateAndTimeTrigger
                  isDisabled={false}
                  size='Medium'
                  placeholderText='Medium'
               />
            </div>
         </div>
      </div>
   )
}
