import { Elevation } from './types'

const mappedElevationStyles: Record<Elevation, string> = {
   None: 'shadow-none',
   ExtraSmall: 'shadow-custom-xs',
   Small: 'shadow-custom-sm',
   Medium: 'shadow-custom-md',
   Large: 'shadow-custom-lg',
   ExtraLarge: 'shadow-custom-xl',
   DoubleExtraLarge: 'shadow-custom-2xl',
   TripleExtraLarge: 'shadow-custom-3xl'
}

export const getCardContainerClassNames = (elevation: Elevation): string => {
   const boxShadow = mappedElevationStyles[elevation]

   return `
      bg-primary border-primary
      rounded-4xl
      ${boxShadow}
   `
}
