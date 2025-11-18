import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SpriteSolidIcons, { solidIcons } from './SpriteSolidIcons'

interface StoryProps {
   className?: string
   searchable?: boolean
}

const meta = {
   component: SpriteSolidIcons,
   title: 'Components/SpriteSolidIcons',
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
   render: args => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [searchTerm, setSearchTerm] = useState('')

      const filteredIcons = solidIcons.filter(icon =>
         icon.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return (
         <div className='flex flex-col gap-4 max-w-[800px]'>
            <div className='sticky top-0 bg-white p-4 z-10'>
               <input
                  type='text'
                  placeholder='Search icons...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md'
               />
               <div className='mt-2 text-sm text-gray-500'>
                  {filteredIcons.length} icons found
               </div>
            </div>

            <div className={args.className || 'grid grid-cols-3 gap-4'}>
               {filteredIcons.length > 0 ? (
                  filteredIcons.map(icon => (
                     <div
                        key={icon}
                        className='flex flex-row gap-4 items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer'
                        onClick={event => {
                           navigator.clipboard.writeText(icon)
                           // Show a temporary "copied" message
                           const el = document.createElement('div')
                           el.innerText = 'Copied!'
                           el.className =
                              'absolute bg-black text-white px-2 py-1 rounded text-xs'
                           document.body.appendChild(el)
                           const rect = (
                              event.currentTarget as HTMLElement
                           ).getBoundingClientRect()
                           el.style.top = `${rect.top - 30}px`
                           el.style.left = `${rect.left + rect.width / 2 - 30}px`
                           setTimeout(() => el.remove(), 1000)
                        }}
                     >
                        {SpriteSolidIcons.renderIcon(icon)}
                     </div>
                  ))
               ) : (
                  <div className='col-span-3 text-center py-8 text-gray-500'>
                     No icons found matching "{searchTerm}"
                  </div>
               )}
            </div>
         </div>
      )
   }
}

// Display all icons
export const AllIcons: Story = {
   args: {
      className: 'grid grid-cols-3 gap-4 max-w-[800px]'
   }
}
