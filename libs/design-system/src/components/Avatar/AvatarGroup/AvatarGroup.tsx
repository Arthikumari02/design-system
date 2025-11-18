import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { ReactElement, useMemo, useRef } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import uuidV4 from 'react-uuid'

import { useFocusRing } from '@react-aria/focus'

import { AvatarGroupSize } from '../../../types'

import { Avatar } from '../Avatar'
import '../Avatar.css'
import { AvatarDetails, AvatarShape, AvatarType } from '../types'
import {
   getAvatarGroupSize,
   getAvatarShape,
   getAvatarSize,
   getFontSize,
   getLeftMargin
} from '../utils'

import {
   avatarCountContainerClassName,
   avatarCounterWrapper,
   avatarCountTextClassName,
   avatarFocusClassName,
   avatarGroupContainerClassName,
   avatarWrapperClassName
} from './styles'
export interface AvatarGroupProps {
   type: AvatarType
   shape: AvatarShape
   size: AvatarGroupSize
   maxDisplayCount: number
   children?: ReactElement
   avatars: AvatarDetails[]
   showStatus?: boolean
   usersListToolTipClassName?: string
   tooltipPlacement?: PlacesType
   shouldShowTooltip?: boolean
   className?: string
}

const AvatarGroup = observer((props: AvatarGroupProps) => {
   const {
      type,
      shape,
      size,
      maxDisplayCount,
      children,
      avatars,
      showStatus,
      usersListToolTipClassName,
      tooltipPlacement = 'top',
      shouldShowTooltip = true,
      className
   } = props

   const { isFocused, focusProps } = useFocusRing({
      within: true
   })
   let counterZIndex = 0
   const tooltipIdRef = useRef(uuidV4())

   const avatarSize = useMemo(() => getAvatarGroupSize(size), [size])

   const renderCount = (remainingAvatarsCount: number): React.ReactElement => (
      <span
         className={`${cn(avatarCountTextClassName)} ${getFontSize(avatarSize)}`}
      >{`+${remainingAvatarsCount}`}</span>
   )

   const customTooltip = (): React.ReactElement => (
      <div className={'w-[200px] break-words'}>
         {avatars.map((item, index) => {
            const isLastItem = index === avatars.length - 1

            return (
               <span key={uuidV4()}>
                  {item.name}
                  {isLastItem ? null : ', '}
               </span>
            )
         })}
      </div>
   )

   const renderRemainingAvailableAvatarsCount =
      (): React.ReactElement | null => {
         const remainingAvatarsCount = avatars.length - maxDisplayCount
         const shouldDisplayRemainingAvatarsCount = remainingAvatarsCount > 0

         if (shouldDisplayRemainingAvatarsCount) {
            const zIndex = counterZIndex + 1

            return (
               <div
                  className={cn(
                     getAvatarShape(avatarSize, shape),
                     getLeftMargin(avatarSize, zIndex),
                     cn(avatarCounterWrapper)
                  )}
               >
                  <div
                     className={`
               ${'bg-tertiary'}  
               ${getAvatarShape(avatarSize, shape)} 
               ${getAvatarSize(avatarSize)}
               ${cn(avatarCountContainerClassName)}
               `}
                     data-tooltip-id={tooltipIdRef.current}
                     data-tooltip-position-strategy='fixed'
                  >
                     {renderCount(remainingAvatarsCount)}
                  </div>
                  {shouldShowTooltip ? (
                     <Tooltip
                        id={tooltipIdRef.current}
                        classNameArrow={'bg-gray-slate-900'}
                        className={`rounded-md !z-l10 ${usersListToolTipClassName}`}
                        place={tooltipPlacement}
                     >
                        {customTooltip()}
                     </Tooltip>
                  ) : null}
               </div>
            )
         }
         return null
      }

   const renderAvatar = (
      avatarDetails: AvatarDetails,
      zIndex: number,
      childrenPosition: number
   ): ReactElement => {
      const { name, imageURL, userIcon } = avatarDetails
      const isFirstChild = childrenPosition === 0
      return (
         <div
            key={uuidV4()}
            className={`
            ${getAvatarShape(avatarSize, shape)}
            ${isFirstChild ? '' : getLeftMargin(avatarSize, zIndex)} 
            ${cn(isFirstChild ? '' : avatarWrapperClassName)}
            ${cn(isFocused ? avatarFocusClassName : '')}
            `}
            {...focusProps}
         >
            <Avatar
               name={name}
               type={avatarDetails.avatarType ? avatarDetails.avatarType : type}
               shape={shape}
               size={avatarSize}
               imageURL={imageURL && imageURL}
               userIcon={userIcon && userIcon}
               showStatus={showStatus && showStatus}
            />
         </div>
      )
   }

   const getAvatarZIndex = (index: number): number => {
      const zIndex = index
      counterZIndex = zIndex + 1
      return zIndex
   }

   const renderAvatars = (): ReactElement[] => {
      const numberOfMaximumAvatarsToBeDisplayed: AvatarDetails[] =
         avatars.slice(0, maxDisplayCount)

      return numberOfMaximumAvatarsToBeDisplayed.map(
         (avatarDetails: AvatarDetails, index: number) =>
            renderAvatar(avatarDetails, getAvatarZIndex(index), index)
      )
   }

   return (
      <div className={cn(avatarGroupContainerClassName, className)}>
         {renderAvatars()}
         {renderRemainingAvailableAvatarsCount()}
         {children ? children : null}
      </div>
   )
})

export { AvatarGroup }
