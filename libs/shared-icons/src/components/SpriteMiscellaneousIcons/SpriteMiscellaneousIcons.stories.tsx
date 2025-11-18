import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SpriteMiscellaneousIcons, {
   miscellaneousIcons
} from './SpriteMiscellaneousIcons'

interface StoryProps {
   className?: string
   searchable?: boolean
}

const meta = {
   component: SpriteMiscellaneousIcons,
   title: 'Components/SpriteMiscellaneousIcons',
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      className: {
         control: 'text',
         description: 'CSS class to apply to the container'
      },
      searchable: {
         control: 'boolean',
         description: 'Enable search functionality',
         defaultValue: false
      }
   }
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<typeof meta>

// Story with search functionality
export const WithSearch: Story = {
   render: args => <SpriteMiscellaneousIcons />
}
