import React from 'react'
import { ToastPosition } from 'react-toastify'

import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { Toast, ToastContainer } from '../Toast'
import { showToast, showWarningToast } from '../ToastUtil'
import { ToastPropsWithOutSnackBarVariant, ToastType } from '../types'

export default {
   component: Toast,
   title: 'components/Toast/Plain/WarningToast'
}

const currentUrl = window.location.href

const openStoryBookInNewTab = (): void => {
   window.open(currentUrl, '_blank')
}

const commonToastContainerProps = {
   position: 'bottom-center' as ToastPosition,
   autoClose: 1000,
   hideProgressBar: true,
   newestOnTop: true,
   closeOnClick: false,
   rtl: false,
   draggable: true,
   pauseOnHover: true
}

const customButton = (text: string): React.ReactElement => (
   <Button
      hierarchy={Hierarchy.Secondary}
      subVariant={SubVariant.GrayOutline}
      size='Small'
      className='mr-lg'
      onClick={() => alert('Please provide on click action.')}
   >
      {text}
   </Button>
)

export const ToastWithTitle = (): React.ReactElement => (
   <div className='h-screen relative'>
      <ToastContainer {...commonToastContainerProps} />
      <Button
         hierarchy={Hierarchy.Secondary}
         subVariant={SubVariant.DestructiveOutline}
         className={
            'border-[#FEC84B] hover-!bg-warning-primary !text-fg-warning-primary'
         }
         size='Small'
         onClick={() =>
            showWarningToast({
               title: 'Warning Toast',
               toastType: 'PLAIN'
            })
         }
      >
         Toast with title
      </Button>
   </div>
)

export const ToastWithTitleAndDescription = (): React.ReactElement => (
   <div className='h-screen relative'>
      <ToastContainer {...commonToastContainerProps} />
      <Button
         hierarchy={Hierarchy.Secondary}
         subVariant={SubVariant.DestructiveOutline}
         className={
            'border-[#FEC84B] hover-!bg-warning-primary !text-fg-warning-primary'
         }
         size='Small'
         onClick={() =>
            showWarningToast({
               title: 'Warning Toast',
               description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
               toastType: 'PLAIN'
            })
         }
      >
         Toast with title and description
      </Button>
   </div>
)

export const ToastWithPrimaryAndSecondaryActions = (): React.ReactElement => {
   const toastProps: ToastPropsWithOutSnackBarVariant = {
      title: 'Warning Toast',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

      toastType: 'PLAIN' as ToastType,
      variant: 'WARNING',
      primaryAction: {
         buttonText: 'Open Story book in new tab',
         type: 'NAVIGATION',
         onClick: openStoryBookInNewTab
      },
      secondaryAction: {
         buttonText: 'Dismiss'
      }
   }

   return (
      <div className='h-screen relative'>
         <ToastContainer {...commonToastContainerProps} />
         <Button
            hierarchy={Hierarchy.Secondary}
            subVariant={SubVariant.DestructiveOutline}
            className={
               'border-[#FEC84B] hover-!bg-warning-primary !text-fg-warning-primary'
            }
            size='Small'
            onClick={() => showToast(toastProps)}
         >
            Toast With Primary And Secondary Actions
         </Button>
      </div>
   )
}

export const ToastWithCustomPrimaryAndSecondaryActions =
   (): React.ReactElement => {
      const toastProps: ToastPropsWithOutSnackBarVariant = {
         title: 'Warning Toast',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

         toastType: 'PLAIN' as ToastType,
         variant: 'WARNING',
         customPrimaryAction: (): React.ReactElement =>
            customButton('Custom Primary Action!'),
         customSecondaryAction: (): React.ReactElement =>
            customButton('Custom Secondary Action!')
      }

      return (
         <div className='h-screen relative'>
            <ToastContainer {...commonToastContainerProps} />
            <Button
               hierarchy={Hierarchy.Secondary}
               subVariant={SubVariant.DestructiveOutline}
               size='Small'
               onClick={() => showToast(toastProps)}
               className={
                  'border-[#FEC84B] !bg-warning-primary !text-fg-warning-primary'
               }
            >
               Toast With Custom Primary And Secondary Actions
            </Button>
         </div>
      )
   }
