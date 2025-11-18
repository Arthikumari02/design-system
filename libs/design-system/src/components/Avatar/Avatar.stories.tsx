import React from 'react'

import { ProfileIcon } from '../../icons/ProfileIcon'

import { AvatarGroup } from './AvatarGroup/AvatarGroup'

import { Avatar } from './Avatar'
import { AvatarDetails } from './types'
import { AvatarLabelGroup } from './AvatarLabelGroup/AvatarLabelGroup'

export default {
   component: Avatar,
   title: 'components/Avatar'
}

const renderIcon = (width: number, height: number): React.ReactElement => (
   <ProfileIcon
      height={height}
      width={width}
      className='fill-button-secondary-fg'
   />
)

const avatars: AvatarDetails[] = [
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   }
]

//TODO: Add appropriate args type in all functions
const AvatarWithGroupTemplate = args => (
   <div className='flex flex-col justify-center items-center'>
      <AvatarGroup
         type='Image'
         shape='Circular'
         size='Small'
         avatars={avatars}
         maxDisplayCount={5}
         {...args}
      />
   </div>
)

export const AvatarWithGroup = AvatarWithGroupTemplate.bind({})

AvatarWithGroup.args = {
   maxDisplayCount: 5,
   userIcon: renderIcon
}

const AvatarTemplate = args => (
   <Avatar
      name={'jagadeesh '}
      type='Image'
      shape='Circular'
      size='Medium'
      imageURL='https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg'
      {...args}
   />
)

export const BasicAvatar = AvatarTemplate.bind({})

BasicAvatar.args = {
   userIcon: renderIcon
}

const AvatarLabelTemplate = args => (
   <AvatarLabelGroup
      name={'Olivia Rhye'}
      type='Image'
      shape='Circular'
      size='Small'
      imageURL='https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg'
      description='olivia@untitledui.com'
      showStatus={true}
      {...args}
   />
)

export const AvatarWithLabelGroup = AvatarLabelTemplate.bind({})

AvatarWithLabelGroup.args = {
   userIcon: renderIcon
}
