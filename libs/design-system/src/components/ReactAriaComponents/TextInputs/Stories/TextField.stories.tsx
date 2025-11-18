// Using classnames in JSX elements below
import cn from 'classnames'
import { useState } from 'react'

import { chain } from '@react-aria/utils'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { ChevronDownIcon } from '../../../../icons/ChevronDownIcon'
import { SearchIcon } from '../../../../icons/SearchIcon'
import { CloseIcon } from '../../../../icons/CloseIcon'
import RACTextField, { RACTextFieldProps } from '../TextField/TextField'

const meta: Meta<typeof RACTextField> = {
   component: RACTextField,
   title: 'components/TextField',
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A customizable text input field built on top of React Aria components.'
         }
      }
   },
   argTypes: {
      size: {
         control: 'select',
         options: ['Small', 'Medium'],
         defaultValue: 'Small',
         description: 'Size of the text field'
      },
      label: {
         control: 'text',
         description: 'Label for the text field'
      },
      placeholder: {
         control: 'text',
         description: 'Placeholder text'
      },
      isDisabled: {
         control: 'boolean',
         description: 'Whether the text field is disabled'
      },
      isRequired: {
         control: 'boolean',
         description: 'Whether the text field is required'
      },
      errorMessage: {
         control: 'text',
         description: 'Error message to display'
      },
      hint: {
         control: 'text',
         description: 'Hint text to display'
      },
      type: {
         control: 'select',
         options: ['text', 'email', 'password', 'number', 'url', 'tel'],
         defaultValue: 'text',
         description: 'Type of the input field'
      },
      containerClassName: {
         control: 'text',
         description: 'Class name for the container'
      }
   }
}

export default meta
type Story = StoryObj<typeof RACTextField>

// Basic usage examples
const TextFieldTemplate = (args: Partial<RACTextFieldProps>) => {
   const [value, setValue] = useState((args.value as string) || '')
   return (
      <div className='p-4'>
         <RACTextField
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
      <TextFieldTemplate {...(args as Partial<RACTextFieldProps>)} />
   ),
   args: {
      label: 'Username',
      placeholder: 'Enter your username',
      size: 'Small',
      containerClassName: 'w-80'
   }
}

// With error message
export const WithError: Story = {
   render: args => (
      <TextFieldTemplate {...(args as Partial<RACTextFieldProps>)} />
   ),
   args: {
      label: 'Email',
      placeholder: 'Enter your email',
      errorMessage: 'Please enter a valid email address',
      size: 'Small',
      containerClassName: 'w-80'
   }
}

// With hint text
export const WithHint: Story = {
   render: args => (
      <TextFieldTemplate {...(args as Partial<RACTextFieldProps>)} />
   ),
   args: {
      label: 'Password',
      placeholder: 'Enter your password',
      hint: 'Password must be at least 8 characters long',
      type: 'password',
      size: 'Small',
      containerClassName: 'w-80'
   }
}

// With custom hint component
export const WithCustomHint: Story = {
   render: args => (
      <TextFieldTemplate {...(args as Partial<RACTextFieldProps>)} />
   ),
   args: {
      label: 'Username',
      placeholder: 'Enter your username',
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
      ),
      size: 'Small',
      containerClassName: 'w-80'
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
               <RACTextField
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
               <RACTextField
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

// With left and right elements
export const WithIcons: Story = {
   render: function WithIconsStory() {
      const [searchValue, setSearchValue] = useState('')
      const [dropdownValue, setDropdownValue] = useState('')
      const [combinedValue, setCombinedValue] = useState('')

      return (
         <div className={cn('space-y-4')}>
            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>
                  With Left Icon
               </h3>
               <RACTextField
                  label='Search'
                  placeholder='Search...'
                  value={searchValue}
                  onChange={chain(action('onChange'), setSearchValue)}
                  size='Small'
                  containerClassName='w-80'
                  leftElement={() => (
                     <SearchIcon className={cn('mr-2 stroke-gray-500')} />
                  )}
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>
                  With Right Icon
               </h3>
               <RACTextField
                  label='Select Option'
                  placeholder='Click to select...'
                  value={dropdownValue}
                  onChange={chain(action('onChange'), setDropdownValue)}
                  size='Small'
                  containerClassName='w-80'
                  rightElement={() => (
                     <ChevronDownIcon className={cn('mr-2 stroke-gray-500')} />
                  )}
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>
                  With Both Icons
               </h3>
               <RACTextField
                  label='Search with Filter'
                  placeholder='Search with filter...'
                  value={combinedValue}
                  onChange={chain(action('onChange'), setCombinedValue)}
                  size='Small'
                  containerClassName='w-80'
                  leftElement={() => (
                     <SearchIcon className={cn('mr-2 stroke-gray-500')} />
                  )}
                  rightElement={() => (
                     <ChevronDownIcon className={cn('stroke-gray-500')} />
                  )}
               />
            </div>
         </div>
      )
   }
}

// With interactive elements
export const WithInteractiveElements: Story = {
   render: function WithInteractiveElementsStory() {
      const [value, setValue] = useState('')

      return (
         <div>
            <RACTextField
               label='Clearable Input'
               placeholder='Type something...'
               value={value}
               onChange={chain(action('onChange'), setValue)}
               size='Small'
               containerClassName='w-80'
               rightElement={() =>
                  value ? (
                     <button
                        onClick={() => setValue('')}
                        className={cn(
                           'mr-2 p-1 hover:bg-gray-100 rounded-full'
                        )}
                        aria-label='Clear input'
                     >
                        <CloseIcon className={cn('w-4 h-4')} />
                     </button>
                  ) : null
               }
            />
         </div>
      )
   }
}

// Different input types
export const InputTypes: Story = {
   render: function InputTypesStory() {
      const [textValue, setTextValue] = useState('')
      const [emailValue, setEmailValue] = useState('')
      const [passwordValue, setPasswordValue] = useState('')
      const [numberValue, setNumberValue] = useState('42')
      const [urlValue, setUrlValue] = useState('https://')

      return (
         <div className={cn('space-y-4')}>
            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Text Input</h3>
               <RACTextField
                  label='Text'
                  placeholder='Enter text'
                  value={textValue}
                  onChange={chain(action('onChange'), setTextValue)}
                  size='Small'
                  containerClassName='w-80'
                  type='text'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Email Input</h3>
               <RACTextField
                  label='Email'
                  placeholder='Enter your email'
                  value={emailValue}
                  onChange={chain(action('onChange'), setEmailValue)}
                  size='Small'
                  containerClassName='w-80'
                  type='email'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>
                  Password Input
               </h3>
               <RACTextField
                  label='Password'
                  placeholder='Enter your password'
                  value={passwordValue}
                  onChange={chain(action('onChange'), setPasswordValue)}
                  size='Small'
                  containerClassName='w-80'
                  type='password'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Number Input</h3>
               <RACTextField
                  label='Number'
                  placeholder='Enter a number'
                  value={numberValue}
                  onChange={chain(action('onChange'), setNumberValue)}
                  size='Small'
                  containerClassName='w-80'
                  type='number'
                  minValue={0}
                  maxValue={100}
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>URL Input</h3>
               <RACTextField
                  label='Website'
                  placeholder='Enter a URL'
                  value={urlValue}
                  onChange={chain(action('onChange'), setUrlValue)}
                  size='Small'
                  containerClassName='w-80'
                  type='url'
               />
            </div>
         </div>
      )
   }
}

// States showcase
export const States: Story = {
   render: function StatesStory() {
      return (
         <div className={cn('space-y-4')}>
            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Default</h3>
               <RACTextField
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
               <RACTextField
                  label='Focused State'
                  placeholder='Click to focus'
                  size='Small'
                  containerClassName='w-80'
                  autoFocus
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Disabled</h3>
               <RACTextField
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
               <RACTextField
                  label='Error State'
                  placeholder='Input with error'
                  size='Small'
                  containerClassName='w-80'
                  errorMessage='This field has an error'
               />
            </div>

            <div>
               <h3 className={cn('text-sm font-medium mb-2')}>Required</h3>
               <RACTextField
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
      <TextFieldTemplate {...(args as Partial<RACTextFieldProps>)} />
   ),
   args: {
      label: 'Playground',
      placeholder: 'Try different props here',
      size: 'Small',
      containerClassName: 'w-80',
      hint: 'Experiment with different props in the Controls panel'
   }
}
