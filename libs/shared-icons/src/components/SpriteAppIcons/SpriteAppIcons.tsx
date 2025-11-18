import { observer } from 'mobx-react'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'

export const appIcons = [
   'Bulb',
   'clipboard',
   'Dynamic Web App',
   'File-Doc-bulb',
   'File-Doc-Star',
   'file-docs',
   'Folder',
   'Folder-Bulb',
   'Folder-Star',
   'Machine_Learning_App',
   'Mobile App',
   'Online Game',
   'Project',
   'Responsive Website',
   'Static Website',
   'Voice Assistant App',
   'Web VR',
   'work'
]

interface Props {
   className?: string
   searchable?: boolean
}

const SpriteAppIcons = (props: Props): React.ReactElement => {
   const { className, searchable = false } = props
   const [searchTerm, setSearchTerm] = useState('')

   const renderIcon = (icon: string): React.ReactElement => (
      <div className='flex gap-2 px-2 mb-[4px]' key={icon}>
         <div>
            <Icon type='APP' id={icon} height={24} width={24} />
         </div>
         <div>{icon}</div>
      </div>
   )

   const filteredIcons = searchTerm
      ? appIcons.filter(icon =>
           icon.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : appIcons

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
SpriteAppIcons.renderIcon = (icon: string): React.ReactElement => (
   <div className='flex gap-2 px-2 mb-[4px]' key={icon}>
      <div>
         <Icon type='APP' id={icon} height={24} width={24} />
      </div>
      <div>{icon}</div>
   </div>
)

export default observer(SpriteAppIcons)
