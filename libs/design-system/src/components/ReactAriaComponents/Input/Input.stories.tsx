import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from './Input'

const meta: Meta<typeof Input> = {
   title: 'Components/RACInput',
   component: Input,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Medium'
      },
      type: {
         control: 'select',
         options: [
            'text',
            'email',
            'password',
            'number',
            'tel',
            'url',
            'search'
         ],
         defaultValue: 'text'
      },
      placeholder: {
         control: 'text',
         defaultValue: 'Enter text...'
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof Input>

// Template component to handle state
const InputTemplate: React.FC<any> = args => {
   const [value, setValue] = useState('')

   const handleValueChange = (newValue: string) => {
      setValue(newValue)
      action('onValueChange')(newValue)
   }

   return (
      <div style={{ padding: '20px', width: '300px' }}>
         <Input {...args} value={value} onValueChange={handleValueChange} />
         <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            Value: {value || '(empty)'}
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'ExtraSmall'
   }
}

export const EmailInput: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      type: 'email',
      placeholder: 'Enter email address...'
   }
}

export const PasswordInput: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      type: 'password',
      placeholder: 'Enter password...'
   }
}

export const NumberInput: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      type: 'number',
      placeholder: 'Enter number...'
   }
}

export const SearchInput: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      type: 'search',
      placeholder: 'Search...'
   }
}

export const WithCustomClass: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      className: 'custom-input-class'
   }
}

export const WithDefaultValue: Story = {
   render: args => <InputTemplate {...args} />,
   args: {
      size: 'Medium',
      defaultValue: 'Default text value'
   }
}
