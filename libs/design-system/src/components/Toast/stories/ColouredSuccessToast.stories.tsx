import React from 'react'
import { ToastPosition } from 'react-toastify'

import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { showSuccessToast, showToast } from '../ToastUtil'
import {
   ToastPropsWithOutSnackBarVariant,
   ToastType,
   ToastVariantType
} from '../types'
import { Toast, ToastContainer } from '../Toast'

export default {
   component: Toast,
   title: 'components/Toast/Coloured/SuccessToast'
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
         size='Small'
         className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
         onClick={() =>
            showSuccessToast({
               title: 'Success Toast'
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
         className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
         size='Small'
         onClick={() =>
            showSuccessToast({
               title: 'Success Toast',
               description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.'
            })
         }
      >
         Toast with title and description
      </Button>
   </div>
)

export const ToastWithPrimaryActions = (): React.ReactElement => {
   const toastProps: ToastPropsWithOutSnackBarVariant = {
      title: 'Success Toast',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

      toastType: 'COLOURED' as ToastType,
      variant: 'SUCCESS',
      primaryAction: {
         buttonText: 'Open Story book in new tab',
         type: 'NAVIGATION',
         onClick: openStoryBookInNewTab
      }
   }

   return (
      <div className='h-screen relative'>
         <ToastContainer {...commonToastContainerProps} />
         <Button
            hierarchy={Hierarchy.Primary}
            subVariant={SubVariant.Primary}
            className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
            size='Small'
            onClick={() => showToast(toastProps)}
         >
            Toast With Primary Actions
         </Button>
      </div>
   )
}

export const ToastWithSecondaryActions = (): React.ReactElement => {
   const toastProps: ToastPropsWithOutSnackBarVariant = {
      title: 'Success Toast',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

      toastType: 'COLOURED' as ToastType,
      variant: 'SUCCESS',
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
            className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
            size='Small'
            onClick={() => showToast(toastProps)}
         >
            Toast With Secondary Actions
         </Button>
      </div>
   )
}

export const ToastWithPrimaryAndSecondaryActions = (): React.ReactElement => {
   const toastProps: ToastPropsWithOutSnackBarVariant = {
      title: 'Success Toast',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

      toastType: 'COLOURED' as ToastType,
      variant: 'SUCCESS',
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
            className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
            size='Small'
            onClick={() => showToast(toastProps)}
         >
            Toast With Primary And Secondary Actions
         </Button>
      </div>
   )
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

export const ToastWithCustomPrimaryAndSecondaryActions =
   (): React.ReactElement => {
      const toastProps: ToastPropsWithOutSnackBarVariant = {
         title: 'Success Toast',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

         toastType: 'COLOURED' as ToastType,
         variant: 'SUCCESS',
         customPrimaryAction: (): React.ReactElement =>
            customButton('Custom Primary Action!'),
         customSecondaryAction: (): React.ReactElement =>
            customButton('Custom Secondary Action!')
      }

      return (
         <div className='h-screen relative'>
            <ToastContainer {...commonToastContainerProps} />
            <Button
               hierarchy={Hierarchy.Primary}
               subVariant={SubVariant.Primary}
               className='border-[#73E2A3] !bg-success-primary !text-success-primary-600'
               size='Small'
               onClick={() => showToast(toastProps)}
            >
               Toast With Custom Primary And Secondary Actions
            </Button>
         </div>
      )
   }
