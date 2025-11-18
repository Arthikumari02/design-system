import React from 'react'
import { ToastPosition } from 'react-toastify'

import { Button, Hierarchy, SubVariant } from '../../ReactAriaComponents/Button'

import { showSnackBarToast } from '../ToastUtil'
import { Toast, ToastContainer } from '../Toast'

export default {
   component: Toast,
   title: 'components/Toast/Snackbar'
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
         className={'border-none !bg-primary-solid'}
         onClick={() =>
            showSnackBarToast({
               title: 'SnackBar Toast',
               toastType: 'SNACK_BAR'
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
         size='Small'
         className={' border-none !bg-primary-solid'}
         onClick={() =>
            showSnackBarToast({
               title: 'SnackBar Toast',
               description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
               toastType: 'SNACK_BAR'
            })
         }
      >
         Toast with title and description
      </Button>
   </div>
)
