import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { FeaturedIconSize } from '../../types'
import FeaturedIcon from './FeaturedIcon'

const meta: Meta<typeof FeaturedIcon> = {
   component: FeaturedIcon,
   title: 'Components/FeaturedIcon',
   parameters: {
      layout: 'centered'
   },
   tags: ['autodocs'],
   argTypes: {
      variant: {
         control: 'select',
         options: ['BRAND', 'GRAY', 'ERROR', 'WARNING', 'SUCCESS', 'CUSTOM'],
         description: 'The visual style variant of the icon'
      },
      iconId: {
         control: 'select',
         options: [
            'alert-circle',
            'check-circle',
            'x-circle',
            'settings-01',
            'user-01',
            'bell'
         ],
         description: 'The ID of the icon to display'
      },
      size: {
         control: 'select',
         options: ['sm', 'md', 'lg', 'xl'],
         description: 'The size of the icon'
      },
      bg: {
         control: 'color',
         description: 'Custom background color (only for CUSTOM variant)',
         if: { arg: 'variant', eq: 'CUSTOM' }
      },
      fg: {
         control: 'color',
         description: 'Custom foreground color (only for CUSTOM variant)',
         if: { arg: 'variant', eq: 'CUSTOM' }
      },
      iconClassName: {
         control: 'text',
         description: 'Custom icon class name (only for CUSTOM variant)',
         if: { arg: 'variant', eq: 'CUSTOM' }
      }
   }
}

export default meta
type Story = StoryObj<typeof FeaturedIcon>

/**
 * # FeaturedIcon Component
 *
 * The FeaturedIcon component is used to display icons with different styles and variants.
 * It supports both outline and solid types, with various color variants and sizes.
 */

/**
 * ## Outline Icons
 *
 * Outline icons have a transparent background with a colored outline.
 * Use the controls below to change the variant, icon, and size.
 */
export const OutlineIcons: Story = {
   args: {
      variant: 'BRAND',
      type: 'OUTLINE',
      iconId: 'alert-circle',
      size: 'lg',
      iconType: 'OUTLINE'
   },
   render: args => (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
         }}
      >
         <FeaturedIcon {...args} />
         <div style={{ fontSize: '14px', color: '#666' }}>
            Try changing the variant, icon, and size using the controls below
         </div>
      </div>
   )
}

/**
 * ## Solid Icons
 *
 * Solid icons have a colored background with a contrasting icon color.
 * Use the controls below to change the variant, icon, and size.
 */
export const SolidIcons: Story = {
   args: {
      variant: 'BRAND',
      type: 'SOLID',
      iconId: 'alert-circle',
      size: 'lg',
      iconType: 'SOLID'
   },
   render: args => (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
         }}
      >
         <FeaturedIcon {...args} />
         <div style={{ fontSize: '14px', color: '#666' }}>
            Try changing the variant, icon, and size using the controls below
         </div>
      </div>
   )
}

/**
 * ## Custom Variants
 *
 * The CUSTOM variant allows specifying custom background and foreground colors.
 */
export const CustomVariants: Story = {
   args: {
      variant: 'CUSTOM',
      type: 'OUTLINE',
      iconId: 'alert-circle',
      size: 'lg',
      iconType: 'OUTLINE',
      bg: '#e6f7ff',
      fg: '#0099ff',
      iconClassName: 'fill-fg-warning-primary'
   },
   render: args => (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
         }}
      >
         <div className='flex items-center gap-2'>
            <p>type: SOLID</p>
            <FeaturedIcon {...args} type='SOLID' />
         </div>
         <div className='flex items-center gap-2'>
            <p>type: OUTLINE</p>
            <FeaturedIcon {...args} type='OUTLINE' />
         </div>
      </div>
   )
}
