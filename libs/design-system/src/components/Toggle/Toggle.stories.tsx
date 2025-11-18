import { useState } from 'react'

import Toggle from './Toggle'

export default {
   component: Toggle,
   title: 'components/Toggle'
}

export const DefaultToggle = () => {
   const [isChecked, setIsChecked] = useState(false)

   return (
      <div className='flex flex-col items-center justify-center p-10'>
         <Toggle checked={isChecked} onChange={setIsChecked} name={'Toggle'} />
      </div>
   )
}

export const DefaultToggleWithChecked = () => {
   const [isChecked, setIsChecked] = useState(true)

   return (
      <div className='flex flex-col items-center justify-center p-10'>
         <Toggle checked={isChecked} onChange={setIsChecked} name={'Toggle'} />
      </div>
   )
}

export const ToggleWithMediumSize = () => {
   const [isChecked, setIsChecked] = useState(false)

   return (
      <div className='flex flex-col items-center justify-center p-10'>
         <Toggle
            checked={isChecked}
            onChange={setIsChecked}
            name={'Toggle'}
            size={'Medium'}
         />
      </div>
   )
}

export const ToggleWithDisabled = () => {
   const [isChecked, setIsChecked] = useState(false)

   return (
      <div className='flex flex-col items-center justify-center p-10'>
         <Toggle
            checked={isChecked}
            onChange={setIsChecked}
            name={'Toggle'}
            disabled={true}
         />
      </div>
   )
}

export const ToggleWithCheckedAndDisabled = () => {
   const [isChecked, setIsChecked] = useState(true)

   return (
      <div className='flex flex-col items-center justify-center p-10'>
         <Toggle
            checked={isChecked}
            onChange={setIsChecked}
            name={'Toggle'}
            disabled={true}
         />
      </div>
   )
}
