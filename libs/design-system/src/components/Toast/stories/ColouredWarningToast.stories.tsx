import React from 'react'
import { ToastPosition } from 'react-toastify'

import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { Toast, ToastContainer } from '../Toast'
import { showToast, showWarningToast } from '../ToastUtil'
import { ToastPropsWithOutSnackBarVariant, ToastType } from '../types'

export default {
   component: Toast,
   title: 'components/Toast/Coloured/WarningToast'
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

export const ToastWithTitle = (): React.ReactElement => (
   <div className='h-screen relative'>
      <ToastContainer {...commonToastContainerProps} />
      <Button
         hierarchy={Hierarchy.Primary}
         subVariant={SubVariant.Primary}
         className={
            'border-[#FEC84B] !bg-warning-primary !text-fg-warning-primary'
         }
         size='Small'
         onClick={() =>
            showWarningToast({
               title: 'Warning Toast'
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
         hierarchy={Hierarchy.Primary}
         subVariant={SubVariant.Primary}
         className={
            'border-[#FEC84B] !bg-warning-primary !text-fg-warning-primary'
         }
         size='Small'
         onClick={() =>
            showWarningToast({
               title: 'Warning Toast',
               description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.'
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

      toastType: 'COLOURED' as ToastType,
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
            hierarchy={Hierarchy.Primary}
            subVariant={SubVariant.Primary}
            size='Small'
            onClick={() => showToast(toastProps)}
            className={
               'border-[#FEC84B] !bg-warning-primary !text-fg-warning-primary'
            }
         >
            Toast With Primary And Secondary Actions
         </Button>
      </div>
   )
}
