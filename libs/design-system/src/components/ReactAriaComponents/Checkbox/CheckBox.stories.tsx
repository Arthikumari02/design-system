import React, { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { ComponentStoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

type CheckboxStory = ComponentStoryObj<typeof Checkbox>

export default {
   title: 'components/RACCheckBox',
   component: Checkbox,
   args: {
      onChange: action('onChange')
   },
   argTypes: {
      onChange: {
         table: {
            disable: true
         }
      },
      defaultSelected: {
         control: 'boolean'
      },
      isSelected: {
         control: 'boolean'
      },
      isIndeterminate: {
         control: 'boolean'
      },
      isEmphasized: {
         control: 'boolean'
      },
      isDisabled: {
         control: 'boolean'
      },
      isReadOnly: {
         control: 'boolean'
      },
      autoFocus: {
         control: 'boolean'
      },
      validationState: {
         control: {
            type: 'select',
            options: [null, 'valid', 'invalid']
         }
      }
   }
}

export const Default: CheckboxStory = {
   render: args => render(args)
}

export const CustomLabel: CheckboxStory = {
   render: args => renderCustomLabel(args)
}

export const LongLabel: CheckboxStory = {
   render: args => (
      <Checkbox {...args}>
         Super long checkbox label. Sample text. Arma virumque cano, Troiae qui
         primus ab oris. Italiam, fato profugus, Laviniaque venit.
      </Checkbox>
   )
}

export const NoLabel: CheckboxStory = {
   render: args => RenderNoLabel(args)
}

function render(props = {}) {
   return <Checkbox {...props}>Checkbox Label</Checkbox>
}

function renderCustomLabel(props = {}) {
   return (
      <Checkbox {...props}>
         <span>
            <i>Italicized</i> Checkbox Label
         </span>
      </Checkbox>
   )
}

function RenderNoLabel(props = {}) {
   const [isSelected, setIsSelected] = useState(true)

   return (
      <Checkbox
         {...props}
         isSelected={isSelected}
         onChange={() => {
            setIsSelected(!isSelected)
         }}
      />
   )
}
