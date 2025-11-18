import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { withFocusRing } from './WithFocusRing'

const meta: Meta<any> = {
   title: 'Components/RACWithFocusRing',
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      variant: {
         control: 'select',
         options: ['Primary', 'Destructive', 'Gray', 'GraySecondary', 'None'],
         defaultValue: 'Primary'
      },
      size: {
         control: 'radio',
         options: [
            'ExtraSmall',
            'Small',
            'Medium',
            'Large',
            'ExtraLarge',
            'DoubleExtraLarge'
         ],
         defaultValue: 'Medium'
      },
      within: {
         control: 'boolean',
         defaultValue: true
      },
      isTextInput: {
         control: 'boolean',
         defaultValue: false
      },
      isError: {
         control: 'boolean',
         defaultValue: false
      },
      autoFocus: {
         control: 'boolean',
         defaultValue: false
      }
   }
}

export default meta

type Story = StoryObj<typeof withFocusRing>

// Sample components to demonstrate withFocusRing
const SampleButton = (props: any) => (
   <button
      {...props}
      style={{
         padding: '8px 16px',
         border: '1px solid #ccc',
         borderRadius: '4px',
         backgroundColor: '#f0f0f0',
         cursor: 'pointer',
         ...props.style
      }}
   >
      Sample Button
   </button>
)

const SampleInput = (props: any) => (
   <input
      {...props}
      type='text'
      placeholder='Sample input'
      style={{
         padding: '8px 12px',
         border: '1px solid #ccc',
         borderRadius: '4px',
         fontSize: '14px',
         ...props.style
      }}
   />
)

const SampleDiv = (props: any) => (
   <div
      {...props}
      tabIndex={0}
      style={{
         padding: '16px',
         border: '1px solid #ccc',
         borderRadius: '4px',
         backgroundColor: '#f8f8f8',
         cursor: 'pointer',
         ...props.style
      }}
   >
      Focusable Div
   </div>
)

// Template component to handle state
const WithFocusRingTemplate: React.FC<any> = args => {
   const [isFocused, setIsFocused] = useState(false)

   const handleFocus = () => {
      setIsFocused(true)
      action('onFocus')()
   }

   const handleBlur = () => {
      setIsFocused(false)
      action('onBlur')()
   }

   const ButtonWithFocusRing = withFocusRing(SampleButton)
   const InputWithFocusRing = withFocusRing(SampleInput)
   const DivWithFocusRing = withFocusRing(SampleDiv)

   return (
      <div
         style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
         }}
      >
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Button with Focus Ring:</h4>
            <ButtonWithFocusRing
               {...args}
               isFocused={isFocused}
               onFocus={handleFocus}
               onBlur={handleBlur}
            />
         </div>

         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Input with Focus Ring:</h4>
            <InputWithFocusRing
               {...args}
               isFocused={isFocused}
               onFocus={handleFocus}
               onBlur={handleBlur}
               isTextInput={true}
            />
         </div>

         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Div with Focus Ring:</h4>
            <DivWithFocusRing
               {...args}
               isFocused={isFocused}
               onFocus={handleFocus}
               onBlur={handleBlur}
            />
         </div>

         <div
            style={{
               marginTop: '16px',
               padding: '8px',
               backgroundColor: '#f0f0f0',
               borderRadius: '4px'
            }}
         >
            <strong>Focus State:</strong>{' '}
            {isFocused ? 'Focused' : 'Not Focused'}
         </div>
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <WithFocusRingTemplate {...args} />
}

export const PrimaryVariant: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      variant: 'Primary'
   }
}

export const DestructiveVariant: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      variant: 'Destructive'
   }
}

export const GrayVariant: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      variant: 'Gray'
   }
}

export const GraySecondaryVariant: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      variant: 'GraySecondary'
   }
}

export const SmallSize: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      size: 'Small'
   }
}

export const LargeSize: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      size: 'Large'
   }
}

export const WithError: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      isError: true
   }
}

export const WithoutWithin: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      within: false
   }
}

export const WithCustomFocusClass: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      focusClass: 'custom-focus-class'
   }
}

export const WithCustomFocusRingClass: Story = {
   render: args => <WithFocusRingTemplate {...args} />,
   args: {
      focusRingClass: 'custom-focus-ring-class'
   }
}
