import { action } from '@storybook/addon-actions'

import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import { ButtonRightArrowIcon } from '../../icons/ButtonRightArrowIcon'
import { Badge } from '.'

export const BadgeVariants = args => (
   <div className='flex items-center'>
      <Badge type='PILL' variant={'BLUE'} {...args}>
         Blue Badge
      </Badge>
      <Badge type='PILL' variant={'BRAND'} {...args}>
         Brand Badge
      </Badge>
      <Badge type='PILL' variant={'ERROR'} {...args}>
         Error Badge
      </Badge>
   </div>
)

const BadgeComponent = BadgeVariants.bind({})

export const BadgeWithIcons = (args: any) => (
   <div className='flex items-center'>
      <Badge
         type='PILL'
         variant={'ERROR'}
         leftElement={iconColors => (
            <ArrowLeftIcon
               className={`${iconColors.fill} ${iconColors.fill}`}
            />
         )}
         {...args}
      >
         Badge With Left Icon
      </Badge>
      <div className='ml-4' />
      <Badge
         type='PILL'
         variant={'BLUE'}
         rightElement={iconColors => (
            <ButtonRightArrowIcon className={iconColors.fill} />
         )}
         {...args}
      >
         Badge With Right Icon
      </Badge>

      <div className='ml-4' />
      <Badge
         type='PILL'
         variant={'SUCCESS'}
         leftElement={iconColors => (
            <ArrowLeftIcon
               className={`${iconColors.fill} ${iconColors.fill}`}
            />
         )}
         rightElement={() => <p>Arrow Right Icon</p>}
         {...args}
      >
         Badge With Left And Right Icons
      </Badge>
   </div>
)

const BadgeWithIconsComponent = BadgeWithIcons.bind({})

export const BadgeWithDot = (args: any) => (
   <div className='flex items-center'>
      <Badge variant={'SUCCESS'} type='PILL' showDot {...args}>
         Badge With Dot
      </Badge>
      <div className='ml-4' />
   </div>
)

const BadgeWithDotComponent = BadgeWithDot.bind({})

export default {
   title: 'Components/Badge',
   component: Badge
}
