import React from 'react'

import Icon from '../Icon/Icon'
import {
   FeaturedIconProps,
   FeaturedIconSize,
   FeaturedIconVariant,
   FeaturedIconCustomProps
} from '../../types'

const FeaturedSolidIcon = (props: FeaturedIconProps): React.ReactElement => {
   const {
      variant = 'BRAND',
      size = 'md',
      iconId,
      iconType = 'OUTLINE',
      ...rest
   } = props

   // Size mapping
   const sizeMap: Record<
      FeaturedIconSize,
      {
         size: number
         icon: number
      }
   > = {
      sm: { size: 32, icon: 16 },
      md: { size: 40, icon: 20 },
      lg: { size: 48, icon: 24 },
      xl: { size: 56, icon: 28 }
   }

   // Color mapping
   const colorMap: Record<FeaturedIconVariant, { bg: string; fill: string }> = {
      BRAND: {
         bg: '#D1E9FF',
         fill: 'fill-featured-icon-light-fg-brand'
      },
      GRAY: {
         bg: '#F2F4F7',
         fill: 'fill-featured-icon-light-fg-gray'
      },
      ERROR: {
         bg: '#FEE4E2',
         fill: 'fill-featured-icon-light-fg-error'
      },
      WARNING: {
         bg: '#FEF0C7',
         fill: 'fill-featured-icon-light-fg-warning'
      },
      SUCCESS: {
         bg: '#D3F8DF',
         fill: 'fill-featured-icon-light-fg-success'
      },
      CUSTOM: {
         bg: variant === 'CUSTOM' ? (props as FeaturedIconCustomProps).bg : '',
         fill:
            variant === 'CUSTOM'
               ? (props as FeaturedIconCustomProps).iconClassName
               : ''
      }
   }

   const { size: circleSize, icon: iconSize } = sizeMap[size]
   const colors = colorMap[variant]
   const backgroundColor = colors.bg
   const foregroundColor = colors.fill

   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={circleSize}
         height={circleSize}
         viewBox={`0 0 ${circleSize} ${circleSize}`}
         fill='none'
         {...rest}
      >
         {/* Background circle */}
         <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2}
            fill={backgroundColor}
         />
         {/* Icon placeholder */}
         <g
            transform={`translate(${(circleSize - iconSize) / 2}, ${(circleSize - iconSize) / 2})`}
         >
            <Icon
               type={iconType}
               id={iconId}
               width={iconSize}
               height={iconSize}
               className={foregroundColor}
            />
         </g>
      </svg>
   )
}

export default FeaturedSolidIcon
