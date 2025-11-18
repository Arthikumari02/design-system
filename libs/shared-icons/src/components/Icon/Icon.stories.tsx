import type { Meta, StoryObj } from '@storybook/react'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
   component: Icon,
   title: 'Components/Icon',
   parameters: {
      layout: 'centered'
   },
   tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Icon>

// Outline Icons
export const OutlineIcon: Story = {
   args: {
      type: 'OUTLINE',
      id: 'user-01',
      width: 24,
      height: 24,
      fill: '#000000'
   }
}

// Solid Icons
export const SolidIcon: Story = {
   args: {
      type: 'SOLID',
      id: 'user-01',
      width: 24,
      height: 24,
      fill: '#000000'
   }
}

// Duotone Icons
export const DuotoneIcon: Story = {
   args: {
      type: 'DUOTONE',
      id: 'user-01',
      width: 24,
      height: 24,
      fill: '#000000',
      fillOpacity: 0.12
   }
}

// App Icons
export const AppIcon: Story = {
   args: {
      type: 'APP',
      id: 'File-Doc-Star',
      width: 24,
      height: 24,
      fill: '#000000'
   }
}

// File Icons
export const FileIcon: Story = {
   args: {
      type: 'FILE',
      id: 'PNG-Default',
      width: 24,
      height: 24,
      fill: 'none'
   }
}

// Miscellaneous Icons
export const MiscellaneousIcon: Story = {
   args: {
      type: 'MISCELLANEOUS',
      id: 'checkbox',
      width: 24,
      height: 24,
      stroke: '#D0D5DD',
      fill: 'none'
   }
}

// Different sizes
export const LargeIcon: Story = {
   args: {
      type: 'OUTLINE',
      id: 'user-01',
      width: 48,
      height: 48,
      fill: '#000000'
   }
}

export const SmallIcon: Story = {
   args: {
      type: 'OUTLINE',
      id: 'user-01',
      width: 16,
      height: 16,
      fill: '#000000'
   }
}

// Different colors
export const ColoredIcon: Story = {
   args: {
      type: 'OUTLINE',
      id: 'heart',
      width: 24,
      height: 24,
      fill: '#FF0000'
   }
}
