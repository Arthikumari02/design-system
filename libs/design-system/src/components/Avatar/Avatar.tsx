import cn from 'classnames'
import { ReactElement } from 'react'

import { useFocusRing } from '@react-aria/focus'

import { AvatarSize } from '../../types'

import { avatarFocusClassName } from './AvatarGroup/styles'
import {
   avatarContainerClassName,
   avatarWithIconContainer,
   avatarWithImageClassName,
   avatarWithTextContainerClassName,
   statusIconClassName
} from './styles'
import { AvatarShape, AvatarType } from './types'
import {
   getAvatarShape,
   getAvatarSize,
   getFontSize,
   getStatusIndicationSize,
   getTwoLettersFromUsername,
   getUserIconSize
} from './utils'

import { getAvatarProfileTextColor, getAvatarProfileBgColor } from './constants'
import './Avatar.css'

export interface AvatarProps {
   name: string
   type: AvatarType
   shape: AvatarShape
   size: AvatarSize
   imageURL?: string
   textColor?: string
   bgColor?: string
   userIcon?: (width: number, height: number) => ReactElement
   showStatus?: boolean
   containerClassName?: string
   avatarClassName?: string
   avatarTextClassName?: string
   avatarImgContainerClassName?: string
   avatarDefaultTextClassName?: string
}

export const Avatar = (props: AvatarProps): ReactElement => {
   const {
      name,
      type,
      shape,
      size,
      imageURL,
      textColor,
      bgColor,
      showStatus,
      avatarImgContainerClassName,
      avatarDefaultTextClassName,
      userIcon
   } = props

   const firstTwoLetters = getTwoLettersFromUsername(name)

   const firstLetter = firstTwoLetters[0]

   const colorOrToken = textColor
      ? textColor
      : getAvatarProfileTextColor(firstLetter)
   const bgOrToken = bgColor ? bgColor : getAvatarProfileBgColor(firstLetter)

   const isTextToken =
      typeof colorOrToken === 'string' && colorOrToken.startsWith('text-')
   const isBgToken =
      typeof bgOrToken === 'string' && bgOrToken.startsWith('bg-')

   const { isFocused, focusProps } = useFocusRing({
      within: true
   })

   const renderStatusIcon = (): ReactElement | null => (
      <div
         className={`${cn(statusIconClassName)} ${getStatusIndicationSize(size)}`}
      ></div>
   )

   const renderAvatarWithImage = (): ReactElement => (
      <div
         className={`${getAvatarShape(size, shape)} ${getAvatarSize(size)} ${cn(
            {
               [avatarFocusClassName]: isFocused
            }
         )}
         )} ${avatarImgContainerClassName}`}
         {...focusProps}
      >
         <img
            src={imageURL}
            alt={name}
            className={` ${cn(avatarWithImageClassName)} ${getAvatarShape(
               size,
               shape
            )} ${props.avatarClassName}`}
            title={name}
         />
      </div>
   )

   const renderAvatarWithIcon = (): ReactElement => {
      const width = getUserIconSize(size)
      const height = getUserIconSize(size)
      return (
         <div
            className={` ${cn(avatarWithIconContainer)} ${getAvatarShape(
               size,
               shape
            )} ${getAvatarSize(size)} ${'avatar-bg'} 
            ${cn(isFocused ? avatarFocusClassName : '')}`}
            title={name}
         >
            {userIcon && userIcon(width, height)}
         </div>
      )
   }

   const renderAvatarWithText = (): ReactElement => (
      <div
         className={` ${cn(avatarWithTextContainerClassName)} ${getAvatarShape(
            size,
            shape
         )} ${getAvatarSize(size)} ${'avatar-bg'} ${props.avatarTextClassName}
         ${cn(isFocused ? avatarFocusClassName : '')} ${isBgToken ? bgOrToken : ''}`}
         style={isBgToken ? undefined : { background: bgOrToken as string }}
         title={name}
      >
         <span
            className={`${getFontSize(size)} ${avatarDefaultTextClassName} ${
               isTextToken ? (colorOrToken as string) : ''
            }`}
            style={isTextToken ? undefined : { color: colorOrToken as string }}
         >
            {firstTwoLetters}
         </span>
      </div>
   )

   const renderAvatar = (): ReactElement => {
      switch (type) {
         case 'Image':
            return renderAvatarWithImage()
         case 'Icon':
            return renderAvatarWithIcon()

         case 'Text':
            return renderAvatarWithText()
      }
   }

   return (
      <div
         className={cn(
            avatarContainerClassName,
            showStatus ? 'relative' : '',
            props.containerClassName
         )}
      >
         {renderAvatar()}
         {showStatus ? renderStatusIcon() : null}
      </div>
   )
}
