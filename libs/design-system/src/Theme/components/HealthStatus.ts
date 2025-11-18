import { HealthStatusThemeType } from '../../components/HealthStatus/types'

export const HEALTH_STATUS_THEME: HealthStatusThemeType = {
   NOT_STARTED: {
      dotBgColor: 'bg-fg-quarterary-500',
      statusTextColor: 'text-quarterary-500'
   },
   NOT_TRACKED: {
      dotBgColor: 'bg-fg-quarterary-500',
      statusTextColor: 'text-quarterary-500'
   },
   ON_TRACK: {
      dotBgColor: 'bg-fg-brand-secondary-500',
      statusTextColor: 'text-brand-secondary-700'
   },
   BEHIND: {
      dotBgColor: 'bg-fg-warning-primary',
      statusTextColor: 'text-warning-primary-600'
   },
   ACHIEVED: {
      dotBgColor: 'bg-fg-success-primary',
      statusTextColor: 'text-success-primary-600'
   },
   AT_RISK: {
      dotBgColor: 'bg-fg-error-primary',
      statusTextColor: 'text-error-primary-600'
   },
   EXCEEDED: {
      dotBgColor: 'bg-utility-violet-600',
      statusTextColor: 'text-utility-purple-600'
   }
}
