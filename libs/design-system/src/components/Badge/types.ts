export type Size = 'Small' | 'Medium' | 'Large'

export interface BadgeStyles {
   bgColor: string
   borderColor: string
   textColor: string
   iconColors: IconColors
   dotColor: string
}

export type IconColors = {
   fill: string
   stroke: string
}

// TODO: rename this to ColorVariantType as it is not an Enum
export type ColorVariantEnum =
   | 'GRAY'
   | 'BRAND'
   | 'ERROR'
   | 'SUCCESS'
   | 'WARNING'
   | 'PURPLE'
   | 'GRAY_BLUE'
   | 'BLUE_LIGHT'
   | 'BLUE'
   | 'INDIGO'
   | 'PINK'
   | 'ORANGE'

export type BadgeType = 'PILL' | 'PILL_OUTLINE' | 'BADGE'
