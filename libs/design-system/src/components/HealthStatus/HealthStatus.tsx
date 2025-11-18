import React from 'react'
import cn from 'classnames'

import { HealthStatusType } from '../../types'

import { HealthStatusStyles, Size } from './types'
import { healthStatusSizes } from './sizes'
import * as Styles from './styles'

interface HealthStatusProps {
   title: string
   status: HealthStatusType

   size?: Size
   showDot?: boolean
   dotClassName?: string
   containerClassName?: string
   titleClassName?: string
   shouldShowTooltip?: boolean
}

const HealthStatus = (props: HealthStatusProps): React.ReactElement => {
   const {
      status,
      title,
      size = 'Small',
      showDot = true,
      titleClassName,
      dotClassName,
      containerClassName,
      shouldShowTooltip = false
   } = props

   const { dotBgColor, textColor }: HealthStatusStyles =
      Styles.getHealthStatusStyles(status)

   const sizedTheme = healthStatusSizes[size]

   const renderTitle = (): React.ReactElement => (
      <p
         className={cn(textColor, sizedTheme.typography, titleClassName)}
         title={shouldShowTooltip ? title : undefined}
      >
         {title}
      </p>
   )

   const renderDot = (): React.ReactElement => (
      <div
         className={cn(
            dotBgColor,
            sizedTheme.width,
            sizedTheme.height,
            Styles.dotStyles,
            dotClassName
         )}
      />
   )

   return (
      <div className={cn(Styles.StatusContainerStyles, containerClassName)}>
         {showDot ? renderDot() : null}
         {renderTitle()}
      </div>
   )
}

export default HealthStatus
