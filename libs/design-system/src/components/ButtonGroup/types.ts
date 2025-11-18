import { ReactElement, RefObject } from 'react'

import { Placement } from '../../types'
import { IconPropsType } from '../../types/IconTypes'
export type ExtendedSize = 'Small' | 'Large'

export type ButtonGroupVariant = 'PLAIN' | 'ICON' | 'OUTLINE'

export type MenuItemType = 'SELECTION' | 'ACTION'

export interface OptionType {
   id: string
   label: string
   value: string
   showShowSeparator?: boolean
   isDisabled?: boolean
   itemType?: MenuItemType
   showSeparator?: boolean
}

export interface IconVariantOptionType extends OptionType {
   icon: (iconProps?: IconPropsType) => React.ReactElement
   onClick?: () => void
}

export interface DefaultOptionType extends OptionType {
   icon?: (iconProps?: IconPropsType) => React.ReactElement
   onClick?: () => void
}

export type MenuOptionType = IconVariantOptionType | DefaultOptionType

export interface MenuOptionThemeStyles {
   bgColor: string
   textColor: string
}

export interface DropdownColorThemeType {
   [key: string]: MenuOptionThemeStyles
}

export interface CommonButtonGroupProps {
   id?: string
   isOpen?: boolean
   size?: ExtendedSize
   placement?: Placement
   selectedOptionId?: string
   selectedValue?: string
   placeholderText?: string
   underlayClassName?: string
   optionTextClassName?: string
   optionContainerClassName?: string
   containerClassName?: string
   shouldStopPropagation?: boolean
   optionsListContainerClassName?: string
   underlayZIndex?: number
   isButtonHovered?: boolean
   onOpenChange?: (isOpen: boolean) => void
   renderCustomTrigger?: (triggerRef: RefObject<HTMLElement>) => ReactElement
   onSelectionChange?: (optionId: string, value: string) => void
   renderCustomOption?: (optionProps: MenuOptionType) => ReactElement
}

export interface ButtonGroupIconVariant extends CommonButtonGroupProps {
   variant: 'ICON'
   options: IconVariantOptionType[]
}

export interface ButtonGroupDefaultVariant extends CommonButtonGroupProps {
   variant: 'PLAIN' | 'OUTLINE'
   options: DefaultOptionType[]
}

export type ButtonGroupProps =
   | ButtonGroupIconVariant
   | ButtonGroupDefaultVariant
