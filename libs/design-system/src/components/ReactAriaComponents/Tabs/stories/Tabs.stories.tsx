import React from 'react'

import Tabs from '../Tabs'

import { DefaultStory } from './Default.stories'

export default {
   component: Tabs,
   title: 'Components/RACTabs',
   argTypes: {
      size: {
         options: ['Small', 'Medium']
      }
   }
}

export const defaultTabs = props => <DefaultStory {...props} />
