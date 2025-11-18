export declare type ToastVariantType =
   | 'SUCCESS'
   | 'ERROR'
   | 'WARNING'
   | 'BRAND'
   | 'SNACK_BAR'

export declare type ToastType = 'COLOURED' | 'PLAIN' | 'SNACK_BAR'

export declare type PrimaryActionVariant = 'NAVIGATION' | 'RETRY'

export interface ActionToastPropsType {
   title: string

   description?: string
   toastType?: ToastType
   buttonText?: string

   autoClose?: number

   onClickAction?: () => void
}

export type SnackBarToastProps = Omit<ActionToastPropsType, 'toastType'> & {
   toastType?: Exclude<ToastType, 'COLOURED' | 'PLAIN'>
}

export interface PrimaryActionType {
   type: PrimaryActionVariant
   buttonText: string

   onClick: () => void

   shouldShowNavigationIcon?: boolean
}

export interface SecondaryActionType {
   buttonText: string

   onClick?: () => void
}

export interface ToastProps {
   title: string
   toastType: ToastType
   variant: ToastVariantType

   autoCloseAfter?: number
   description?: string
   shouldRenderedLeftIcon?: boolean
   primaryAction?: PrimaryActionType
   secondaryAction?: SecondaryActionType
   containerClassName?: string

   dismissToast?: () => void
   customPrimaryAction?: () => React.ReactElement
   customSecondaryAction?: () => React.ReactElement
   customLeftIcon?: () => React.ReactElement
}

export type ToastPropsWithOutSnackBarVariant = Omit<ToastProps, 'variant'> & {
   variant: Exclude<ToastVariantType, 'SNACK_BAR'>
}

export interface ToastStylesType {
   bgColor: string
   borderStyles: string
   titleColor: string
   descriptionColor: string
}
