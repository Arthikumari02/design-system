import { observer } from 'mobx-react'
import React from 'react'
import {
   Collection,
   Tabs as RACTabs,
   TabList,
   TabPanel,
   TabsProps
} from 'react-aria-components'
import cn from 'classnames'

import { SmallAndMedium } from '../../../types'

import Tab from './Tab'
import { tabsListStyles } from './Styles'

export interface TabItem {
   id: string
   name: string
   children: (itemId: string) => React.ReactElement | null
   leftEnhancer?: React.ReactElement | string
   rightEnhancer?: (isSelectedTab: boolean) => React.ReactElement
}

interface Props extends TabsProps {
   items: TabItem[]

   size?: SmallAndMedium
   tabsClassName?: string
   tabsListContainerClassName?: string
   tabsListClassName?: string
   tabContainerClassName?: string
   selectedTabClassName?: string
   tabClassName?: string
   tabPanelClassName?: string
   customTabItem?: (tabItem: TabItem) => React.ReactElement
   onRightClickTab?: (key: string, tabRef: React.RefObject<HTMLElement>) => void
   tabsListRightEnhancer?: () => React.ReactElement
   renderTabChildrenWrapper?: (
      tabChildren: React.ReactElement,
      tabItem: TabItem
   ) => React.ReactElement
   shouldShowHoverStyles?: boolean
}

const Tabs = (props: Props): React.ReactElement => {
   const {
      tabsClassName,
      tabClassName,
      tabContainerClassName,
      tabsListClassName,
      size = 'Small',
      items,
      customTabItem,
      children,
      onRightClickTab,
      tabsListRightEnhancer,
      tabPanelClassName,
      renderTabChildrenWrapper,
      shouldShowHoverStyles,
      selectedTabClassName,
      tabsListContainerClassName,
      ...otherProps
   } = props

   return (
      <RACTabs {...otherProps} className={tabsClassName}>
         {/* //TODO: need to handle vertical tabs cases */}
         <div className={cn(`flex items-start`, tabsListContainerClassName)}>
            <TabList
               className={cn(tabsListStyles, tabsListClassName)}
               items={items}
            >
               {tabItem => (
                  <Tab
                     key={tabItem.id}
                     tabItem={tabItem}
                     size={size}
                     tabClassName={tabClassName}
                     onRightClickTab={onRightClickTab}
                     customTabItem={customTabItem}
                     renderTabChildrenWrapper={renderTabChildrenWrapper}
                     shouldShowHoverStyles={shouldShowHoverStyles}
                     tabContainerClassName={tabContainerClassName}
                     selectedTabClassName={selectedTabClassName}
                  />
               )}
            </TabList>
            {tabsListRightEnhancer?.()}
         </div>

         <Collection items={items}>
            {item => (
               <TabPanel
                  key={item.id}
                  id={item.id}
                  className={tabPanelClassName}
               >
                  {item.children(item.id)}
               </TabPanel>
            )}
         </Collection>
      </RACTabs>
   )
}

export default observer(Tabs)
