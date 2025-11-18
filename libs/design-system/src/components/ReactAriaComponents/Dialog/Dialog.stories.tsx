import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Dialog from './Dialog'

const meta: Meta<typeof Dialog> = {
   title: 'Components/RACDialog',
   component: Dialog,
   parameters: {
      layout: 'centered'
   },
   argTypes: {
      className: {
         control: 'text',
         description: 'Custom CSS class'
      }
   }
}

export default meta

type Story = StoryObj<typeof Dialog>

// Template component to handle state
const DialogTemplate: React.FC<any> = args => {
   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      action('onOpenChange')(open)
   }

   return (
      <div style={{ padding: '20px' }}>
         <button
            onClick={() => setIsOpen(true)}
            style={{
               padding: '8px 16px',
               border: '1px solid #ccc',
               borderRadius: '4px',
               backgroundColor: '#f0f0f0',
               cursor: 'pointer'
            }}
         >
            Open Dialog
         </button>

         {isOpen && (
            <div
               style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
               }}
            >
               <Dialog
                  {...args}
                  isOpen={isOpen}
                  onOpenChange={handleOpenChange}
               >
                  <div
                     style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        minWidth: '300px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                     }}
                  >
                     <h2 style={{ margin: '0 0 16px 0' }}>Dialog Title</h2>
                     <p style={{ margin: '0 0 20px 0' }}>
                        This is the content of the dialog. You can put any React
                        components here.
                     </p>
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
                              padding: '6px 12px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              backgroundColor: '#f0f0f0',
                              cursor: 'pointer'
                           }}
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => {
                              action('onConfirm')()
                              setIsOpen(false)
                           }}
                           style={{
                              padding: '6px 12px',
                              border: '1px solid #007bff',
                              borderRadius: '4px',
                              backgroundColor: '#007bff',
                              color: 'white',
                              cursor: 'pointer'
                           }}
                        >
                           Confirm
                        </button>
                     </div>
                  </div>
               </Dialog>
            </div>
         )}
      </div>
   )
}

// Stories
export const Default: Story = {
   render: args => <DialogTemplate {...args} />
}

export const WithCustomClass: Story = {
   render: args => <DialogTemplate {...args} />,
   args: {
      className: 'custom-dialog-class'
   }
}
