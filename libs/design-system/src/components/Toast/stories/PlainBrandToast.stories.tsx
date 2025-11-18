import React from 'react'
import { ToastPosition } from 'react-toastify'

import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { Toast, ToastContainer } from '../Toast'
import { showToast, showBrandToast } from '../ToastUtil'
import {
   ToastPropsWithOutSnackBarVariant,
   ToastType,
   ToastVariantType
} from '../types'

export default {
   component: Toast,
   title: 'components/Toast/Plain/BrandToast'
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
         subVariant={SubVariant.Primary}
         size='Small'
         onClick={() =>
            showBrandToast({
               title: 'Brand Toast',
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
         subVariant={SubVariant.Primary}
         size='Small'
         onClick={() =>
            showBrandToast({
               title: 'Brand Toast',
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
      title: 'Brand Toast',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

      toastType: 'PLAIN' as ToastType,
      variant: 'BRAND',
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
            subVariant={SubVariant.Primary}
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
         title: 'Brand Toast',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',

         toastType: 'PLAIN' as ToastType,
         variant: 'BRAND',
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
               subVariant={SubVariant.Primary}
               size='Small'
               onClick={() => showToast(toastProps)}
            >
               Toast With Custom Primary And Secondary Actions
            </Button>
         </div>
      )
   }
