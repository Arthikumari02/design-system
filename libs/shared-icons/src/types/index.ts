interface CommonIconType {
   id: string
   height: number
   width: number
   className: string
}

interface OutlineIconType extends CommonIconType {
   type: 'OUTLINE'
}

interface SolidIconType extends CommonIconType {
   type: 'SOLID'
}

interface DuotoneIconType extends CommonIconType {
   type: 'DUOTONE'
   fillOpacity?: number
}

interface AppIconType extends Omit<CommonIconType, 'className'> {
   type: 'APP'
   className?: string
}

interface FileIconType extends CommonIconType {
   type: 'FILE'
}

interface MiscellaneousIconType extends Omit<CommonIconType, 'className'> {
   type: 'MISCELLANEOUS'
   className?: string
}

export type UnionIconType =
   | OutlineIconType
   | SolidIconType
   | DuotoneIconType
   | AppIconType
   | FileIconType
   | MiscellaneousIconType

export type FeaturedIconVariant =
   | 'BRAND'
   | 'GRAY'
   | 'ERROR'
   | 'WARNING'
   | 'SUCCESS'
   | 'CUSTOM'

export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl'

interface CommonFeaturedIconProps {
   size: FeaturedIconSize
   iconId: string
   iconType: 'OUTLINE' | 'SOLID' | 'DUOTONE' | 'APP' | 'FILE' | 'MISCELLANEOUS'
}

interface FeaturedBrandIconProps extends CommonFeaturedIconProps {
   variant: 'BRAND'
}

interface FeaturedGrayIconProps extends CommonFeaturedIconProps {
   variant: 'GRAY'
}

interface FeaturedErrorIconProps extends CommonFeaturedIconProps {
   variant: 'ERROR'
}

interface FeaturedWarningIconProps extends CommonFeaturedIconProps {
   variant: 'WARNING'
}

interface FeaturedSuccessIconProps extends CommonFeaturedIconProps {
   variant: 'SUCCESS'
}

export interface FeaturedIconCustomProps extends CommonFeaturedIconProps {
   variant: 'CUSTOM'
   bg: string
   fg: string
   iconClassName: string
}

export type FeaturedIconProps =
   | FeaturedBrandIconProps
   | FeaturedGrayIconProps
   | FeaturedErrorIconProps
   | FeaturedWarningIconProps
   | FeaturedSuccessIconProps
   | FeaturedIconCustomProps
