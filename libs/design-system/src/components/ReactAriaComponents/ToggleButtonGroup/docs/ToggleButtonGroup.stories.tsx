import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Key } from '@react-types/shared'

import {
   ToggleButtonGroup,
   ToggleButtonGroupButton
} from '../ToggleButtonGroup'

const meta = {
   component: ToggleButtonGroup,
   title: 'components/ToggleButtonGroup',
   parameters: {
      layout: 'centered'
   }
} satisfies Meta<typeof ToggleButtonGroup>

export default meta
type Story = StoryObj<typeof ToggleButtonGroup>

// Wrapper component to handle state for stories
const PrimaryExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option1'])
   )

   return (
      <ToggleButtonGroup
         variant='Primary'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
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
   )
}

/**
 * Primary variant of the ToggleButtonGroup.
 */
export const Primary: Story = {
   render: () => <PrimaryExample />
}

// Secondary variant wrapper
const SecondaryExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option2'])
   )

   return (
      <ToggleButtonGroup
         variant='Secondary'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
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
   )
}

/**
 * Secondary variant of the ToggleButtonGroup.
 */
export const Secondary: Story = {
   render: () => <SecondaryExample />
}

// Gray variant wrapper
const GrayExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option3'])
   )

   return (
      <ToggleButtonGroup
         variant='Gray'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
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
   )
}

/**
 * Gray variant of the ToggleButtonGroup.
 */
export const Gray: Story = {
   render: () => <GrayExample />
}

// Multiple selection wrapper
const MultipleSelectionExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option1', 'option3'])
   )

   return (
      <ToggleButtonGroup
         variant='Primary'
         selectionMode='multiple'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
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
   )
}

/**
 * ToggleButtonGroup with multiple selection.
 */
export const MultipleSelection: Story = {
   render: () => <MultipleSelectionExample />
}

// Default selected wrapper
const DefaultSelectedExample = () => (
   <ToggleButtonGroup
      variant='Primary'
      selectionMode='single'
      defaultSelectedKeys={new Set(['option2'])}
   >
      <ToggleButtonGroupButton id='option1'>Option 1</ToggleButtonGroupButton>
      <ToggleButtonGroupButton id='option2'>Option 2</ToggleButtonGroupButton>
      <ToggleButtonGroupButton id='option3'>Option 3</ToggleButtonGroupButton>
   </ToggleButtonGroup>
)

/**
 * ToggleButtonGroup with default selected keys.
 */
export const DefaultSelected: Story = {
   render: () => <DefaultSelectedExample />
}

// Controlled selection wrapper
const ControlledSelectionExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option1'])
   )

   const handleSelectionChange = (keys: Set<Key>) => {
      setSelectedKeys(keys)
   }

   return (
      <ToggleButtonGroup
         variant='Primary'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={handleSelectionChange}
      >
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
   )
}

/**
 * ToggleButtonGroup with controlled selection.
 */
export const ControlledSelection: Story = {
   render: () => <ControlledSelectionExample />
}

// Disabled wrapper
const DisabledExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option1'])
   )

   return (
      <ToggleButtonGroup
         variant='Primary'
         isDisabled={true}
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
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
   )
}

/**
 * ToggleButtonGroup with disabled state.
 */
export const Disabled: Story = {
   render: () => <DisabledExample />
}

// Individual disabled wrapper
const IndividualDisabledExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option3'])
   )

   return (
      <ToggleButtonGroup
         variant='Primary'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
      >
         <ToggleButtonGroupButton id='option1'>
            Option 1
         </ToggleButtonGroupButton>
         <ToggleButtonGroupButton id='option2' isDisabled>
            Option 2
         </ToggleButtonGroupButton>
         <ToggleButtonGroupButton id='option3'>
            Option 3
         </ToggleButtonGroupButton>
      </ToggleButtonGroup>
   )
}

/**
 * ToggleButtonGroup with individual disabled buttons.
 */
export const IndividualDisabled: Story = {
   render: () => <IndividualDisabledExample />
}

// Small size variant wrapper
const SmallSizeExample = () => {
   const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['option1'])
   )

   return (
      <ToggleButtonGroup
         variant='Primary'
         selectionMode='single'
         selectedKeys={selectedKeys}
         onSelectionChange={setSelectedKeys}
         size='Small'
      >
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
   )
}

/**
 * ToggleButtonGroup with small size variant.
 */
export const SmallSize: Story = {
   render: () => <SmallSizeExample />
}
