import cn from 'classnames'
import { useState } from 'react'

import { chain } from '@react-aria/utils'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import RACTextArea, { RACTextAreaProps } from '../TextField/TextArea'

const meta: Meta<typeof RACTextArea> = {
   title: 'components/TextArea',
   component: RACTextArea,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      size: {
         control: { type: 'radio' },
         options: ['Small', 'Medium'],
         defaultValue: 'Small'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      errorMessage: {
         control: 'text'
      },
      hint: {
         control: 'text'
      },
      shouldShowHint: {
         control: 'boolean',
         defaultValue: true
      },
      placeholder: {
         control: 'text'
      },
      label: {
         control: 'text'
      },
      containerClassName: {
         control: 'text'
      }
   }
}

export default meta
type Story = StoryObj<typeof RACTextArea>

// Basic usage examples
const TextAreaTemplate = (args: Partial<RACTextAreaProps>) => {
   const [value, setValue] = useState((args.value as string) || '')
   return (
      <div className='p-4'>
         <RACTextArea
            size='Small' // Ensure size is always provided as it's required
            {...args}
            value={value}
            onChange={chain(action('onChange'), setValue)}
         />
      </div>
   )
}

export const Default: Story = {
   render: args => (
      <TextAreaTemplate {...(args as Partial<RACTextAreaProps>)} />
   ),
   args: {
      label: 'Comments',
      placeholder: 'Enter your comments',
      containerClassName: 'w-80'
   }
}

// With error message
export const WithError: Story = {
   render: args => (
      <TextAreaTemplate {...(args as Partial<RACTextAreaProps>)} />
   ),
   args: {
      label: 'Feedback',
      placeholder: 'Enter your feedback',
      containerClassName: 'w-80',
      errorMessage: 'Please provide valid feedback'
   }
}

// With hint text
export const WithHint: Story = {
   render: args => (
      <TextAreaTemplate {...(args as Partial<RACTextAreaProps>)} />
   ),
   args: {
      label: 'Description',
      placeholder: 'Enter a description',
      containerClassName: 'w-80',
      hint: 'This has all features of text field with multi-line support'
   }
}

// With custom hint component
export const WithCustomHint: Story = {
   render: args => (
      <TextAreaTemplate {...(args as Partial<RACTextAreaProps>)} />
   ),
   args: {
      label: 'Description',
      placeholder: 'Enter a description',
      containerClassName: 'w-80',
      hint: (
         <div className={cn('flex items-center')}>
            <span className={cn('text-brand')}>Need help?</span>
            <button
               onClick={action('hint-button-click')}
               className={cn('ml-2 text-primary underline')}
            >
               Click here
            </button>
         </div>
      )
   }
}

// Different sizes
export const Sizes: Story = {
   render: function SizesStory() {
      const [valueSmall, setValueSmall] = useState('')
      const [valueMedium, setValueMedium] = useState('')

      return (
         <div className={cn('space-y-4')}>
            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Small Size</h3>
               <RACTextArea
                  label='Small Input'
                  placeholder='Small size input'
                  value={valueSmall}
                  onChange={chain(action('onChange'), setValueSmall)}
                  size='Small'
                  containerClassName='w-80'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Medium Size</h3>
               <RACTextArea
                  label='Medium Input'
                  placeholder='Medium size input'
                  value={valueMedium}
                  onChange={chain(action('onChange'), setValueMedium)}
                  size='Medium'
                  containerClassName='w-80'
               />
            </div>
         </div>
      )
   }
}

// Auto-resize behavior
export const AutoResize: Story = {
   render: function AutoResizeStory() {
      const [value, setValue] = useState(
         'This is a text area that will automatically resize based on content. Try typing more text to see it grow!'
      )

      return (
         <div>
            <RACTextArea
               label='Auto-resizing TextArea'
               placeholder='Type to see auto-resize...'
               value={value}
               onChange={chain(action('onChange'), setValue)}
               size='Small'
               containerClassName='w-80'
            />
         </div>
      )
   }
}

// Different states
export const States: Story = {
   render: function StatesStory() {
      return (
         <div className={cn('space-y-4')}>
            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Default</h3>
               <RACTextArea
                  label='Default State'
                  placeholder='Default input'
                  size='Small'
                  containerClassName='w-80'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>
                  Focused (Click to see)
               </h3>
               <RACTextArea
                  label='Focused State'
                  placeholder='Click to focus'
                  size='Small'
                  containerClassName='w-80'
                  autoFocus
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Disabled</h3>
               <RACTextArea
                  label='Disabled State'
                  placeholder='Cannot be edited'
                  size='Small'
                  containerClassName='w-80'
                  isDisabled
                  value='Disabled input'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Error</h3>
               <RACTextArea
                  label='Error State'
                  placeholder='Input with error'
                  size='Small'
                  containerClassName='w-80'
                  errorMessage='This field has an error'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Required</h3>
               <RACTextArea
                  label='Required Field'
                  placeholder='This field is required'
                  size='Small'
                  containerClassName='w-80'
                  isRequired
               />
            </div>
         </div>
      )
   }
}

// Playground
export const Playground: Story = {
   render: args => (
      <TextAreaTemplate {...(args as Partial<RACTextAreaProps>)} />
   ),
   args: {
      label: 'Playground',
      placeholder: 'Try different props here',
      containerClassName: 'w-80'
   }
}
