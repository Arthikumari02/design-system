import React, { useRef, useState } from 'react'

import { ChevronDownIcon } from '../../icons/ChevronDownIcon'
import { OutlineStarIcon } from '../../icons/OutlineStarIcon'
import { OutlineSunIcon } from '../../icons/OutlineSunIcon'
import { ProfileIcon } from '../../icons/ProfileIcon'

import { Button, Hierarchy, SubVariant } from '../ReactAriaComponents/Button'
import {
   CloseButton,
   CloseButtonSubVariant
} from '../ReactAriaComponents/CloseButton'
import {
   IconButton,
   IconButtonHierarchy,
   IconButtonSubVariant
} from '../ReactAriaComponents/IconButton'

import ActionsMenuDropdownV2 from './ActionsMenuDropdownV2'
import * as Styles from './styles'
import { MenuOptionType } from './types'

export default {
   component: ActionsMenuDropdownV2,
   title: 'components/ActionsMenuDropdownV2'
}

const defaultOptions: MenuOptionType[] = [
   {
      label: 'Copy',
      value: 'Copy',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   },
   {
      label: 'Rename',
      value: 'Rename',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   }
]

export const DefaultActionsMenuDropDown = () => (
   <div className='w-[200px]'>
      <ActionsMenuDropdownV2
         options={defaultOptions}
         triggerContainerClassName='w-fit'
         placement='bottom left'
      />
   </div>
)

const neutralAndDestructiveVariantOptions: MenuOptionType[] = [
   {
      label: 'Copy',
      value: 'Copy',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   },
   {
      label: 'Delete',
      value: 'Delete',
      variant: 'Destructive',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   }
]

export const NeutralAndDestructiveVariantActions = () => (
   <div className='w-[200px]'>
      <ActionsMenuDropdownV2
         options={neutralAndDestructiveVariantOptions}
         triggerContainerClassName='w-fit'
      />
   </div>
)

const optionsWithSeparator: MenuOptionType[] = [
   {
      label: 'Copy',
      value: 'Copy',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   },
   {
      label: 'Delete',
      value: 'Delete',
      variant: 'Destructive',
      shouldShowSeparator: true,
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   }
]

export const ActionsWithSeparator = () => (
   <div className='w-[200px]'>
      <ActionsMenuDropdownV2
         options={optionsWithSeparator}
         triggerContainerClassName='w-fit'
      />
   </div>
)

const actionsWithLeftIcons: MenuOptionType[] = [
   {
      label: 'Profile',
      value: 'Profile',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },

      renderLeftIcon: () => <ProfileIcon className='fill-neutral-600' />
   },
   {
      label: 'Alarm',
      value: 'Alarm',
      variant: 'Destructive',
      shouldShowSeparator: true,
      renderLeftIcon: () => <OutlineSunIcon className='stroke-error-600' />,
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   }
]

export const ActionsWithLeftIcons = () => (
   <div className='w-[200px]'>
      <ActionsMenuDropdownV2
         options={actionsWithLeftIcons}
         triggerContainerClassName='w-fit'
      />
   </div>
)

const disabledActions: MenuOptionType[] = [
   {
      label: 'Profile',
      value: 'Profile',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },

      renderLeftIcon: () => <ProfileIcon className='fill-neutral-600' />
   },
   {
      label: 'Alarm',
      value: 'Alarm',
      variant: 'Destructive',
      shouldShowSeparator: true,

      isDisabled: true,
      renderLeftIcon: () => <OutlineSunIcon className='stroke-gray-500' />,
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   }
]

export const DisabledActions = () => (
   <div className='w-[200px]'>
      <ActionsMenuDropdownV2
         options={disabledActions}
         triggerContainerClassName='w-fit'
      />
   </div>
)

const ActionsBodyPlacementTemplate = args => (
   <div className='flex justify-center items-center h-full w-full'>
      <ActionsMenuDropdownV2
         options={disabledActions}
         isOpen={true}
         {...args}
      />
   </div>
)

export const ActionsPopoverPlacement = ActionsBodyPlacementTemplate.bind({})

ActionsPopoverPlacement.args = {
   placement: 'bottom right'
}

const renderOptionText = (optionProp: MenuOptionType): React.ReactElement => (
   <p className={Styles.getOptionTextStyles(optionProp)}>{optionProp.label}</p>
)

const customOptions: MenuOptionType[] = [
   {
      label: 'Option 1',
      value: 'Option 1',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      }
   },
   {
      label: 'Option 2',
      value: 'Option 2',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   },
   {
      label: 'Option 3',
      value: 'Option 3',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   },
   {
      label: 'Option 4',
      value: 'Option 4',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   },
   {
      label: 'Option 5',
      value: 'Option 5',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   },
   {
      label: 'Option 6',
      value: 'Option 6',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   },
   {
      label: 'Option 7',
      value: 'Option 7',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true
   }
]

const getBorderColors = (): string => {
   const borderColors = [
      'border-rose-600',
      'border-cyan-600',
      'border-orange-dark-600',
      'moss-600',
      'border-gray-blue-600'
   ]

   const randomIndex = Math.floor(Math.random() * borderColors.length)

   return borderColors[randomIndex]
}

const renderCustomOption = (
   optionProps: MenuOptionType
): React.ReactElement => (
   <div
      className={Styles.getOptionWrapperStyles(optionProps)}
      key={optionProps.value}
   >
      <div
         className={`flex items-center my-[2px] border-t-[4px] px-md py-[10px] ${getBorderColors()} rounded-[6px]`}
         onClick={() => alert(`Clicked ${optionProps.value} Action`)}
      >
         <div className='w-2 h-2 mr-md  rounded-full bg-utility-gray-blue-600' />
         {renderOptionText(optionProps)}
      </div>
   </div>
)

export const CustomOptionActionMenu = () => (
   <div className='flex justify-center items-center h-full w-full'>
      <ActionsMenuDropdownV2
         options={customOptions}
         renderCustomOption={renderCustomOption}
         popoverBodyContainerClassName=' border-[4px] border-pink-500'
      />
   </div>
)

export const CustomTrigger = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const customTriggerRef = useRef<HTMLDivElement>(null)

   const onClickTrigger = (): void => setIsOpen(true)

   const customTrigger = (): React.ReactElement => (
      <div
         className='flex items-center cursor-pointer px-md py-[10px] rounded-md border border-green-200 bg-pink-400 '
         ref={customTriggerRef}
         onClick={onClickTrigger}
      >
         <p className='mr-2 text-base-white'>Select Status</p>
         <ChevronDownIcon className='stroke-base-white' />
      </div>
   )

   return (
      <div className='flex justify-center items-center h-full w-full'>
         <ActionsMenuDropdownV2
            options={customOptions}
            triggerConfig={{
               isOpen: isOpen,
               onOpenChange: setIsOpen,
               triggerRef: customTriggerRef,
               renderTrigger: customTrigger
            }}
         />
      </div>
   )
}

export const CustomTriggerWithDesignSystemButton = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const customTriggerRef = useRef<HTMLButtonElement>(null)

   const onClickTrigger = (): void => setIsOpen(true)

   const customTrigger = (): React.ReactElement => (
      <Button
         hierarchy={Hierarchy.Secondary}
         subVariant={SubVariant.GrayOutline}
         size='Medium'
         shouldPassEventPropagation={true}
         ref={customTriggerRef}
         onClick={onClickTrigger}
      >
         Click Me!
      </Button>
   )

   return (
      <div className='flex justify-center items-center h-full w-full'>
         <ActionsMenuDropdownV2
            options={customOptions}
            triggerConfig={{
               isOpen: isOpen,
               onOpenChange: setIsOpen,
               triggerRef: customTriggerRef,
               renderTrigger: customTrigger
            }}
         />
      </div>
   )
}

export const CustomTriggerWithDesignSystemIconButton = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const customTriggerRef = useRef<HTMLButtonElement>(null)

   const onClickTrigger = (): void => setIsOpen(true)

   const customTrigger = (): React.ReactElement => (
      <IconButton
         hierarchy={IconButtonHierarchy.Secondary}
         subVariant={IconButtonSubVariant.GrayOutline}
         size='Medium'
         shouldPassEventPropagation={true}
         onClick={onClickTrigger}
         icon={() => (
            <OutlineStarIcon
               width={20}
               height={20}
               className='stroke-button-tertiary-fg'
            />
         )}
         ref={customTriggerRef}
      />
   )
   return (
      <div className='flex justify-center items-center h-full w-full'>
         <ActionsMenuDropdownV2
            options={customOptions}
            triggerConfig={{
               isOpen: isOpen,
               onOpenChange: setIsOpen,
               triggerRef: customTriggerRef,
               renderTrigger: customTrigger
            }}
         />
      </div>
   )
}

export const CustomTriggerWithDesignSystemCloseButton = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const customTriggerRef = useRef<HTMLDivElement>(null)

   const onClickTrigger = (): void => setIsOpen(true)

   const customTrigger = (): React.ReactElement => (
      <div onClick={onClickTrigger} ref={customTriggerRef}>
         <CloseButton
            subVariant={CloseButtonSubVariant.Gray}
            size='Medium'
            shouldPassEventPropagation={true}
         />
      </div>
   )

   return (
      <div className='flex justify-center items-center h-full w-full'>
         <ActionsMenuDropdownV2
            options={customOptions}
            triggerConfig={{
               isOpen: isOpen,
               onOpenChange: setIsOpen,
               triggerRef: customTriggerRef,
               renderTrigger: customTrigger
            }}
         />
      </div>
   )
}

export const ControlledActions = () => (
   <div className='flex justify-center items-center h-full w-full'>
      <ActionsMenuDropdownV2 options={customOptions} />
   </div>
)

const customOptionsWithRightIcons: MenuOptionType[] = [
   {
      label: 'Option 1',
      value: 'Option 1',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      renderRightIcon: () => <ProfileIcon className='fill-neutral-600' />
   },
   {
      label: 'Option with Long text to ensure truncate',
      value: 'Option 2',
      variant: 'Neutral',
      onClick: (value: string) => {
         alert(`Clicked ${value} Action`)
      },
      shouldShowSeparator: true,
      renderLeftIcon: () => <ProfileIcon className='fill-neutral-600' />,
      renderRightIcon: () => <ProfileIcon className='fill-neutral-600' />
   }
]
export const ActionsMenuDropdownWithRightIcon = () => (
   <div className='flex justify-center items-center h-full w-full'>
      <ActionsMenuDropdownV2 options={customOptionsWithRightIcons} />
   </div>
)
