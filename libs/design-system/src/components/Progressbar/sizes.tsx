import {
   ProgressBarSizesBasedOnVariantType,
   StepsProgressBarSizes,
   StepsProgressBarSize,
   ProgressbarVariant,
   ProgressbarSize,
   ExpectedValueSizesBasedOnVariantType
} from './types'

export const progressBarSizes: Record<
   ProgressbarVariant,
   Partial<Record<ProgressbarSize, ProgressBarSizesBasedOnVariantType>>
> = {
   DEFAULT: {
      Small: {
         height: 'h-1',
         borderRadius: 'rounded-full'
      },
      Large: {
         height: 'h-2',
         borderRadius: 'rounded-full'
      }
   },
   SLIDER: {
      Small: {
         height: 'h-1',
         borderRadius: 'rounded-full',
         thumbWidth: 'w-[12px]',
         thumbHeight: 'h-[12px]'
      },
      Large: {
         height: 'h-2',
         borderRadius: 'rounded-full',
         thumbWidth: 'w-[20px]',
         thumbHeight: 'h-[20px]'
      }
   }
}

export const getProgressbarSize = (
   variant: ProgressbarVariant,
   size: ProgressbarSize
): ProgressBarSizesBasedOnVariantType => {
   try {
      const value = progressBarSizes[variant][size]
      if (!value) {
         throw new Error(
            `Variant : ${variant}, Size : ${size}, This Combination Does not exist you can add this in config file.`
         )
      }
      return value
   } catch {
      throw new Error(
         `Variant : ${variant}, Size : ${size}, This Combination Does not exist you can add this in config file.`
      )
   }
}

export const stepsProgressBarSizes: Record<string, StepsProgressBarSizes> = {
   Large: {
      height: 'h-1',
      borderRadius: 'rounded-full',
      thumbWidth: 'w-[12px]',
      thumbHeight: 'h-[12px]'
   }
}

export const getStepsProgressbarSize = (
   size: StepsProgressBarSize
): ProgressBarSizesBasedOnVariantType => {
   try {
      return stepsProgressBarSizes[size]
   } catch {
      throw new Error(
         `Size : ${size} The Size Does not exist you can add this in config file.`
      )
   }
}

export const expectedValueSizes: Record<
   ProgressbarVariant,
   Partial<Record<ProgressbarSize, ExpectedValueSizesBasedOnVariantType>>
> = {
   DEFAULT: {
      Small: {
         expectedValueContainerStyles: '!mt-3',
         expectedValueIconWidth: 12,
         expectedValueIconHeight: 8
      },
      Large: {
         expectedValueContainerStyles: '!mt-[14px]',
         expectedValueIconWidth: 29,
         expectedValueIconHeight: 19
      }
   },
   SLIDER: {
      Small: {
         expectedValueContainerStyles: 'bottom-sm',
         expectedValueIconWidth: 12,
         expectedValueIconHeight: 8
      },
      Large: {
         expectedValueContainerStyles: 'bottom-xxs',
         expectedValueIconWidth: 29,
         expectedValueIconHeight: 19
      }
   }
}

export const getExpectedValueSize = (
   variant: ProgressbarVariant,
   size: ProgressbarSize
): ExpectedValueSizesBasedOnVariantType => {
   try {
      const value = expectedValueSizes[variant][size]
      if (!value) {
         throw new Error(
            `Variant : ${variant}, Size : ${size}, This Combination Does not exist you can add this in config file.`
         )
      }
      return value
   } catch {
      throw new Error(
         `Variant : ${variant}, Size : ${size}, This Combination Does not exist you can add this in config file.`
      )
   }
}
