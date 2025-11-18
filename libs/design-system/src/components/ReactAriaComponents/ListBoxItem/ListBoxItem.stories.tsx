import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ListBox } from 'react-aria-components'

import ListBoxItem from './ListBoxItem'
import { ListItemType } from './types'

const meta: Meta<typeof ListBoxItem> = {
   title: 'Components/RACListBoxItem',
   component: ListBoxItem,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      containerClassName: {
         control: 'text',
         description: 'Custom CSS class for the container'
      }
   }
}

export default meta

type Story = StoryObj<typeof ListBoxItem>

// Sample data
const sampleItem: ListItemType = {
   key: '1',
   textValue: 'Sample List Item'
}

const longTextItem: ListItemType = {
   key: '2',
   textValue:
      'This is a very long list item text that might wrap to multiple lines and should be truncated properly'
}

// Template component to handle state
const ListBoxItemTemplate: React.FC<any> = args => {
   return (
      <div style={{ padding: '20px', width: '300px' }}>
         <div
            style={{
               border: '1px solid #ccc',
               borderRadius: '4px',
               overflow: 'hidden'
            }}
         >
            <ListBox>
               <ListBoxItem
                  {...args}
                  item={args.item}
                  isSelected={args.isSelected}
                  isFocused={args.isFocused}
                  isHovered={args.isHovered}
                  isDisabled={args.isDisabled}
               >
                  {args.item.textValue}
               </ListBoxItem>
            </ListBox>
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      item: sampleItem,
      isSelected: false,
      isFocused: false,
      isHovered: false,
      isDisabled: false
   }
}

export const Selected: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      isSelected: true
   }
}

export const Focused: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      isFocused: true
   }
}

export const Hovered: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      isHovered: true
   }
}

export const Disabled: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      isDisabled: true
   }
}

export const SelectedAndFocused: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      isSelected: true,
      isFocused: true
   }
}

export const LongText: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      item: longTextItem
   }
}

export const WithCustomClass: Story = {
   render: args => <ListBoxItemTemplate {...args} />,
   args: {
      ...Default.args,
      containerClassName: 'custom-list-item-class'
   }
}

export const AllStates: Story = {
   render: () => (
      <div style={{ padding: '20px', width: '300px' }}>
         <div
            style={{
               border: '1px solid #ccc',
               borderRadius: '4px',
               overflow: 'hidden'
            }}
         >
            <ListBox>
               <ListBoxItem
                  item={sampleItem}
                  isSelected={false}
                  isFocused={false}
                  isHovered={false}
                  isDisabled={false}
                  isPressed={false}
                  isFocusVisible={false}
                  selectionMode='single'
                  selectionBehavior='replace'
               >
                  Normal State
               </ListBoxItem>
               <ListBoxItem
                  item={sampleItem}
                  isSelected={true}
                  isFocused={false}
                  isHovered={false}
                  isDisabled={false}
                  isPressed={false}
                  isFocusVisible={false}
                  selectionMode='single'
                  selectionBehavior='replace'
               >
                  Selected State
               </ListBoxItem>
               <ListBoxItem
                  item={sampleItem}
                  isSelected={false}
                  isFocused={true}
                  isHovered={false}
                  isDisabled={false}
                  isPressed={false}
                  isFocusVisible={true}
                  selectionMode='single'
                  selectionBehavior='replace'
               >
                  Focused State
               </ListBoxItem>
               <ListBoxItem
                  item={sampleItem}
                  isSelected={false}
                  isFocused={false}
                  isHovered={true}
                  isDisabled={false}
                  isPressed={false}
                  isFocusVisible={false}
                  selectionMode='single'
                  selectionBehavior='replace'
               >
                  Hovered State
               </ListBoxItem>
               <ListBoxItem
                  item={sampleItem}
                  isSelected={false}
                  isFocused={false}
                  isHovered={false}
                  isDisabled={true}
                  isPressed={false}
                  isFocusVisible={false}
                  selectionMode='single'
                  selectionBehavior='replace'
               >
                  Disabled State
               </ListBoxItem>
            </ListBox>
         </div>
      </div>
   )
}
