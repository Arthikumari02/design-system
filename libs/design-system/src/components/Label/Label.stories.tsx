import React from 'react'

import { Label } from './Label'

export default {
   component: Label,
   title: 'un-published/components/Label',
   argTypes: {
      size: {
         options: ['ExtraSmall', 'Small', 'Medium'],
         control: { type: 'radio' }
      },
      isRequired: {
         options: [false, true],
         control: { type: 'radio' }
      }
   }
}

export const LabelComponent = (props): React.ReactElement => (
   <Label {...props}>First Name</Label>
)
