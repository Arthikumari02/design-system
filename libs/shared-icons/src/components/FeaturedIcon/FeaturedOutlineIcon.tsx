import React from 'react'

import Icon from '../Icon/Icon'
import { FeaturedIconCustomProps, FeaturedIconProps } from '../../types'

const FeaturedOutlineIcon = (props: FeaturedIconProps): React.ReactElement => {
   const {
      variant = 'BRAND',
      size = 'md',
      iconId,
      iconType = 'OUTLINE',
      ...rest
   } = props

   // Size mapping
   const sizeMap: Record<
      FeaturedIconProps['size'],
      {
         icon: number
         middleRingSize: number
         middleRingWidth: number
         outerRingSize: number
         outerRingWidth: number
      }
   > = {
      sm: {
         icon: 16,
         middleRingSize: 24,
         middleRingWidth: 2,
         outerRingSize: 34,
         outerRingWidth: 2
      },
      md: {
         icon: 20,
         middleRingSize: 28,
         middleRingWidth: 2,
         outerRingSize: 38,
         outerRingWidth: 2
      },
      lg: {
         icon: 24,
         middleRingSize: 32,
         middleRingWidth: 2,
         outerRingSize: 42,
         outerRingWidth: 2
      },
      xl: {
         icon: 28,
         middleRingSize: 36,
         middleRingWidth: 2,
         outerRingSize: 46,
         outerRingWidth: 2
      }
   }

   // Color mapping
   const colorMap: Record<
      FeaturedIconProps['variant'],
      {
         middleRingColor: string
         outerRingColor: string
         fill: string
      }
   > = {
      BRAND: {
         middleRingColor: 'var(--fg-brand-primary-600)',
         outerRingColor: 'var(--fg-brand-primary-600)',
         fill: 'fill-fg-brand-primary-600'
      },
      GRAY: {
         middleRingColor: 'var(--gray-slate-600)',
         outerRingColor: 'var(--gray-slate-600)',
         fill: 'fill-fg-gray-primary-600'
      },
      ERROR: {
         middleRingColor: 'var(--fg-error-primary)',
         outerRingColor: 'var(--fg-error-primary)',
         fill: 'fill-fg-error-primary'
      },
      WARNING: {
         middleRingColor: 'var(--fg-warning-primary)',
         outerRingColor: 'var(--fg-warning-primary)',
         fill: 'fill-fg-warning-primary'
      },
      SUCCESS: {
         middleRingColor: 'var(--fg-success-primary)',
         outerRingColor: 'var(--fg-success-primary)',
         fill: 'fill-fg-success-primary'
      },
      CUSTOM: {
         middleRingColor:
            variant === 'CUSTOM' ? (props as FeaturedIconCustomProps).bg : '',
         outerRingColor:
            variant === 'CUSTOM' ? (props as FeaturedIconCustomProps).fg : '',
         fill:
            variant === 'CUSTOM'
               ? (props as FeaturedIconCustomProps).iconClassName
               : ''
      }
   }

   const {
      icon: iconSize,
      middleRingSize,
      middleRingWidth,
      outerRingSize,
      outerRingWidth
   } = sizeMap[size]
   const { middleRingColor, outerRingColor, fill } = colorMap[variant]

   return (
      <div
         className='relative'
         style={{
            width: outerRingSize,
            height: outerRingSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}
         {...rest}
      >
         {/* Outer Ring (Transparent light color) - opacity 0.1 */}
         <div
            className={`absolute rounded-full border-solid ${outerRingColor}`}
            style={{
               top: 0,
               left: 0,
               width: outerRingSize,
               height: outerRingSize,
               borderWidth: `${outerRingWidth}px`,
               borderColor: outerRingColor,
               opacity: 0.1,
               boxSizing: 'border-box'
            }}
         />

         {/* Middle Ring - opacity 0.3 */}
         <div
            className={`absolute rounded-full ${middleRingColor}`}
            style={{
               top: '50%',
               left: '50%',
               width: middleRingSize,
               height: middleRingSize,
               borderWidth: `${middleRingWidth}px`,
               borderColor: middleRingColor,
               opacity: 0.3,
               boxSizing: 'border-box',
               transform: 'translate(-50%, -50%)'
            }}
         />

         {/* Icon Container */}
         <div
            className='flex items-center justify-center'
            style={{
               position: 'relative',
               zIndex: 1,
               width: iconSize,
               height: iconSize
            }}
         >
            <Icon
               id={iconId}
               type={iconType}
               width={iconSize}
               height={iconSize}
               className={fill}
            />
         </div>
      </div>
   )
}

export default FeaturedOutlineIcon
