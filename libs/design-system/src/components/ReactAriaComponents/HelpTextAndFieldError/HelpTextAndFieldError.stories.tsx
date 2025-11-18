import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import HelpTextAndFieldError from './HelpTextAndFieldError'

const meta: Meta<typeof HelpTextAndFieldError> = {
   title: 'Components/RACHelpTextAndFieldError',
   component: HelpTextAndFieldError,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that displays help text or error messages for form fields.'
         }
      }
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['Small', 'Medium'],
         defaultValue: 'Small'
      },
      containerClassName: {
         control: 'text',
         description: 'Custom CSS class for the container'
      },
      errorTransitionClassName: {
         control: 'text',
         description: 'Custom CSS class for error transition'
      }
   }
}

export default meta

type Story = StoryObj<typeof HelpTextAndFieldError>

// Stories
export const Default: Story = {
   args: {
      hint: 'This is helpful text for the user'
   }
}

export const WithError: Story = {
   args: {
      error: 'This field is required'
   }
}

export const MediumSize: Story = {
   args: {
      ...Default.args,
      size: 'Medium'
   }
}

export const WithErrorMediumSize: Story = {
   args: {
      ...WithError.args,
      size: 'Medium'
   }
}

export const WithLeftIcon: Story = {
   args: {
      ...Default.args,
      renderLeftIcon: () => (
         <span style={{ marginRight: '8px', color: '#666' }}>ℹ️</span>
      )
   }
}

export const WithRightIcon: Story = {
   args: {
      ...Default.args,
      renderRightIcon: () => (
         <span style={{ marginLeft: '8px', color: '#666' }}>→</span>
      )
   }
}

export const WithBothIcons: Story = {
   args: {
      ...Default.args,
      renderLeftIcon: () => (
         <span style={{ marginRight: '8px', color: '#666' }}>ℹ️</span>
      ),
      renderRightIcon: () => (
         <span style={{ marginLeft: '8px', color: '#666' }}>→</span>
      )
   }
}

export const WithCustomClass: Story = {
   args: {
      ...Default.args,
      containerClassName: 'custom-help-text-class'
   }
}

export const WithErrorTransitionClass: Story = {
   args: {
      ...WithError.args,
      errorTransitionClassName: 'custom-error-transition-class'
   }
}

export const LongText: Story = {
   args: {
      hint: 'This is a very long help text that might wrap to multiple lines and should be displayed properly with appropriate styling and spacing.'
   }
}

export const LongErrorText: Story = {
   args: {
      error: 'This is a very long error message that might wrap to multiple lines and should be displayed properly with appropriate styling and spacing.'
   }
}

export const AllVariants: Story = {
   render: () => (
      <div
         style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
         }}
      >
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size - Help Text:</h4>
            <HelpTextAndFieldError
               size='Small'
               hint='This is helpful text for the user'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size - Error:</h4>
            <HelpTextAndFieldError
               size='Small'
               hint=''
               error='This field is required'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size - Help Text:</h4>
            <HelpTextAndFieldError
               size='Medium'
               hint='This is helpful text for the user'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size - Error:</h4>
            <HelpTextAndFieldError
               size='Medium'
               hint=''
               error='This field is required'
            />
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>With Icons:</h4>
            <HelpTextAndFieldError
               size='Small'
               hint='This is helpful text for the user'
               renderLeftIcon={() => (
                  <span style={{ marginRight: '8px', color: '#666' }}>ℹ️</span>
               )}
               renderRightIcon={() => (
                  <span style={{ marginLeft: '8px', color: '#666' }}>→</span>
               )}
            />
         </div>
      </div>
   )
}
