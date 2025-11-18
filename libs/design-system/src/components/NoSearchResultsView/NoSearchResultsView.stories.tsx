import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { NoSearchResultsView } from './NoSearchResultsView'

const meta: Meta<typeof NoSearchResultsView> = {
   title: 'Components/NoSearchResultsView',
   component: NoSearchResultsView,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component to display when no search results are found.'
         }
      }
   },
   argTypes: {
      textClassName: {
         control: 'text',
         description: 'Custom CSS class for the text styling'
      }
   }
}

export default meta

type Story = StoryObj<typeof NoSearchResultsView>

// Stories
export const Default: Story = {
   args: {}
}

export const WithCustomTextClass: Story = {
   args: {
      textClassName: 'text-blue-600 font-semibold'
   }
}

export const WithLargeText: Story = {
   args: {
      textClassName: 'text-xl font-bold'
   }
}

export const WithCustomColor: Story = {
   args: {
      textClassName: 'text-red-500'
   }
}

export const WithItalicText: Story = {
   args: {
      textClassName: 'italic'
   }
}

export const WithUnderlinedText: Story = {
   args: {
      textClassName: 'underline'
   }
}

export const WithCustomSpacing: Story = {
   args: {
      textClassName: 'mt-4 mb-2'
   }
}
