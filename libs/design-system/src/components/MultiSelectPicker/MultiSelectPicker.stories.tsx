import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { MultiSelectPicker } from './MultiSelectPicker'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'

const meta: Meta<typeof MultiSelectPicker> = {
   title: 'Components/MultiSelectPicker',
   component: MultiSelectPicker,
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

type Story = StoryObj<typeof MultiSelectPicker>

// Sample data
const sampleItems: ListItemType[] = [
   { key: '1', textValue: 'Option 1' },
   { key: '2', textValue: 'Option 2' },
   { key: '3', textValue: 'Option 3' },
   { key: '4', textValue: 'Option 4' },
   { key: '5', textValue: 'Option 5' }
]

const colorItems: ListItemType[] = [
   { key: 'red', textValue: 'Red' },
   { key: 'blue', textValue: 'Blue' },
   { key: 'green', textValue: 'Green' },
   { key: 'yellow', textValue: 'Yellow' },
   { key: 'purple', textValue: 'Purple' }
]

// Template component to handle state
const MultiSelectPickerTemplate: React.FC<any> = args => {
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

   return (
      <div style={{ width: '300px' }}>
         <MultiSelectPicker
            {...args}
            items={args.items}
            selectedItems={selectedItems}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
         />
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      items: sampleItems,
      label: 'Select Options',
      placeholder: 'Choose options...',
      selectionMode: 'multiple',
      size: 'Small'
   }
}

export const SingleSelection: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      selectionMode: 'single',
      placeholder: 'Choose one option...'
   }
}

export const ColorPicker: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      items: colorItems,
      label: 'Select Colors',
      placeholder: 'Choose colors...'
   }
}

export const Disabled: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      isDisabled: true,
      label: 'Disabled Picker'
   }
}

export const Required: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      isRequired: true,
      label: 'Required Field *'
   }
}

export const WithoutClearButton: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      isClearable: false,
      label: 'No Clear Button'
   }
}

export const WithoutDropdownIcon: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      shouldShowDropdownIcon: false,
      label: 'No Dropdown Icon'
   }
}

export const LargeSize: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      size: 'Medium',
      label: 'Large Size'
   }
}

export const WithHint: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      hint: 'This is a helpful hint for the user',
      label: 'With Hint'
   }
}

export const WithError: Story = {
   render: args => <MultiSelectPickerTemplate {...args} />,
   args: {
      ...Default.args,
      errorMessage: 'This field is required',
      label: 'With Error'
   }
}
