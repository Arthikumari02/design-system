import { HEALTH_STATUS_THEME } from '../../Theme/components/HealthStatus'
import { HealthStatusType } from '../../types'

import { HealthStatusStyles } from './types'

export const getHealthStatusStyles = (
   status: HealthStatusType
): HealthStatusStyles => {
   try {
      return {
         textColor: HEALTH_STATUS_THEME[status].statusTextColor,
         dotBgColor: HEALTH_STATUS_THEME[status].dotBgColor
      }
   } catch {
      throw new Error(
         `Status: ${status}  Doesn't Exit. You can add this  in the theme config.`
      )
   }
}

export const dotStyles = 'rounded-full'

export const StatusContainerStyles = 'flex items-center justify-center gap-x-1'
