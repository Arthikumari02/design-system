import React from 'react'

import { Card, CardProps } from './Card'

export default {
   title: 'components/Card',

   component: Card
}

const CardTemplate = (args: CardProps): React.ReactElement => (
   <div className='flex justify-center bg-successSecondary p-[20px]'>
      <Card
         isOutline={true}
         elevation='Small'
         className={'p-[50px] w-40 h-[160px]'}
         onClick={() => alert('Card on Action')}
         {...args}
      >
         <p>Card</p>
         <p>Content</p>
      </Card>
   </div>
)

export const CardWithOutline = CardTemplate.bind({})
