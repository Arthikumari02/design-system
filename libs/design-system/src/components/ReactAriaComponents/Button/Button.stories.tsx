import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { RadioUnSelectedIcon } from '../../../icons/RadioUnSelectedIcon'
import { UserIcon } from '../../../icons/UserIcon'

import { Button, Hierarchy, SubVariant } from '.'
import { ButtonSize } from '../../../types'

export default {
   title: 'Components/Button',
   component: Button,
   argTypes: {
      hierarchy: {
         control: { type: 'select' },
         options: Object.values(Hierarchy)
      },
      subVariant: {
         control: { type: 'select' },
         options: Object.values(SubVariant)
      },
      size: {
         control: { type: 'select' },
         options: [
            'ExtraSmall',
            'Small',
            'Medium',
            'Large',
            'ExtraLarge',
            'DoubleExtraLarge'
         ]
      },
      isDisabled: { control: 'boolean' },
      isLoading: { control: 'boolean' },
      shouldShrinkButtonWhileLoading: { control: 'boolean' },
      autoFocus: { control: 'boolean' }
   }
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = args => <Button {...args} />

export const Playground = Template.bind({})
Playground.args = {
   hierarchy: Hierarchy.Secondary,
   subVariant: SubVariant.Primary,
   size: 'Medium',
   children: 'Button Text',
   isDisabled: false,
   isLoading: false,
   leftIcon: ({ stroke }) => <UserIcon className={stroke} />
}

/**
 * This story displays a matrix of all button hierarchies and their subvariants,
 * each showing normal, disabled, and loading states.
 */
export const VariantMatrix = () => {
   const variants = [
      {
         hierarchy: Hierarchy.Primary,
         title: 'Primary',
         subVariants: [
            { variant: SubVariant.Primary, label: 'Primary' },
            { variant: SubVariant.Destructive, label: 'Destructive' }
         ]
      },
      {
         hierarchy: Hierarchy.Secondary,
         title: 'Secondary',
         subVariants: [
            { variant: SubVariant.Primary, label: 'Primary' },
            { variant: SubVariant.GrayOutline, label: 'Gray Outline' },
            {
               variant: SubVariant.DestructiveOutline,
               label: 'Destructive Outline'
            }
         ]
      },
      {
         hierarchy: Hierarchy.Tertiary,
         title: 'Tertiary',
         subVariants: [
            { variant: SubVariant.Primary, label: 'Primary' },
            { variant: SubVariant.Gray, label: 'Gray' },
            { variant: SubVariant.Destructive, label: 'Destructive' }
         ]
      },
      {
         hierarchy: Hierarchy.Link,
         title: 'Link',
         subVariants: [
            { variant: SubVariant.Primary, label: 'Primary' },
            { variant: SubVariant.Gray, label: 'Gray' },
            { variant: SubVariant.Destructive, label: 'Destructive' }
         ]
      }
   ]

   return (
      <div>
         {variants.map(({ hierarchy, title, subVariants }) => (
            <div key={hierarchy} className='mb-8'>
               <h3 className='text-lg font-bold mb-4'>{title} Hierarchy</h3>
               <div className='grid grid-cols-3 gap-4'>
                  {subVariants.map(({ variant, label }) => (
                     <div
                        key={`${hierarchy}-${variant}`}
                        className='border p-4 rounded'
                     >
                        <h4 className='text-md font-semibold mb-2'>{label}</h4>
                        <div className='space-y-2'>
                           <Button
                              hierarchy={hierarchy}
                              subVariant={variant}
                              size='Medium'
                              leftIcon={({ stroke }) => (
                                 <RadioUnSelectedIcon className={stroke} />
                              )}
                           >
                              Normal
                           </Button>
                           <div className='h-2' />
                           <Button
                              hierarchy={hierarchy}
                              subVariant={variant}
                              size='Medium'
                              isDisabled
                           >
                              Disabled
                           </Button>
                           <div className='h-2' />
                           <Button
                              hierarchy={hierarchy}
                              subVariant={variant}
                              size='Medium'
                              isLoading
                           >
                              Loading
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}

/**
 * This story shows all available button sizes.
 */
export const ButtonSizes = () => {
   const sizes: ButtonSize[] = [
      'Small',
      'Medium',
      'Large',
      'ExtraLarge',
      'DoubleExtraLarge'
   ]

   return (
      <div className='space-y-4'>
         {sizes.map(size => (
            <div key={size} className='flex items-center gap-4'>
               <div className='w-36 text-right'>{size}:</div>
               <Button
                  hierarchy={Hierarchy.Primary}
                  subVariant={SubVariant.Primary}
                  size={size}
               >
                  {size} Button
               </Button>
            </div>
         ))}
      </div>
   )
}

/**
 * This story demonstrates buttons with icons in different positions.
 */
export const ButtonWithIcons = () => {
   const iconConfigurations = [
      {
         leftIcon: true,
         rightIcon: false,
         isLoading: false,
         label: 'Button with Left Icon'
      },
      {
         leftIcon: false,
         rightIcon: true,
         isLoading: false,
         label: 'Button with Right Icon'
      },
      {
         leftIcon: true,
         rightIcon: true,
         isLoading: false,
         label: 'Button With Left And Right Icons'
      },
      {
         leftIcon: true,
         rightIcon: true,
         isLoading: true,
         label: 'Button With Left And Right Icons (Loading)'
      }
   ]

   return (
      <div className='space-y-4'>
         {iconConfigurations.map((config, index) => (
            <div key={index} className='mb-4'>
               <Button
                  hierarchy={Hierarchy.Primary}
                  subVariant={SubVariant.Primary}
                  size='Medium'
                  leftIcon={
                     config.leftIcon
                        ? ({ stroke }) => (
                             <RadioUnSelectedIcon className={stroke} />
                          )
                        : undefined
                  }
                  rightIcon={
                     config.rightIcon
                        ? ({ stroke }) => (
                             <RadioUnSelectedIcon className={stroke} />
                          )
                        : undefined
                  }
                  isLoading={config.isLoading}
               >
                  {config.label}
               </Button>
            </div>
         ))}
      </div>
   )
}

/**
 * This story showcases icon-only buttons across different hierarchies.
 */
export const IconOnlyButtons = () => {
   const hierarchies = [
      {
         hierarchy: Hierarchy.Primary,
         subVariant: SubVariant.Primary,
         label: 'Primary'
      },
      {
         hierarchy: Hierarchy.Secondary,
         subVariant: SubVariant.GrayOutline,
         label: 'Secondary Gray'
      },
      {
         hierarchy: Hierarchy.Tertiary,
         subVariant: SubVariant.Gray,
         label: 'Tertiary Gray'
      }
   ]

   const sizes: ButtonSize[] = ['Small', 'Medium', 'Large']
   const sizeClassMap = {
      Small: 'px-md py-md',
      Medium: 'px-[10px] py-[10px]',
      Large: 'px-lg py-lg'
   }

   return (
      <div className='space-y-8'>
         {hierarchies.map(({ hierarchy, subVariant, label }) => (
            <div key={`${hierarchy}-${subVariant}`} className='mb-4'>
               <h3 className='text-md font-semibold mb-2'>{label}</h3>
               <div className='flex gap-4'>
                  {sizes.map(size => (
                     <Button
                        key={`${hierarchy}-${subVariant}-${size}`}
                        hierarchy={hierarchy}
                        subVariant={subVariant}
                        size={size}
                        className={sizeClassMap[size]}
                     >
                        <RadioUnSelectedIcon className='stroke-button-secondary-fg' />
                     </Button>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}

/**
 * This story demonstrates different loading states of buttons.
 */
export const LoadingStates = () => (
   <div className='space-y-8'>
      <div className='space-y-4'>
         <h3 className='text-md font-semibold'>Normal Loading</h3>
         <Button
            hierarchy={Hierarchy.Primary}
            subVariant={SubVariant.Primary}
            size='Medium'
            isLoading
         >
            Loading Button
         </Button>
      </div>

      <div className='space-y-4'>
         <h3 className='text-md font-semibold'>Shrink While Loading</h3>
         <Button
            hierarchy={Hierarchy.Primary}
            subVariant={SubVariant.Primary}
            size='Medium'
            isLoading
            shouldShrinkButtonWhileLoading
         >
            Loading Button
         </Button>
      </div>

      <div className='space-y-4'>
         <h3 className='text-md font-semibold'>Loading with Icons</h3>
         <Button
            hierarchy={Hierarchy.Primary}
            subVariant={SubVariant.Primary}
            size='Medium'
            isLoading
            leftIcon={({ stroke }) => (
               <RadioUnSelectedIcon className={stroke} />
            )}
            rightIcon={({ stroke }) => (
               <RadioUnSelectedIcon className={stroke} />
            )}
         >
            Loading with Icons
         </Button>
      </div>
   </div>
)

/**
 * This story showcases link buttons in different variants and states.
 */
export const LinkButtons = () => {
   const variants = [
      {
         subVariant: SubVariant.Gray,
         size: 'Small' as ButtonSize,
         label: 'Link Gray Button'
      },
      {
         subVariant: SubVariant.Primary,
         size: 'Small' as ButtonSize,
         label: 'Link Primary Button'
      },
      {
         subVariant: SubVariant.Destructive,
         size: 'Small' as ButtonSize,
         label: 'Link Destructive Button'
      }
   ]

   const states = [
      { state: {}, label: 'Normal' },
      { state: { isLoading: true }, label: 'Loading' },
      { state: { isDisabled: true }, label: 'Disabled' }
   ]

   return (
      <div className='space-y-8'>
         {variants.map(({ subVariant, size, label }) => (
            <div key={subVariant} className='mb-4'>
               <h3 className='text-md font-semibold mb-2'>{label}</h3>
               <div className='flex gap-4'>
                  {states.map((state, index) => (
                     <Button
                        key={index}
                        hierarchy={Hierarchy.Link}
                        subVariant={subVariant}
                        size={size}
                        {...state.state}
                     >
                        {label} ({state.label})
                     </Button>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}
