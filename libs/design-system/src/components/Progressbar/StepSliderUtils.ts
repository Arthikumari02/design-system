import { StepsProgressBarSize } from './types'

export const findStep = (value: number, steps: number[]) => {
   for (let i = 0; i < steps.length - 1; i++) {
      if (steps[i] <= value && value < steps[i + 1]) {
         const mid = (steps[i] + steps[i + 1]) / 2

         if (value >= mid) {
            return steps[i + 1]
         }
         return steps[i]
      }
   }

   if (value < steps[0]) {
      return steps[0]
   }
   if (value >= steps[steps.length - 1]) {
      return steps[steps.length - 1]
   }
}

export const getProgressbarThumbWidthBasedOnSize = (
   size: StepsProgressBarSize
): number => {
   switch (size) {
      case 'Large':
         return 12
      default:
         return 12
   }
}
