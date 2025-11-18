import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { AsyncMultiSelectComboBox } from './AsyncMultiSelectComboBox'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

const meta: Meta<typeof AsyncMultiSelectComboBox> = {
   title: 'Components/AsyncMultiSelectComboBox',
   component: AsyncMultiSelectComboBox,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      isClearable: {
         control: 'boolean',
         defaultValue: true
      },
      shouldShowDropdownIcon: {
         control: 'boolean',
         defaultValue: true
      },
      showSelectedValue: {
         control: 'boolean',
         defaultValue: true
      },
      size: {
         control: 'radio',
         options: ['Small', 'Medium'],
         defaultValue: 'Small'
      },
      selectionMode: {
         control: 'radio',
         options: ['single', 'multiple'],
         defaultValue: 'multiple'
      }
   }
}

export default meta

type Story = StoryObj<typeof AsyncMultiSelectComboBox>

// Sample data
const sampleItems: ListItemType[] = [
   { key: '1', textValue: 'Async Option 1' },
   { key: '2', textValue: 'Async Option 2' },
   { key: '3', textValue: 'Async Option 3' },
   { key: '4', textValue: 'Async Option 4' },
   { key: '5', textValue: 'Async Option 5' }
]

const userItems: ListItemType[] = [
   { key: 'user1', textValue: 'John Doe' },
   { key: 'user2', textValue: 'Jane Smith' },
   { key: 'user3', textValue: 'Bob Johnson' },
   { key: 'user4', textValue: 'Alice Brown' },
   { key: 'user5', textValue: 'Charlie Wilson' }
]

// Template component to handle state
const AsyncMultiSelectComboBoxTemplate: React.FC<any> = args => {
   const [selectedItems, setSelectedItems] = useState<ListItemType[]>([])
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])

   const handleSelectionChange = (keys: string[], isFromPopover?: boolean) => {
      const newSelectedItems = args.items.filter((item: ListItemType) =>
         keys.includes(String(item.key))
      )
      setSelectedItems(newSelectedItems)
      setSelectedKeys(keys)
      action('onSelectionChange')(keys, isFromPopover)
   }

   const renderCustomSelectedOption = (
      item: ListItemType,
      isInPopover?: boolean
   ) => (
      <div
         style={{
            padding: '4px 8px',
            backgroundColor: isInPopover ? '#f0f0f0' : '#e3f2fd',
            borderRadius: '4px',
            margin: '2px',
            fontSize: '12px',
            border: '1px solid #ccc'
         }}
      >
         {item.textValue}
      </div>
   )

   return (
      <div style={{ width: '300px' }}>
         <AsyncMultiSelectComboBox
            {...args}
            items={args.items}
            selectedItems={selectedItems}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            renderCustomSelectedOption={
               args.showCustomRender ? renderCustomSelectedOption : undefined
            }
         />
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      items: sampleItems,
      label: 'Async Select',
      placeholder: 'Search and select...',
      selectionMode: 'multiple',
      size: 'Small'
   }
}

export const WithCustomRender: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      label: 'With Custom Render'
   }
}

export const UserSelection: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      items: userItems,
      label: 'Select Users',
      placeholder: 'Search users...'
   }
}

export const SingleSelection: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      selectionMode: 'single',
      placeholder: 'Choose one option...'
   }
}

export const Disabled: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      isDisabled: true,
      label: 'Disabled Async Select'
   }
}

export const Required: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      isRequired: true,
      label: 'Required Field *'
   }
}

export const WithoutClearButton: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      isClearable: false,
      label: 'No Clear Button'
   }
}

export const WithoutDropdownIcon: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      shouldShowDropdownIcon: false,
      label: 'No Dropdown Icon'
   }
}

export const WithoutSelectedValue: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      showSelectedValue: false,
      label: 'Hide Selected Value'
   }
}

export const LargeSize: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      size: 'Medium',
      label: 'Large Size'
   }
}

export const WithHint: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      hint: 'This is a helpful hint for the user',
      label: 'With Hint'
   }
}

export const WithError: Story = {
   render: args => <AsyncMultiSelectComboBoxTemplate {...args} />,
   args: {
      ...Default.args,
      errorMessage: 'This field is required',
      label: 'With Error'
   }
}
