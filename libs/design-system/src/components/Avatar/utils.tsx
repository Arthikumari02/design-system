import { AvatarGroupSize, AvatarLabelSize, AvatarSize } from '../../types'

import { EMPTY_STRING, SPECIAL_CHARS_REGEX } from './constants'
import { AvatarShape } from './types'

export const getAvatarSize = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'w-4 h-4'
      case 'ExtraSmall':
         return 'w-5 h-5'
      case 'Small':
         return 'w-6 h-6'
      case 'Medium':
         return 'w-8 h-8'
      case 'Large':
         return 'w-10 h-10'
      case 'ExtraLarge':
         return 'w-12 h-12'
      case 'DoubleExtraLarge':
         return 'w-14 h-14'
      case 'TrebleExtraLarge':
         return 'w-16 h-16'
   }
}

export const getUserIconSize = (size: AvatarSize): number => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 16
      case 'ExtraSmall':
         return 20
      case 'Small':
         return 24
      case 'Medium':
         return 32
      case 'Large':
         return 40
      case 'ExtraLarge':
         return 48
      case 'DoubleExtraLarge':
         return 56
      case 'TrebleExtraLarge':
         return 64
   }
}

export const getStatusIndicationSize = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'w-1 h-1 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'ExtraSmall':
         return 'w-1.5 h-1.5 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'Small':
         return 'w-2 h-2 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'Medium':
         return 'w-2.5 h-2.5 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'Large':
         return 'w-3 h-3 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'ExtraLarge':
         return 'w-3.5 h-3.5 box-content bg-fg-success-secondary rounded-full border border-2 border-button-primary-fg'
      case 'DoubleExtraLarge':
         return 'w-4 h-4 box-content bg-fg-success-secondary rounded-full  border border-2 border-button-primary-fg '
      case 'TrebleExtraLarge':
         return 'w-4.5 h-4.5 box-content bg-fg-success-secondary rounded-full  border border-2 border-button-primary-fg '
   }
}

export const getFontSize = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'text-xs-medium'
      case 'ExtraSmall':
         return 'text-sm-semibold'
      case 'Small':
         return 'text-xs-semibold'
      case 'Medium':
         return 'text-sm-semibold'
      case 'Large':
         return 'text-md-semibold'
      case 'ExtraLarge':
         return 'text-lg-semibold'
      case 'DoubleExtraLarge':
         return 'text-xl-semibold'
      case 'TrebleExtraLarge':
         return 'display-xs-semibold'
   }
}

export const getBorderRadius = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'rounded-xxs'
      case 'ExtraSmall':
         return 'rounded-xxs'
      case 'Small':
         return 'rounded-xxs'
      case 'Medium':
         return 'rounded-md'
      case 'Large':
         return 'rounded-lg'
      case 'ExtraLarge':
      case 'DoubleExtraLarge':
      case 'TrebleExtraLarge':
         return 'rounded-xl'
   }
}

export const getAvatarShape = (
   size: AvatarSize,
   variant: AvatarShape
): string => {
   switch (variant) {
      case 'Hexagon':
         return 'hexagonal'
      case 'Rounded':
         return getBorderRadius(size)
      case 'Circular':
         return 'rounded-full'
   }
}

export const getFirstTwoLettersFromGivenName = (name: string): string =>
   name.slice(0, 2)

export const getFirstLettersFromTheGivenStringList = (
   stringList: string[],
   stringsCountLimit = 2
): string =>
   stringList
      .slice(0, stringsCountLimit)
      .map(stringValue => stringValue.charAt(0))
      .join(EMPTY_STRING)

export const changeGivenTextToUpperCase = (text: string): string =>
   text.toUpperCase()

export const getStringWithoutRegexSelectedCharacters = (
   text: string,
   regex: RegExp = SPECIAL_CHARS_REGEX
): string => text.replace(regex, '')

export const getTwoLettersFromUsername = (name: string): string => {
   if (name) {
      const givenUsername = changeGivenTextToUpperCase(name)
      const stringList = getStringWithoutRegexSelectedCharacters(
         givenUsername,
         SPECIAL_CHARS_REGEX
      )
         .split(' ')
         .filter(string => string.length)

      return stringList.length > 1
         ? getFirstLettersFromTheGivenStringList(stringList, 2)
         : getFirstTwoLettersFromGivenName(givenUsername)
   }
   return EMPTY_STRING
}

export const getLeftMargin = (size: AvatarSize, zIndex: number): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return '-ml-sm'

      case 'ExtraSmall':
         return `-ml-md`
      case 'Small':
         return `-ml-[10px]`
      case 'Medium':
         return `-ml-xl`
      case 'Large':
         return `-ml-xl`

      case 'ExtraLarge':
         return `-ml-[22px]`
      case 'DoubleExtraLarge':
         return `-ml-[26px]`
      case 'TrebleExtraLarge':
         return `-ml-[30px]`
   }
}

export const getAvatarLabelStyles = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'text-2xs leading-4'
      case 'Small':
         return 'text-sm font-semibold'

      case 'Medium':
         return 'text-sm font-semibold'
      case 'Large':
         return 'text-sm font-semibold'
      case 'ExtraLarge':
         return 'text-md font-semibold'
      case 'DoubleExtraLarge':
         return 'text-lg font-semibold'
   }
   return ''
}

export const getAvatarDescriptionStyles = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'text-2xs leading-4'
      case 'Small':
         return 'text-xs leading-[18px]'

      case 'Medium':
         return 'text-xs font-regular'
      case 'Large':
         return 'text-sm font-regular'
      case 'ExtraLarge':
         return 'text-md font-regular'
      case 'DoubleExtraLarge':
         return 'text-md font-regular'
   }
   return ''
}

export const getAvatarLabelMargins = (size: AvatarSize): string => {
   switch (size) {
      case 'DoubleExtraSmall':
         return 'ml-[10px]'
      case 'Small':
         return 'ml-[10px]'

      case 'Medium':
         return 'ml-[10px]'
      case 'Large':
         return 'ml-lg'
      case 'ExtraLarge':
         return 'ml-[lg]'
      case 'DoubleExtraLarge':
         return 'ml-xl'
   }
   return ''
}

export const getAvatarLabelGroupSize = (size: AvatarLabelSize): AvatarSize => {
   switch (size) {
      case 'Small':
         return 'Medium'
      case 'Medium':
         return 'Large'
      case 'Large':
         return 'ExtraLarge'
      case 'ExtraLarge':
         return 'DoubleExtraLarge'
   }
}

export const getAvatarGroupSize = (size: AvatarGroupSize): AvatarSize => {
   switch (size) {
      case 'ExtraSmall':
         return 'Small'

      case 'Small':
         return 'Medium'

      case 'Medium':
         return 'Large'
   }
}
