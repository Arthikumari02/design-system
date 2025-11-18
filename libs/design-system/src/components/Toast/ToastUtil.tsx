import 'react-toastify/dist/ReactToastify.css'
import { toast, cssTransition } from 'react-toastify'

import { Toast } from './Toast'

import {
   ActionToastPropsType,
   SnackBarToastProps,
   ToastProps,
   ToastPropsWithOutSnackBarVariant
} from './types'

import './index.css'

export const isToastElement = (element: Element): boolean =>
   Boolean(
      element.closest('.Toastify__toast') ||
         element.closest('.Toastify__toast-container')
   )

let toastId: string | number

const dismissToast = (): void => {
   if (toast.isActive(toastId)) {
      toast.dismiss(toastId)
   }
}

const slide = cssTransition({
   enter: 'slide-in',
   exit: 'slide-out'
})

export const actionToast = (props: ToastProps): void => {
   dismissToast()

   toastId = toast(
      ({ closeToast }) => (
         <Toast
            {...props}
            dismissToast={closeToast}
            secondaryAction={
               props.secondaryAction
                  ? {
                       onClick: closeToast,
                       ...props.secondaryAction
                    }
                  : undefined
            }
         />
      ),
      {
         transition: slide,
         position: 'bottom-center',
         autoClose: props.autoCloseAfter ?? 1500
      }
   )
}

export const showToast = (props: ToastPropsWithOutSnackBarVariant): void => {
   dismissToast()

   actionToast(props)
}

const onAlertOnClickAction = (): void => {
   alert('Please provide onClickAction for refresh')
}

export const showErrorToastWithRefresh = (
   props: ActionToastPropsType
): void => {
   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'ERROR',
      primaryAction: {
         buttonText: props.buttonText ? props.buttonText : 'Refresh',
         type: 'RETRY',
         onClick: props.onClickAction ?? onAlertOnClickAction
      }
   }

   actionToast(toastProps)
}

export const showErrorToastWithRetry = (props: ActionToastPropsType): void => {
   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'ERROR',
      primaryAction: {
         buttonText: props.buttonText ? props.buttonText : 'Retry',
         type: 'RETRY',
         onClick: props.onClickAction ?? onAlertOnClickAction
      }
   }

   actionToast(toastProps)
}

export const showSnackBarToast = (props: SnackBarToastProps): void => {
   dismissToast()

   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'SNACK_BAR',
      variant: 'SNACK_BAR'
   }
   actionToast(toastProps)
}

export const showBrandToast = (props: ActionToastPropsType): void => {
   dismissToast()

   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'BRAND'
   }
   actionToast(toastProps)
}

export const showErrorToast = (props: ActionToastPropsType): void => {
   dismissToast()

   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'ERROR'
   }
   actionToast(toastProps)
}

export function showWarningToast(props: ActionToastPropsType): void {
   dismissToast()

   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'WARNING',
      ...(props.buttonText &&
         props.onClickAction && {
            primaryAction: {
               buttonText: props.buttonText,
               type: 'NAVIGATION',
               onClick: props.onClickAction
            }
         })
   }
   actionToast(toastProps)
}

export const showSuccessToast = (props: ActionToastPropsType): void => {
   dismissToast()

   const toastProps: ToastProps = {
      title: props.title,
      description: props.description,
      toastType: props.toastType ?? 'COLOURED',
      variant: 'SUCCESS'
   }
   actionToast(toastProps)
}
