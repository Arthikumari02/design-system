import cn from 'classnames'
import React, { ReactElement, useMemo } from 'react'

import { AvatarLabelSize } from '../../../types'
import { Avatar, AvatarProps } from '../Avatar'
import {
   getAvatarDescriptionStyles,
   getAvatarLabelMargins,
   getAvatarLabelGroupSize,
   getAvatarLabelStyles
} from '../utils'

import {
   avatarLabelContainerClassName,
   avatarLabelWrapper,
   descriptionClassName,
   labelTextClassName
} from './styles'

export interface AvatarLabelProps extends AvatarProps {
   description?: string
   labelClassName?: string
   labelDescriptionClassName?: string
   avatarBgColor?: string
   avatarTextColor?: string
   avatarLabelTextContainerClassName?: string
   renderCustomDescription?: () => React.ReactNode
   size: AvatarLabelSize
}

const AvatarLabelGroup = (props: AvatarLabelProps) => {
   const {
      name,
      type,
      shape,
      size,
      imageURL,
      description,
      userIcon,
      showStatus,
      labelClassName,
      labelDescriptionClassName,
      avatarBgColor,
      avatarTextColor,
      renderCustomDescription,
      containerClassName,
      avatarImgContainerClassName,
      avatarTextClassName,
      avatarDefaultTextClassName,
      avatarLabelTextContainerClassName
   } = props

   const avatarSize = useMemo(() => getAvatarLabelGroupSize(size), [size])

   const renderAvatarLabel = (): ReactElement => (
      <p
         title={name}
         className={`${cn(labelTextClassName)} 
                     ${getAvatarLabelStyles(
                        avatarSize
                     )} ${labelClassName}        
                  `}
      >
         {name}
      </p>
   )

   const renderAvatarDescription = (): ReactElement | null =>
      description ? (
         <p
            title={description}
            className={`${cn(descriptionClassName)}
                     ${getAvatarDescriptionStyles(
                        avatarSize
                     )} ${labelDescriptionClassName}`}
         >
            {description}
         </p>
      ) : null

   const renderAvatarLabelDetails = (): ReactElement => (
      <div
         className={`${cn(avatarLabelWrapper)} 
         ${getAvatarLabelMargins(
            avatarSize
         )} ${avatarLabelTextContainerClassName}`}
      >
         {renderAvatarLabel()}
         {renderCustomDescription
            ? renderCustomDescription()
            : renderAvatarDescription()}
      </div>
   )

   return (
      <div className={cn(avatarLabelContainerClassName, containerClassName)}>
         <Avatar
            name={name}
            type={type}
            shape={shape}
            size={avatarSize}
            imageURL={imageURL}
            userIcon={userIcon}
            showStatus={showStatus}
            bgColor={avatarBgColor}
            textColor={avatarTextColor}
            avatarImgContainerClassName={avatarImgContainerClassName}
            avatarTextClassName={avatarTextClassName}
            avatarDefaultTextClassName={avatarDefaultTextClassName}
         />
         {renderAvatarLabelDetails()}
      </div>
   )
}

export { AvatarLabelGroup }
