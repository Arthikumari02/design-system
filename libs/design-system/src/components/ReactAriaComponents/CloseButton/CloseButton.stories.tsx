import { action } from '@storybook/addon-actions'

import { CloseButtonSubVariant, CloseButton as CloseButtonComponent } from '.'

export default {
   component: CloseButtonComponent,
   title: 'components/RACCloseButton'
}

export const CloseButtonStory = args => (
   <div className='flex flex-col justify-center items-center'>
      <CloseButtonComponent
         subVariant={CloseButtonSubVariant.Primary}
         size={'Small'}
         onClick={action('clicked CommonButton')}
         {...args}
      />
      <div className='mt-xl' />
      <CloseButtonComponent
         subVariant={CloseButtonSubVariant.Gray}
         size={'Small'}
         onClick={action('clicked CommonButton')}
         {...args}
      />
   </div>
)
