import { observer } from 'mobx-react'
import React from 'react'
import Icon from '../Icon/Icon'

const icons = [
   'checkbox',
   'checkbox-selected',
   'radio',
   'radio-selected',
   'check-circle-selected',
   'radio-selected-disabled'
]

const SpriteMiscellaneousIcons = (): React.ReactElement => (
   <div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon
               type='MISCELLANEOUS'
               id={'checkbox'}
               height={24}
               width={24}
               className='fill-none stroke-amber-400'
            />
         </div>
         <div>{'checkbox'}</div>
      </div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon
               type='MISCELLANEOUS'
               id={'checkbox-selected'}
               height={24}
               width={24}
               className='fill-blue-400'
            />
         </div>
         <div>{'checkbox-selected'}</div>
      </div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon
               type='MISCELLANEOUS'
               id={'radio'}
               height={24}
               width={24}
               className='fill-none stroke-amber-400'
            />
         </div>
         <div>{'radio'}</div>
      </div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <Icon
            type='MISCELLANEOUS'
            id={'check-circle-selected'}
            height={24}
            width={24}
            className='fill-blue-400'
         />
         <div>{'check-circle-selected'}</div>
      </div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon
               type='MISCELLANEOUS'
               id={'radio-selected'}
               height={24}
               width={24}
               className='fill-blue-400'
            />
         </div>
         <div>{'radio-selected'}</div>
      </div>
      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon
               type='MISCELLANEOUS'
               id={'radio-selected-disabled'}
               height={24}
               width={24}
               className='fill-none stroke-amber-400'
            />
         </div>
         <div>{'radio-selected-disabled'}</div>
      </div>

      <div className='flex gap-2 px-2 mb-[4px]'>
         <div>
            <Icon type='MISCELLANEOUS' id={'chrome'} height={24} width={24} />
         </div>
         <div>{'chrome'}</div>
      </div>
   </div>
)

export default observer(SpriteMiscellaneousIcons)
