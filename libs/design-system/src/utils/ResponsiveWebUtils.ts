import {
   DESKTOP_MIN_WIDTH,
   MINI_DESKTOP_MAX_WIDTH,
   TABLET_MIN_WIDTH
} from '../constants/ResponsiveConstants'

// #region - Conditional Utils
export function isDesktop(): boolean {
   return window.innerWidth >= DESKTOP_MIN_WIDTH
}

export function isMobile(): boolean {
   if (window.innerWidth < TABLET_MIN_WIDTH) return true
   return false
}

export function isTablet(): boolean {
   return window.innerWidth >= TABLET_MIN_WIDTH
}

export function isMiniDesktop(): boolean {
   return window.innerWidth < MINI_DESKTOP_MAX_WIDTH
}
// #endregion

export type DeviceLayoutType = 'MOBILE' | 'TABLET' | 'DESKTOP'

export const getDeviceLayout = (): DeviceLayoutType => {
   switch (true) {
      case isDesktop():
         return 'DESKTOP'

      case isTablet():
         return 'TABLET'

      case isMobile():
         return 'MOBILE'

      default:
         return 'DESKTOP'
   }
}

// #region - FullScreen mode
export const getIsInFullScreenMode = (): boolean => !!document.fullscreenElement

export const enterFullScreenMode = async (
   element: HTMLElement
): Promise<void> => {
   try {
      if (element.requestFullscreen) await element.requestFullscreen()
      else if (
         // @ts-expect-error - requestFullscreen (Chrome, Safari and Opera)
         element.webkitRequestFullscreen
      ) {
         // @ts-expect-error - requestFullscreen (Chrome, Safari and Opera)
         await element.webkitRequestFullscreen()
      } else if (
         // @ts-expect-error - requestFullscreen (Firefox)
         element.mozRequestFullScreen
      ) {
         // @ts-expect-error - requestFullscreen (Firefox)
         await element.mozRequestFullScreen()
      } else if (
         // @ts-expect-error - requestFullscreen (IE/Edge)
         element.msRequestFullscreen
      ) {
         // @ts-expect-error - requestFullscreen (IE/Edge)
         await element.msRequestFullscreen()
      }
   } catch (fullscreenError) {
      console.error('Failed to enter Fullscreen mode:', fullscreenError)
   }
}

export const exitFullScreenMode = (): void => {
   const isInFullScreenMode = getIsInFullScreenMode()
   if (!isInFullScreenMode) return

   try {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (
         // @ts-expect-error - exitFullscreen (Chrome, Safari and Opera)
         document.webkitExitFullscreen
      ) {
         // @ts-expect-error - exitFullscreen (Chrome, Safari and Opera)
         document.webkitExitFullscreen()
      } else if (
         // @ts-expect-error - exitFullscreen (Firefox)
         document.mozCancelFullScreen
      ) {
         // @ts-expect-error - exitFullscreen (Firefox)
         document.mozCancelFullScreen()
      } else if (
         // @ts-expect-error - exitFullscreen (IE/Edge)
         document.msExitFullscreen
      ) {
         // @ts-expect-error - exitFullscreen (IE/Edge)
         document.msExitFullscreen()
      }
   } catch (fullscreenError) {
      console.error('Failed to exit Fullscreen mode:', fullscreenError)
   }
}
// #endregion

// #region - Orientation
export const lockOrientation = async (
   orientation: OrientationType | 'landscape' | 'portrait'
): Promise<void> => {
   try {
      // @ts-expect-error - Lock not available
      await window.screen?.orientation.lock(orientation)
   } catch (error) {
      console.error(error)
   }
}

export const unlockOrientation = (): void => {
   window.screen.orientation?.unlock?.()
}
// #endregion
