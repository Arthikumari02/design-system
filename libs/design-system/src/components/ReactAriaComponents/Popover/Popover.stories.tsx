import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Dialog } from 'react-aria-components'

import Popover from './Popover'

const meta: Meta<typeof Popover> = {
   title: 'Components/RACPopover',
   component: Popover,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      showArrow: {
         control: 'boolean',
         defaultValue: false
      },
      placement: {
         control: 'select',
         options: [
            'top',
            'bottom',
            'left',
            'right',
            'top start',
            'top end',
            'bottom start',
            'bottom end',
            'left top',
            'left bottom',
            'right top',
            'right bottom'
         ],
         defaultValue: 'bottom'
      },
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof Popover>

// Template component to handle state
const PopoverTemplate: React.FC<any> = args => {
   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      action('onOpenChange')(open)
   }

   return (
      <div style={{ padding: '20px' }}>
         <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
               padding: '8px 16px',
               border: '1px solid #ccc',
               borderRadius: '4px',
               backgroundColor: '#f0f0f0',
               cursor: 'pointer'
            }}
         >
            {args.triggerText || 'Toggle Popover'}
         </button>

         {isOpen && (
            <Popover {...args} isOpen={isOpen} onOpenChange={handleOpenChange}>
               <Dialog className='outline-none'>
                  <div
                     style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        minWidth: '200px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                     }}
                  >
                     <h3 style={{ margin: '0 0 8px 0' }}>Popover Content</h3>
                     <p style={{ margin: '0 0 12px 0' }}>
                        This is the content inside the popover. You can put any
                        React components here.
                     </p>
                     <button
                        onClick={() => setIsOpen(false)}
                        style={{
                           padding: '4px 8px',
                           border: '1px solid #ccc',
                           borderRadius: '2px',
                           backgroundColor: '#f0f0f0',
                           cursor: 'pointer'
                        }}
                     >
                        Close
                     </button>
                  </div>
               </Dialog>
            </Popover>
         )}
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <PopoverTemplate {...args} />
}

export const WithArrow: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      showArrow: true
   }
}

export const TopPlacement: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      placement: 'top'
   }
}

export const LeftPlacement: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      placement: 'left'
   }
}

export const RightPlacement: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      placement: 'right'
   }
}

export const WithCustomClass: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      className: 'custom-popover-class'
   }
}

export const WithArrowAndCustomPlacement: Story = {
   render: args => <PopoverTemplate {...args} />,
   args: {
      showArrow: true,
      placement: 'top start'
   }
}

export const ComplexContent: Story = {
   render: args => {
      const ComplexContentComponent = () => {
         const [isOpen, setIsOpen] = useState(false)

         const handleOpenChange = (open: boolean) => {
            setIsOpen(open)
            action('onOpenChange')(open)
         }

         return (
            <div style={{ padding: '20px' }}>
               <button
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                     padding: '8px 16px',
                     border: '1px solid #ccc',
                     borderRadius: '4px',
                     backgroundColor: '#f0f0f0',
                     cursor: 'pointer'
                  }}
               >
                  Complex Popover
               </button>

               {isOpen && (
                  <Popover
                     {...args}
                     isOpen={isOpen}
                     onOpenChange={handleOpenChange}
                  >
                     <Dialog className='outline-none'>
                        <div
                           style={{
                              padding: '16px',
                              backgroundColor: 'white',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              minWidth: '250px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                           }}
                        >
                           <h3 style={{ margin: '0 0 12px 0' }}>
                              Complex Popover Content
                           </h3>
                           <div style={{ marginBottom: '12px' }}>
                              <label
                                 style={{
                                    display: 'block',
                                    marginBottom: '4px'
                                 }}
                              >
                                 Name:
                              </label>
                              <input
                                 type='text'
                                 placeholder='Enter your name'
                                 style={{
                                    width: '100%',
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '2px'
                                 }}
                              />
                           </div>
                           <div style={{ marginBottom: '12px' }}>
                              <label
                                 style={{
                                    display: 'block',
                                    marginBottom: '4px'
                                 }}
                              >
                                 Email:
                              </label>
                              <input
                                 type='email'
                                 placeholder='Enter your email'
                                 style={{
                                    width: '100%',
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '2px'
                                 }}
                              />
                           </div>
                           <div
                              style={{
                                 display: 'flex',
                                 gap: '8px',
                                 justifyContent: 'flex-end'
                              }}
                           >
                              <button
                                 onClick={() => setIsOpen(false)}
                                 style={{
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '2px',
                                    backgroundColor: '#f0f0f0',
                                    cursor: 'pointer'
                                 }}
                              >
                                 Cancel
                              </button>
                              <button
                                 style={{
                                    padding: '4px 8px',
                                    border: '1px solid #007bff',
                                    borderRadius: '2px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    cursor: 'pointer'
                                 }}
                              >
                                 Submit
                              </button>
                           </div>
                        </div>
                     </Dialog>
                  </Popover>
               )}
            </div>
         )
      }

      return <ComplexContentComponent />
   }
}
