import React, { useState } from 'react'

import { RACRadioGroup, RACRadio } from './RadioGroup'

export default {
   component: RACRadioGroup,
   title: 'components/RACRadioGroup'
}

export const DefaultRadioGroup = (props: any) => (
   <RACRadioGroup
      label='Favorite pet Favorite pet'
      onChange={(value: any) => console.log(value)}
      {...props}
   >
      <RACRadio value='dogs'>Dog</RACRadio>
      <RACRadio value='cats'>Cats 1</RACRadio>
   </RACRadioGroup>
)

export const RadioGroupWithDefaultSelectedValue = (props: any) => (
   <RACRadioGroup
      label='Favorite pet Favorite pet'
      onChange={(value: any) => console.log(value)}
      defaultValue={'dogs'}
      {...props}
   >
      <RACRadio value='dogs'>Dog</RACRadio>
      <RACRadio value='cats'>Cats 1</RACRadio>
   </RACRadioGroup>
)

export const SelectedRadioGroupWithError = (props: any) => (
   <RACRadioGroup
      label='Selected radio group with error'
      onChange={(value: any) => console.log(value)}
      defaultValue={'dogs'}
      error={'Something went wrong'}
      {...props}
   >
      <RACRadio value='dogs'>Dog</RACRadio>
      <RACRadio value='cats'>Cats 1</RACRadio>
   </RACRadioGroup>
)

export const DisableRadioGroup = (props: any) => (
   <RACRadioGroup
      label='Disable Radio Group'
      onChange={(value: any) => console.log(value)}
      defaultValue={'cats3'}
      isDisabled={true}
      {...props}
   >
      <RACRadio value='dogs'>Dog</RACRadio>
      <RACRadio value='cats3'>Cats 3</RACRadio>
   </RACRadioGroup>
)

export const DisableRadioOptions = (props: any) => (
   <RACRadioGroup
      label='Disable Radio Options'
      onChange={(value: any) => console.log(value)}
      defaultValue={'cats3'}
      {...props}
   >
      <RACRadio value='dogs'>Dog</RACRadio>
      <RACRadio isDisabled={true} value='cats3'>
         Cat
      </RACRadio>
      <RACRadio isDisabled={true} value='rat'>
         Rat
      </RACRadio>
   </RACRadioGroup>
)

export const UnSelectedRadioGroupWithError = (props: any) => (
   <RACRadioGroup
      error='Something went wrong'
      label='Disable Radio Group'
      onChange={(value: any) => console.log(value)}
      defaultValue={'cats3'}
      {...props}
   >
      <RACRadio value='cats'>Cats 1</RACRadio>
      <RACRadio value='cats2'>Cats 2</RACRadio>
   </RACRadioGroup>
)

export const HorizontalRadioGroup = (props: any) => (
   <RACRadioGroup
      label='Horizontal Radio Group'
      onChange={(value: any) => console.log(value)}
      defaultValue={'cats3'}
      axis='horizontal'
      hint={'Something went wrong'}
      {...props}
   >
      <div className='flex gap-lg'>
         <RACRadio value='cats'>Cats 1</RACRadio>
         <RACRadio value='cats2'>Cats 2</RACRadio>
      </div>
   </RACRadioGroup>
)

export const RadioGroupWithDefaultSelectedValueWithClear = (props: any) => {
   const [value, setValue] = useState()

   return (
      <div className='w-[250px] border border-error-200'>
         <RACRadioGroup
            label='Favorite pet Favorite pet'
            onChange={(value: any) => {
               setValue(value)
            }}
            {...props}
            shouldShowClear={true}
            value={value}
         >
            <RACRadio value='dogs'>Dog</RACRadio>
            <RACRadio value='cats'>Cats 1</RACRadio>
         </RACRadioGroup>
      </div>
   )
}
