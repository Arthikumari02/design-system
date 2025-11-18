import { ProgressbarVariantThemeType } from '../../components/Progressbar/types'

export const PROGRESS_BAR_THEME: ProgressbarVariantThemeType = {
   GRAY: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-quaternary',
      leftHalfBgColor: '#EAECF0',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-primary',
      thumbBgColor: 'bg-fg-white'
   },
   GRAY_SLATE: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-gray-slate-500',
      leftHalfBgColor: '#667085',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-[#667085]',
      thumbBgColor: 'bg-fg-white'
   },
   PRIMARY: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-fg-brand-primary-600',
      leftHalfBgColor: '#1570EF',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-brand-solid',
      thumbBgColor: 'bg-fg-white'
   },
   WARNING: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-fg-warning-primary',
      leftHalfBgColor: '#DC6803',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-warning-solid',
      thumbBgColor: 'bg-fg-white'
   },
   SUCCESS: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-fg-success-primary',
      leftHalfBgColor: '#099250',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-success-solid',
      thumbBgColor: 'bg-fg-white'
   },
   ERROR: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-fg-error-primary',
      leftHalfBgColor: '#D92D20',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-error-solid',
      thumbBgColor: 'bg-fg-white'
   },
   PURPLE: {
      trackBgColor: 'bg-quaternary',
      filledBgColor: 'bg-utility-purple-600',
      leftHalfBgColor: '#6938EF',
      rightHalfBgColor: '#EAECF0',
      labelTextColor: 'text-secondary-700',
      thumbBorderColor: 'border-utility-purple-600',
      thumbBgColor: 'bg-fg-white'
   }
}
