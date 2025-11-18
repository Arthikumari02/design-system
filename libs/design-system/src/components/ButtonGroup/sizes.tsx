import { ButtonGroupVariant, ExtendedSize } from './types'

interface MenuOptionSizesType {
   typography: string
   padding: string
   borderRadius: string
}

interface MenuOptionBoxStylesType {
   [key: string]: Record<ExtendedSize, MenuOptionSizesType>
}

interface TriggerSizesType {
   selectedOptionPadding: string
   triggerBoxPadding: string
   borderRadius: string
}

interface MenuTriggerBoxStylesType {
   [key: string]: Record<ExtendedSize, TriggerSizesType>
}

export const menuOptionBoxStyles: MenuOptionBoxStylesType = {
   OUTLINE: {
      Small: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      },
      Large: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      }
   },
   ICON: {
      Small: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      },
      Large: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      }
   },
   PLAIN: {
      Small: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      },
      Large: {
         typography: 'text-sm-medium',
         padding: 'pl-md py-md-utility pr-md-utility',
         borderRadius: 'rounded-[6px]'
      }
   }
}

export const getMenuOptionSizeStyles = (
   variant: ButtonGroupVariant,
   size: ExtendedSize
): MenuOptionSizesType => {
   try {
      return menuOptionBoxStyles[variant][size]
   } catch {
      throw new Error(
         `Variant: ${variant} , Size : ${size} Doesn't Exit. You can add this in the theme config.`
      )
   }
}

export const menuTriggerBoxStyles: MenuTriggerBoxStylesType = {
   OUTLINE: {
      Small: {
         triggerBoxPadding: 'p-xs',
         selectedOptionPadding: 'pl-md py-xs pr-md-utility',
         borderRadius: 'rounded-xs'
      },
      Large: {
         triggerBoxPadding: 'p-md',
         selectedOptionPadding: 'pl-lg py-md pr-md-utility',
         borderRadius: 'rounded-md'
      }
   },
   PLAIN: {
      Small: {
         triggerBoxPadding: 'p-xs',
         selectedOptionPadding: 'pl-md py-xs pr-md-utility',
         borderRadius: 'rounded-xs'
      },
      Large: {
         triggerBoxPadding: 'p-md',
         selectedOptionPadding: 'pl-lg py-md pr-md-utility',
         borderRadius: 'rounded-md'
      }
   }
}

export const getMenuTriggerBoxSizeStyles = (
   variant: ButtonGroupVariant,
   size: ExtendedSize
): TriggerSizesType => {
   try {
      return menuTriggerBoxStyles[variant][size]
   } catch {
      throw new Error(
         `Variant: ${variant} , Size : ${size} Doesn't Exit. You can add this in the theme config.`
      )
   }
}
