import { Key } from '@react-types/shared'
import { ReactNode } from 'react'

export type ToggleButtonGroupVariant = 'Primary' | 'Secondary' | 'Gray'

export interface ToggleButtonStyles {
   bgColor: string
   textColor: string
   border: string
   iconColors: string
}

export interface ToggleButtonGroupStyles {
   containerClassName: string
   dividerColor: string
}

export interface ToggleButtonGroupStyleProps {
   variant: ToggleButtonGroupVariant
}

export interface ToggleButtonStyleProps {
   isHovered: boolean
   isPressed: boolean
   isSelected: boolean
   isDisabled: boolean
   variant: ToggleButtonGroupVariant
}

export interface ToggleButtonGroupProps {
   /**
    * The variant of the toggle button group
    * @default 'Primary'
    */
   variant?: ToggleButtonGroupVariant

   /**
    * Whether the toggle button group allows multiple selection
    * @default false
    */
   selectionMode?: 'single' | 'multiple'
   disallowEmptySelection?: boolean

   /**
    * The currently selected keys
    */
   selectedKeys?: Set<Key> | 'all'

   /**
    * Handler that is called when the selection changes
    */
   onSelectionChange?: (keys: Set<Key>) => void

   /**
    * The default selected keys (uncontrolled)
    */
   defaultSelectedKeys?: Set<Key> | 'all'

   /**
    * Whether the toggle button group is disabled
    * @default false
    */
   isDisabled?: boolean

   /**
    * The children of the toggle button group
    */
   children: ReactNode

   /**
    * Additional CSS class for the toggle button group
    */
   className?: string
}

export interface ToggleButtonProps {
   /**
    * The unique value for the button that will be used for selection
    */
   id: string

   /**
    * Whether the button is disabled
    * @default false
    */
   isDisabled?: boolean

   /**
    * The children of the button
    */
   children: ReactNode

   /**
    * Icon to display before the children
    */
   leftIcon?: ReactNode

   /**
    * Icon to display after the children
    */
   rightIcon?: ReactNode

   /**
    * Additional CSS class for the button
    */
   className?: string

   /**
    * Whether the button is the last button in the group
    * @default false
    */
   isLastButton?: boolean

   /**
    * Whether the button is the first button in the group
    * @default false
    */
   isFirstButton?: boolean
   title?: string
}
