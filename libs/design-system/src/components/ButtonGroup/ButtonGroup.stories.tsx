// ButtonGroup.stories.tsx
import React, { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ProfileIcon } from '../../icons/ProfileIcon'
import { UserIcon } from '../../icons/UserIcon'
import { OutlineSunIcon } from '../../icons/OutlineSunIcon'
import { OutlineStarIcon } from '../../icons/OutlineStarIcon'
import { IconPropsType } from '../../types'

import { ButtonGroup } from './index'
import {
   ButtonGroupProps,
   DefaultOptionType,
   IconVariantOptionType
} from './types'

const meta: Meta<typeof ButtonGroup> = {
   title: 'Components/ButtonGroup',
   component: ButtonGroup,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      variant: {
         control: 'radio',
         options: ['ICON', 'PLAIN', 'OUTLINE'],
         defaultValue: 'OUTLINE'
      },
      size: {
         control: 'radio',
         options: ['Small', 'Large'],
         defaultValue: 'Small'
      },
      placement: {
         control: 'select',
         options: ['bottom left', 'bottom right', 'top left', 'top right'],
         defaultValue: 'bottom right'
      }
   }
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

// Icon renderers
const renderIcon =
   (Icon: React.ComponentType<IconPropsType>) =>
   ({ width = 20, height = 20 }: IconPropsType): React.ReactElement => (
      <Icon height={height} width={width} />
   )

// Options for different variants
const outlineAndPlainOptions: DefaultOptionType[] = [
   {
      id: 'option-1',
      value: 'Option 1',
      label: 'First Option',
      icon: args => (
         <OutlineSunIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Option 1')
   },
   {
      id: 'option-2',
      value: 'Option 2',
      label: 'Second Option',
      icon: args => (
         <OutlineStarIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Option 2')
   },
   {
      id: 'option-3',
      value: 'Option 3',
      label: 'Third Option with Icon',
      icon: args => (
         <ProfileIcon
            {...args}
            width={20}
            height={20}
            className='fill-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Option 3')
   },
   {
      id: 'option-4',
      value: 'Option 4',
      label: 'Fourth Option with Icon',
      icon: args => (
         <UserIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Option 4')
   }
]

const iconOptions: IconVariantOptionType[] = [
   {
      id: 'icon-1',
      value: 'icon-1',
      label: 'Profile',
      icon: args => (
         <ProfileIcon
            {...args}
            width={20}
            height={20}
            className='fill-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Profile')
   },
   {
      id: 'icon-2',
      value: 'icon-2',
      label: 'User',
      icon: args => (
         <UserIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked User')
   },
   {
      id: 'icon-3',
      value: 'icon-3',
      label: 'Sun',
      icon: args => (
         <OutlineSunIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Sun')
   },
   {
      id: 'icon-4',
      value: 'icon-4',
      label: 'Star',
      icon: args => (
         <OutlineStarIcon
            {...args}
            width={20}
            height={20}
            className='stroke-button-secondary-fg'
         />
      ),
      onClick: () => console.log('Clicked Star')
   }
]

// Template component to handle state
const ButtonGroupTemplate: React.FC<ButtonGroupProps> = args => {
   const selectedOption = useMemo(
      () => args.options.find(item => item.id === args.selectedOptionId),
      [args.selectedOptionId]
   )

   const [selectedValue, setSelectedValue] = useState<string>(
      selectedOption?.value ?? ''
   )
   const [selectedOptionId, setSelectedOptionId] = useState<string>(
      selectedOption?.id ?? ''
   )

   const onSelectionChange = (optionId: string, value: string) => {
      setSelectedOptionId(optionId)
      setSelectedValue(value)
      console.log(`Selected: ${value} (ID: ${optionId})`)
   }

   return (
      <ButtonGroup
         {...args}
         selectedValue={selectedValue}
         selectedOptionId={selectedOptionId}
         onSelectionChange={onSelectionChange}
      />
   )
}

// Stories
export const OutlineVariant: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      variant: 'OUTLINE',
      size: 'Small',
      options: outlineAndPlainOptions,
      placement: 'bottom right',
      placeholderText: 'Select an option'
   }
}

export const PlainVariant: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      variant: 'PLAIN',
      size: 'Small',
      options: outlineAndPlainOptions,
      placement: 'bottom right',
      placeholderText: 'Select an option'
   }
}

export const IconVariant: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      variant: 'ICON',
      size: 'Small',
      options: iconOptions,
      placement: 'bottom right'
   }
}

// Additional stories for specific cases
export const SmallSize: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      ...OutlineVariant.args,
      size: 'Small'
   }
}

export const LargeSize: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      ...OutlineVariant.args,
      size: 'Large'
   }
}

export const CustomPlaceholder: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      ...OutlineVariant.args,
      placeholderText: 'Custom placeholder text'
   }
}

export const WithPreselectedOption: Story = {
   render: args => <ButtonGroupTemplate {...args} />,
   args: {
      ...OutlineVariant.args,
      selectedOptionId: 'option-1',
      selectedValue: 'Option 1'
   }
}
