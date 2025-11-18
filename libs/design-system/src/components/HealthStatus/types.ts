export type Size = 'Small' | 'Large'

export interface HealthStatusStyles {
   dotBgColor: string
   textColor: string
}

export interface StatusThemeType {
   statusTextColor: string
   dotBgColor: string
}

export interface HealthStatusThemeType {
   [key: string]: StatusThemeType
}
