import React, { ReactNode } from 'react'
import cn from 'classnames'

import { badgeColorVariants } from './constants/badgeColorVariants'
import {
   Size,
   ColorVariantEnum,
   BadgeStyles,
   BadgeType,
   IconColors
} from './types'
import {
   badgeIconsContainerClassName,
   dotClassName,
   dotContainerClassName,
   getLeftAndRightPaddingsBasedOnType
} from './styles'
import {
   getBadgeStyles,
   badgeSizes,
   getBadgeBorderStyles,
   BadgeSizesEnum,
   BadgeVariants
} from '.'

interface BadgeProps {
   type?: BadgeType
   size?: Size
   variant?: ColorVariantEnum
   children: ReactNode
   title?: string
   showDot?: boolean
   leftElement?: (iconColors: IconColors) => ReactNode
   rightElement?: (iconColors: IconColors) => ReactNode
   containerClassName?: string
   badgeTextClassName?: string
   badgeContainerClassName?: string
}

const Badge = (props: BadgeProps): React.ReactElement => {
   const {
      children,
      leftElement,
      rightElement,
      variant,
      title,
      containerClassName,
      size = BadgeSizesEnum.Medium,
      showDot = false,
      badgeTextClassName,
      type = 'PILL',
      badgeContainerClassName
   } = props

   const badgeVariant = variant ? variant : BadgeVariants.Primary

   const {
      bgColor,
      textColor,
      borderColor,
      iconColors,
      dotColor
   }: BadgeStyles = getBadgeStyles(type, badgeVariant, badgeColorVariants)

   const sizedTheme = badgeSizes[size]

   const badgeBorderStyles = getBadgeBorderStyles(
      borderColor,
      sizedTheme.badgeBorder
   )

   const renderBadgeWithLeftAndRightElements = (): React.ReactElement => (
      <div
         className={cn(badgeIconsContainerClassName, badgeContainerClassName)}
      >
         {leftElement ? (
            <div className={cn(sizedTheme.leftIconMargin)}>
               {leftElement(iconColors)}
            </div>
         ) : null}
         <p className={`${badgeTextClassName} truncate`}>{children}</p>
         {rightElement ? (
            <div className={cn('flex flex-col', sizedTheme.rightIconMargin)}>
               {rightElement(iconColors)}
            </div>
         ) : null}
      </div>
   )

   const renderBadgeWithDot = (): React.ReactElement => (
      <div className={dotContainerClassName}>
         <div className={sizedTheme.dotLeftMargin}>
            <div className={cn(dotColor, dotClassName)} />
         </div>
         <p className={`${badgeTextClassName} truncate`}>{children}</p>
      </div>
   )

   const renderBadge = (): React.ReactElement => {
      if (showDot) {
         return renderBadgeWithDot()
      } else {
         return renderBadgeWithLeftAndRightElements()
      }
   }

   const leftAndRightPaddings = getLeftAndRightPaddingsBasedOnType(
      type,
      showDot,
      sizedTheme,
      leftElement,
      rightElement
   )

   const isBadgeTypeNotPillOutline = type !== 'PILL_OUTLINE'

   return (
      <div
         className={cn(
            `w-fit break-all max-w-full`,
            textColor,
            containerClassName,
            sizedTheme[type].padding,
            sizedTheme.typography,
            sizedTheme[type].borderRadius,
            badgeBorderStyles,
            leftAndRightPaddings,
            { [bgColor]: isBadgeTypeNotPillOutline }
         )}
         title={title}
      >
         {renderBadge()}
      </div>
   )
}

export { Badge }
