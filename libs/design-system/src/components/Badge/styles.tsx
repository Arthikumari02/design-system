import { ReactNode } from 'react'
import cn from 'classnames'

import { BadgeStyles } from '.'
import { IconColors } from './types'
import { BadgeType } from './types'

export const getBadgeStyles = (
   type: BadgeType,
   colorVariant: string,
   theme: any
): BadgeStyles =>
   //TODO: update theme type
   ({
      bgColor: theme.badge[colorVariant]
         ? theme.badge[colorVariant].bgColor
         : theme.badge['PRIMARY'].bgColor,
      borderColor: theme.badge[colorVariant]
         ? theme.badge[colorVariant].borderColorForBadgeType[type]
         : theme.badge['PRIMARY'].borderColorForBadgeType[type],
      textColor: theme.badge[colorVariant]
         ? theme.badge[colorVariant].textColor
         : theme.badge['PRIMARY'].textColor,
      iconColors: theme.badge[colorVariant]
         ? theme.badge[colorVariant].iconColors
         : theme.badge['PRIMARY'].iconColors,
      dotColor: theme.badge[colorVariant]
         ? theme.badge[colorVariant].dotColor
         : theme.badge['PRIMARY'].dotColor
   })

export const getBadgeBorderStyles = (
   borderColor: string,
   badgeBorder: string
): string => `${badgeBorder} ${borderColor}`

export const dotClassName = 'h-[6px] w-[6px] rounded-full'

export const getLeftAndRightPaddingsBasedOnType = (
   type: BadgeType,
   showDot: boolean,
   sizedTheme: any,
   leftElement?: (iconColors: IconColors) => ReactNode,
   rightElement?: (iconColors: IconColors) => ReactNode
) =>
   cn(
      { [`ml-0 ${sizedTheme[type].paddingRight}`]: showDot },
      {
         [`${sizedTheme[type].paddingLeft}`]: !leftElement && !showDot
      },
      {
         [`${sizedTheme[type].paddingRight}`]: !rightElement && !showDot
      }
   )

export const dotContainerClassName =
   'flex items-center justify-center h-full p-[1px]'

export const badgeIconsContainerClassName =
   'flex items-center justify-center h-full'
