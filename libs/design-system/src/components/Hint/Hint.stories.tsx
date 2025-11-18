import React from 'react'

import { Hint } from './Hint'

export default {
   component: Hint,
   title: 'un-published/components/Hint',
   argTypes: {
      size: {
         options: ['ExtraSmall', 'Small', 'Medium'],
         control: { type: 'radio' }
      }
   }
}

export const HintWithError = props => (
   <Hint
      id='Hint-1'
      error='Something went wrong'
      hint=''
      size={'ExtraSmall'}
      {...props}
   />
)

export const HintWithHintText = props => (
   <Hint id='Hint-2' error='' hint='Hint Text' size={'ExtraSmall'} {...props} />
)

export const HintWithElement = props => (
   <Hint
      id='Hint-2'
      error=''
      hint={<div>Hint with JSX Element</div>}
      {...props}
   />
)

export const HintWithEmptyContent = props => (
   <Hint id='Hint-3' error='' hint='' {...props} />
)
