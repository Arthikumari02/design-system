import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import FieldGroup from './FieldGroup'

const meta: Meta<typeof FieldGroup> = {
   title: 'Components/RACFieldGroup',
   component: FieldGroup,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A component that groups form fields together with consistent styling and focus management.'
         }
      }
   },
   argTypes: {
      size: {
         control: 'radio',
         options: ['ExtraSmall', 'Small', 'Medium'],
         defaultValue: 'Medium'
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof FieldGroup>

// Sample content for the field group
const SampleFieldContent = () => (
   <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
         type='text'
         placeholder='First name'
         style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
         }}
      />
      <input
         type='text'
         placeholder='Last name'
         style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
         }}
      />
   </div>
)

// Stories
export const Default: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '400px' }}>
         <FieldGroup {...args}>
            <SampleFieldContent />
         </FieldGroup>
      </div>
   ),
   args: {
      size: 'Medium'
   }
}

export const SmallSize: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '400px' }}>
         <FieldGroup {...args}>
            <SampleFieldContent />
         </FieldGroup>
      </div>
   ),
   args: {
      size: 'Small'
   }
}

export const ExtraSmallSize: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '400px' }}>
         <FieldGroup {...args}>
            <SampleFieldContent />
         </FieldGroup>
      </div>
   ),
   args: {
      size: 'ExtraSmall'
   }
}

export const WithCustomClass: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '400px' }}>
         <FieldGroup {...args}>
            <SampleFieldContent />
         </FieldGroup>
      </div>
   ),
   args: {
      className: 'custom-field-group-class'
   }
}

export const WithMultipleFields: Story = {
   render: args => (
      <div style={{ padding: '20px', width: '500px' }}>
         <FieldGroup {...args}>
            <div
               style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
               <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                     type='text'
                     placeholder='First name'
                     style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        flex: 1
                     }}
                  />
                  <input
                     type='text'
                     placeholder='Last name'
                     style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        flex: 1
                     }}
                  />
               </div>
               <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                     type='email'
                     placeholder='Email'
                     style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        flex: 1
                     }}
                  />
                  <input
                     type='tel'
                     placeholder='Phone'
                     style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        flex: 1
                     }}
                  />
               </div>
            </div>
         </FieldGroup>
      </div>
   )
}

export const AllSizes: Story = {
   render: () => (
      <div
         style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
         }}
      >
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Extra Small Size:</h4>
            <FieldGroup size='ExtraSmall'>
               <SampleFieldContent />
            </FieldGroup>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Small Size:</h4>
            <FieldGroup size='Small'>
               <SampleFieldContent />
            </FieldGroup>
         </div>
         <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Medium Size:</h4>
            <FieldGroup size='Medium'>
               <SampleFieldContent />
            </FieldGroup>
         </div>
      </div>
   )
}
