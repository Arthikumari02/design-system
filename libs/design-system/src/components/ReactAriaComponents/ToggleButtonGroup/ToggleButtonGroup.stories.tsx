import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ToggleButtonGroup, ToggleButtonGroupButton } from './ToggleButtonGroup'

const meta: Meta<typeof ToggleButtonGroup> = {
   title: 'Components/RACToggleButtonGroup',
   component: ToggleButtonGroup,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      variant: {
         control: 'select',
         options: ['Primary', 'Secondary', 'Gray'],
         defaultValue: 'Primary'
      },
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small'],
         defaultValue: 'Small'
      },
      selectionMode: {
         control: 'radio',
         options: ['single', 'multiple'],
         defaultValue: 'single'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      disallowEmptySelection: {
         control: 'boolean',
         defaultValue: false
      }
   }
}

export default meta

type Story = StoryObj<typeof ToggleButtonGroup>

// Template component to handle state
const ToggleButtonGroupTemplate: React.FC<any> = args => {
   const handleSelectionChange = (keys: Set<string>) => {
      action('onSelectionChange')(Array.from(keys))
   }

   return (
      <div style={{ padding: '20px' }}>
         <ToggleButtonGroup {...args} onSelectionChange={handleSelectionChange}>
            <ToggleButtonGroupButton id='option1'>
               Option 1
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='option2'>
               Option 2
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='option3'>
               Option 3
            </ToggleButtonGroupButton>
         </ToggleButtonGroup>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />
}

export const SecondaryVariant: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      variant: 'Secondary'
   }
}

export const GrayVariant: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      variant: 'Gray'
   }
}

export const MultipleSelection: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      selectionMode: 'multiple'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const Disabled: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      isDisabled: true
   }
}

export const WithIcons: Story = {
   render: args => (
      <div style={{ padding: '20px' }}>
         <ToggleButtonGroup
            {...args}
            onSelectionChange={action('onSelectionChange')}
         >
            <ToggleButtonGroupButton id='list' leftIcon={<span>📋</span>}>
               List
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='grid' leftIcon={<span>⊞</span>}>
               Grid
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='calendar' leftIcon={<span>📅</span>}>
               Calendar
            </ToggleButtonGroupButton>
         </ToggleButtonGroup>
      </div>
   )
}

export const WithCustomClass: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      className: 'custom-toggle-group-class'
   }
}

export const DisallowEmptySelection: Story = {
   render: args => <ToggleButtonGroupTemplate {...args} />,
   args: {
      disallowEmptySelection: true
   }
}

export const LongTextButtons: Story = {
   render: args => (
      <div style={{ padding: '20px' }}>
         <ToggleButtonGroup
            {...args}
            onSelectionChange={action('onSelectionChange')}
         >
            <ToggleButtonGroupButton id='very-long-option'>
               Very Long Option Text
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='another-long-option'>
               Another Long Option Text
            </ToggleButtonGroupButton>
            <ToggleButtonGroupButton id='short'>Short</ToggleButtonGroupButton>
         </ToggleButtonGroup>
      </div>
   )
}
