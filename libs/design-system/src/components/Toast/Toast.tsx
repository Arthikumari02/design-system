import cn from 'classnames'
import React from 'react'
import {
   ToastContainer as Container,
   ToastContainerProps
} from 'react-toastify'

import { Icon } from '@shared/icons'

import ArrowRightIcon from '../../icons/ArrowRightIcon'
import FeaturedCheckCircleIcon from '../../icons/FeaturedCheckCircleIcon'
import { XCloseIcon } from '../../icons/XCloseIcon/XCloseIcon'

import { Button, Hierarchy, SubVariant } from '../ReactAriaComponents/Button'

import * as Styles from './styles'
import { ToastProps } from './types'
import './index.css'

const Toast = (props: ToastProps): React.ReactElement => {
   const {
      secondaryAction,
      primaryAction,
      variant,
      shouldRenderedLeftIcon = true,
      toastType,
      dismissToast,
      customPrimaryAction,
      customSecondaryAction
   } = props
   const shouldShowNavigationIcon =
      primaryAction?.shouldShowNavigationIcon === undefined ||
      primaryAction?.shouldShowNavigationIcon
   const { bgColor, borderStyles, titleColor, descriptionColor } =
      Styles.getToastStyles(props.variant, toastType)
   const shouldRenderPrimaryAction =
      Boolean(primaryAction) === true || customPrimaryAction
   const shouldRenderSecondaryAction =
      Boolean(secondaryAction) === true || customSecondaryAction

   const hasActions = shouldRenderPrimaryAction || shouldRenderSecondaryAction
   const isToastTypePlain = toastType === 'PLAIN'
   const isToastVariantSnackBar = variant === 'SNACK_BAR'
   const closeIconFillColor = isToastVariantSnackBar
      ? 'stroke-fg-white'
      : 'stroke-fg-quinary-400'

   const renderRetryButton = (): React.ReactElement => {
      const buttonSubVariant = isToastTypePlain
         ? SubVariant.Primary
         : SubVariant.Destructive

      const buttonTextColorBasedOnVariant = isToastTypePlain
         ? ''
         : Styles.getPrimaryActionTextColorBasedOnVariant(variant)

      const { fill } = Styles.getActionIconColorBasedOnVariant(
         variant,
         toastType
      )

      return (
         <Button
            hierarchy={Hierarchy.Link}
            subVariant={buttonSubVariant}
            size={'Small'}
            onClick={primaryAction?.onClick}
            className={cn(buttonTextColorBasedOnVariant, 'bg-transparent')}
            leftIcon={() => (
               <Icon
                  type='OUTLINE'
                  id='refresh-ccw-01'
                  height={20}
                  width={20}
                  className={fill}
               />
            )}
         >
            {primaryAction?.buttonText}
         </Button>
      )
   }

   const renderArrowRightIcon = (): React.ReactElement => {
      const { stroke } = Styles.getActionIconColorBasedOnVariant(
         variant,
         toastType
      )
      return (
         <div className='ml-xxs'>
            <ArrowRightIcon className={stroke} />
         </div>
      )
   }

   const renderNavigationButton = (): React.ReactElement => {
      const buttonSubVariant = isToastTypePlain
         ? SubVariant.Primary
         : SubVariant.Gray
      const buttonTextColorBasedOnVariant = isToastTypePlain
         ? ''
         : Styles.getPrimaryActionTextColorBasedOnVariant(variant)

      return (
         <Button
            hierarchy={Hierarchy.Link}
            subVariant={buttonSubVariant}
            size={'Small'}
            onClick={primaryAction?.onClick}
            className={cn(buttonTextColorBasedOnVariant, 'bg-transparent')}
            rightIcon={
               shouldShowNavigationIcon ? renderArrowRightIcon : undefined
            }
         >
            {primaryAction?.buttonText}
         </Button>
      )
   }

   const renderPrimaryAction = (): React.ReactElement | null => {
      if (!shouldRenderPrimaryAction) return null
      switch (primaryAction?.type) {
         case 'RETRY':
            return renderRetryButton()
         case 'NAVIGATION':
            return renderNavigationButton()
         default:
            return null
      }
   }

   const renderSecondaryAction = (): React.ReactElement | null => {
      const buttonTextColorBasedOnVariant = isToastTypePlain
         ? ''
         : Styles.getSecondaryActionTextColorBasedOnVariant(variant)

      return shouldRenderSecondaryAction ? (
         <Button
            hierarchy={Hierarchy.Link}
            subVariant={SubVariant.Gray}
            size={'Small'}
            className={cn(
               'bg-transparent mr-lg',
               buttonTextColorBasedOnVariant
            )}
            onClick={secondaryAction?.onClick}
         >
            {secondaryAction?.buttonText}
         </Button>
      ) : null
   }

   const renderLeftIcon = (): React.ReactElement =>
      props.customLeftIcon ? (
         props.customLeftIcon()
      ) : (
         <div className='mr-md'>
            <FeaturedCheckCircleIcon
               className={Styles.getLeftIconColorBasedOnVariant(variant)}
            />
         </div>
      )

   const renderToastActions = (): React.ReactElement | null =>
      hasActions ? (
         <div className={'flex mt-lg'}>
            {customSecondaryAction
               ? customSecondaryAction()
               : renderSecondaryAction()}
            {customPrimaryAction
               ? customPrimaryAction()
               : renderPrimaryAction()}
         </div>
      ) : null

   const renderDescription = (): React.ReactElement | null =>
      props.description ? (
         <p
            className={cn(Styles.toastDescriptionStyles, descriptionColor)}
            title={props.description}
         >
            {props.description}
         </p>
      ) : null

   const renderTitle = (): React.ReactElement => (
      <p className={Styles.toastTitleStyles} title={props.title}>
         {props.title}
      </p>
   )

   return (
      <div
         className={cn(
            Styles.toastContainerStyles,
            borderStyles,
            bgColor,
            props.containerClassName
         )}
      >
         {shouldRenderedLeftIcon ? renderLeftIcon() : null}
         <div className={Styles.toastInfoWithCloseActionContainerStyles}>
            <div className={cn(Styles.toastInfoContainer, titleColor)}>
               {renderTitle()}
               {renderDescription()}
               {renderToastActions()}
            </div>
            <div
               onClick={dismissToast}
               className='sm:pointer-events-none md:pointer-events-auto cursor-pointer'
            >
               <XCloseIcon
                  width={20}
                  height={20}
                  className={closeIconFillColor}
               />
            </div>
         </div>
      </div>
   )
}

const ToastContainer = (props: ToastContainerProps) => (
   <Container
      position='bottom-center'
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      {...props}
   />
)
export { Toast, ToastContainer }
