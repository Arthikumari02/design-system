import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Label from './Label'

const meta: Meta<typeof Label> = {
   title: 'Components/RACLabel',
   component: Label,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      containerClassName: {
         control: 'text',
         description: 'Custom CSS class for the container'
      }
   }
}

export default meta

type Story = StoryObj<typeof Label>

// Stories
export const Default: Story = {
   args: {
      children: 'Sample Label',
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   args: {
      ...Default.args,
      size: 'Small'
   }
}

export const Required: Story = {
   args: {
      ...Default.args,
      isRequired: true
   }
}

export const WithCustomClass: Story = {
   args: {
      ...Default.args,
      containerClassName: 'custom-label-class'
   }
}

export const LongText: Story = {
   args: {
      ...Default.args,
      children:
         'This is a very long label text that might wrap to multiple lines and should be displayed properly'
   }
}

export const WithContextualHelp: Story = {
   args: {
      ...Default.args,
      isRequired: true,
      contextualHelp: () => (
         <span style={{ color: '#666', fontSize: '12px', marginLeft: '4px' }}>
            (Click for help)
         </span>
      )
   }
}

export const WithCustomRequiredContent: Story = {
   args: {
      ...Default.args,
      isRequired: true,
      contextualHelp: () => (
         <span style={{ color: 'red', fontSize: '14px', marginLeft: '4px' }}>
            Required
         </span>
      )
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
            <Label size='Small'>Small Label</Label>
         </div>
         <div>
            <Label size='Medium'>Medium Label</Label>
         </div>
         <div>
            <Label size='Small' isRequired>
               Small Required Label
            </Label>
         </div>
         <div>
            <Label size='Medium' isRequired>
               Medium Required Label
            </Label>
         </div>
         <div>
            <Label
               size='Medium'
               isRequired
               contextualHelp={() => (
                  <span
                     style={{
                        color: '#666',
                        fontSize: '12px',
                        marginLeft: '4px'
                     }}
                  >
                     (Help)
                  </span>
               )}
            >
               Label with Contextual Help
            </Label>
         </div>
      </div>
   )
}
