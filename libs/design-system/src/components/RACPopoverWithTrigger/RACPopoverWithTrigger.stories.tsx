import React, { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RACPopoverWithTrigger from './RACPopoverWithTrigger'

const meta: Meta<typeof RACPopoverWithTrigger> = {
   title: 'Components/RACPopoverWithTrigger',
   component: RACPopoverWithTrigger,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      placement: {
         control: 'select',
         options: [
            'top',
            'bottom',
            'left',
            'right',
            'top start',
            'top end',
            'bottom start',
            'bottom end',
            'left top',
            'left bottom',
            'right top',
            'right bottom'
         ],
         defaultValue: 'bottom'
      },
      offset: {
         control: 'number',
         defaultValue: 8
      },
      crossOffset: {
         control: 'number',
         defaultValue: 0
      },
      shouldFlip: {
         control: 'boolean',
         defaultValue: true
      },
      shouldUpdatePosition: {
         control: 'boolean',
         defaultValue: true
      }
   }
}

export default meta

type Story = StoryObj<typeof RACPopoverWithTrigger>

// Template component to handle state
const RACPopoverWithTriggerTemplate: React.FC<any> = args => {
   const [isOpen, setIsOpen] = useState(false)
   const triggerRef = useRef<HTMLButtonElement>(null)

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      action('onOpenChange')(open)
   }

   const renderTrigger = () => (
      <button
         ref={triggerRef}
         onClick={() => setIsOpen(!isOpen)}
         style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer'
         }}
      >
         {args.triggerText || 'Click to open popover'}
      </button>
   )

   const renderPopoverBody = () => (
      <div
         style={{
            padding: '16px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minWidth: '200px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
         }}
      >
         <h3 style={{ margin: '0 0 8px 0' }}>Popover Content</h3>
         <p style={{ margin: '0 0 12px 0' }}>
            This is the content inside the popover. You can put any React
            components here.
         </p>
         <button
            onClick={() => setIsOpen(false)}
            style={{
               padding: '4px 8px',
               border: '1px solid #ccc',
               borderRadius: '2px',
               backgroundColor: '#f0f0f0',
               cursor: 'pointer'
            }}
         >
            Close
         </button>
      </div>
   )

   return (
      <div style={{ padding: '20px' }}>
         <RACPopoverWithTrigger
            {...args}
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
            triggerRef={triggerRef}
            renderTrigger={renderTrigger}
            renderPopoverBody={renderPopoverBody}
         />
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      placement: 'bottom',
      offset: 8
   }
}

export const TopPlacement: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      placement: 'top'
   }
}

export const LeftPlacement: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      placement: 'left'
   }
}

export const RightPlacement: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      placement: 'right'
   }
}

export const WithCustomOffset: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      offset: 16
   }
}

export const WithCrossOffset: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      crossOffset: 10
   }
}

export const WithoutFlip: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      shouldFlip: false
   }
}

export const WithoutPositionUpdate: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      shouldUpdatePosition: false
   }
}

export const WithCustomStyles: Story = {
   render: args => <RACPopoverWithTriggerTemplate {...args} />,
   args: {
      ...Default.args,
      className: 'custom-popover-class',
      underlayClassName: 'custom-underlay-class'
   }
}
