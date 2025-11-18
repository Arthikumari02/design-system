import { observer } from 'mobx-react'
import React, { useState } from 'react'

import Icon from '../Icon/Icon'

interface Props {
   className?: string
   searchable?: boolean
}

export const fileIcons = [
   'CSV-Default',
   'JPEG-Default',
   'JPG-Default',
   'MP3-Default',
   'MP4-Default',
   'PDF-Default',
   'PDF-Gray',
   'PNG-Default',
   'Simple-PDF-Default',
   'TXT-Default'
]

const SpriteFileIcons = (props: Props): React.ReactElement => {
   const { className, searchable = false } = props
   const [searchTerm, setSearchTerm] = useState('')

   const renderIcon = (icon: string): React.ReactElement => (
      <div className='flex gap-2 px-2 mb-[4px]' key={icon}>
         <div>
            <Icon
               type='FILE'
               id={icon}
               height={24}
               width={24}
               className='fill-fg-brand-secondary-500'
            />
         </div>
         <div>{icon}</div>
      </div>
   )

   const filteredIcons = searchTerm
      ? fileIcons.filter(icon =>
           icon.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : fileIcons

   return (
      <div className={className}>
         {searchable && (
            <div className='sticky top-0 bg-white p-4 z-10 mb-4'>
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
         )}
         {filteredIcons.map(icon => renderIcon(icon))}
      </div>
   )
}

// Expose renderIcon method for use in Storybook
SpriteFileIcons.renderIcon = (icon: string): React.ReactElement => (
   <div className='flex gap-2 px-2 mb-[4px]' key={icon}>
      <div>
         <Icon
            type='FILE'
            id={icon}
            height={24}
            width={24}
            className='fill-fg-brand-secondary-500'
         />
      </div>
      <div>{icon}</div>
   </div>
)

export default observer(SpriteFileIcons)
