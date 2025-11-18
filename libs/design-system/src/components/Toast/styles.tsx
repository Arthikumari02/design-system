import { ToastStylesType, ToastType, ToastVariantType } from './types'

export const toastContainerStyles = ` flex justify-start  rounded-xl w-full sm:max-w-[90vw] md:max-w-[60vw] pl-md_border-1 pr-xl_border-1 pt-md_border-1 pb-md_border-1`

export const toastInfoWithCloseActionContainerStyles = `flex grow overflow-x-hidden justify-between  my-md`
export const toastInfoContainer = 'flex flex-col grow overflow-x-hidden mr-md'

export const toastTitleStyles = `text-sm-semibold md:truncate`
export const toastDescriptionStyles = `text-sm-regular mt-xs md:truncate`

const toastVariantColorStyles = {
   SUCCESS: {
      bgColor: 'bg-success-primary',
      borderStyles: 'border border-[#73E2A3]',
      titleColor: '!text-success-primary-600',
      descriptionColor: '!text-success-primary-600'
   },
   ERROR: {
      bgColor: 'bg-error-primary',
      borderStyles: 'border border-error',
      titleColor: '!text-error-primary-600',
      descriptionColor: '!text-error-primary-600'
   },
   WARNING: {
      bgColor: 'bg-warning-primary',
      borderStyles: 'border border-[#FEC84B]',
      titleColor: '!text-warning-primary-600',
      descriptionColor: '!text-warning-primary-600'
   },
   BRAND: {
      bgColor: 'bg-brand-primary',
      borderStyles: 'border border-brand',
      titleColor: '!text-brand-secondary-700',
      descriptionColor: '!text-brand-secondary-700'
   }
}

export const getToastStyles = (
   variant: ToastVariantType,
   toastType: ToastType
): ToastStylesType => {
   const isValidSnackbar = variant === 'SNACK_BAR' && toastType !== 'SNACK_BAR'

   if (isValidSnackbar) {
      throw new Error(
         `Variant: SNACK_BAR with toast type: ${toastType} is not supported`
      )
   }

   switch (toastType) {
      case 'PLAIN':
         return {
            bgColor: 'bg-primary_alt',
            borderStyles: 'border border-primary',
            titleColor: '!text-secondary-700',
            descriptionColor: '!text-tertiary-600'
         }
      case 'SNACK_BAR':
         return {
            bgColor: 'bg-primary-solid',
            borderStyles: 'border-none',
            titleColor: '!text-fg-white',
            descriptionColor: '!text-fg-white'
         }
      case 'COLOURED': {
         if (variant !== 'SNACK_BAR')
            return {
               bgColor: toastVariantColorStyles[variant].bgColor,
               borderStyles: toastVariantColorStyles[variant].borderStyles,
               titleColor: toastVariantColorStyles[variant].titleColor,
               descriptionColor:
                  toastVariantColorStyles[variant].descriptionColor
            }
         throw new Error(
            'Variant: SNACK_BAR with toast type: COLOURED is not supported '
         )
      }
      default: {
         throw new Error(`Given variant: ${variant} is not supported `)
      }
   }
}

export const getActionIconColorBasedOnVariant = (
   variant: ToastVariantType,
   toastType: ToastType
): { stroke: string; fill: string } => {
   const isToastTypePlain = toastType === 'PLAIN'

   if (isToastTypePlain) {
      return {
         stroke: 'stroke-fg-brand-primary-600',
         fill: 'fill-fg-brand-primary-600'
      }
   }

   switch (variant) {
      case 'BRAND':
         return {
            stroke: 'stroke-fg-brand-primary-600',
            fill: 'fill-fg-brand-primary-600'
         }
      case 'SNACK_BAR':
         throw new Error("Variant: SNACK_BAR doesn't have actions")
      case 'SUCCESS':
         return {
            stroke: 'stroke-fg-success-primary',
            fill: 'fill-fg-success-primary'
         }
      case 'ERROR':
         return {
            stroke: 'stroke-fg-error-primary',
            fill: 'fill-fg-error-primary'
         }
      case 'WARNING':
         return {
            stroke: 'stroke-fg-warning-primary',
            fill: 'fill-fg-warning-primary'
         }
   }
}

export const getLeftIconColorBasedOnVariant = (
   variant: ToastVariantType
): string => {
   switch (variant) {
      case 'BRAND':
         return 'stroke-fg-brand-primary-600'
      case 'SNACK_BAR':
         return 'stroke-fg-white'
      case 'SUCCESS':
         return 'stroke-fg-success-primary'
      case 'ERROR':
         return 'stroke-fg-error-primary'
      case 'WARNING':
         return 'stroke-fg-warning-primary'
   }
}

export const getPrimaryActionTextColorBasedOnVariant = (
   variant: ToastVariantType
): string => {
   switch (variant) {
      case 'BRAND':
         return '!text-button-secondary-color-fg'
      case 'SNACK_BAR':
         throw new Error("Variant: SNACK_BAR doesn't have a primary action")
      case 'SUCCESS':
         return '!text-fg-success-primary'
      case 'ERROR':
         return '!text-fg-error-primary'
      case 'WARNING':
         return '!text-fg-warning-primary'
   }
}

export const getSecondaryActionTextColorBasedOnVariant = (
   variant: ToastVariantType
): string => {
   switch (variant) {
      case 'BRAND':
         return '!text-button-tertiary-color-fg'
      case 'SNACK_BAR':
         throw new Error("Variant: SNACK_BAR doesn't have a secondary action")
      case 'SUCCESS':
         return '!text-fg-success-secondary'
      case 'ERROR':
         return '!text-fg-error-secondary'
      case 'WARNING':
         return '!text-fg-warning-secondary'
   }
}
