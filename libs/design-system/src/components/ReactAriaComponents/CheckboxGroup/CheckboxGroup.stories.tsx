import React from 'react'

import { RACCheckbox, RACCheckboxGroup } from './index'

export default {
   component: RACCheckbox,
   title: 'components/RACCheckboxGroup'
}

export const DefaultCheckboxGroup = props => (
   <RACCheckboxGroup
      label='Favorite pet Favorite pet'
      onChange={value => console.log(value)}
      {...props}
   >
      <RACCheckbox id='testing-id' value='dogs'>
         Dog
      </RACCheckbox>
      <RACCheckbox value='cats'>Cats 1</RACCheckbox>
   </RACCheckboxGroup>
)

export const CheckboxGroupWithDefaultSelectedValue = props => (
   <RACCheckboxGroup
      label='Favorite pet Favorite pet'
      onChange={value => console.log(value)}
      defaultValue={'dogs'}
      {...props}
   >
      <RACCheckbox id='testing-id' value='dogs'>
         Dog
      </RACCheckbox>
      <RACCheckbox value='cats'>Cats 1</RACCheckbox>
   </RACCheckboxGroup>
)

export const SelectedCheckboxGroupWithError = props => (
   <RACCheckboxGroup
      label='Selected Checkbox group with error'
      onChange={value => console.log(value)}
      defaultValue={'dogs'}
      error={'Something went wrong'}
      {...props}
   >
      <RACCheckbox value='dogs'>Dog</RACCheckbox>
      <RACCheckbox value='cats'>Cats 1</RACCheckbox>
   </RACCheckboxGroup>
)

export const DisableCheckboxGroup = props => (
   <RACCheckboxGroup
      label='Disable Checkbox Group'
      onChange={value => console.log(value)}
      defaultValue={'cats3'}
      isDisabled={true}
      {...props}
   >
      <RACCheckbox value='dogs'>Dog</RACCheckbox>
      <RACCheckbox value='cats3'>Cats 3</RACCheckbox>
   </RACCheckboxGroup>
)

export const UnSelectedCheckboxGroupWithError = props => (
   <RACCheckboxGroup
      error='Something went wrong'
      label='Disable Checkbox Group'
      onChange={value => console.log(value)}
      defaultValue={'cats3'}
      {...props}
   >
      <RACCheckbox value='cats'>Cats 1</RACCheckbox>
      <RACCheckbox value='cats2'>Cats 2</RACCheckbox>
   </RACCheckboxGroup>
)

export const IntermediateCheckBoxGroup = props => (
   <RACCheckboxGroup
      label='Disable Checkbox Group'
      onChange={value => console.log(value)}
      defaultValue={'cats3'}
      isIntermediate={true}
      {...props}
   >
      <RACCheckbox value='cats'>Cats 1</RACCheckbox>
      <RACCheckbox value='cats2'>Cats 2</RACCheckbox>
   </RACCheckboxGroup>
)
