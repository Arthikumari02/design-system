import classNames from 'classnames'
import { observer } from 'mobx-react'
import { cloneElement, useRef } from 'react'
import { Tab as RACTab, TabRenderProps } from 'react-aria-components'

import { SmallAndMedium } from '../../../types'

import { getTabStyles, iconClassName } from './Styles'
import { TabItem } from './Tabs'
import { tabsSizes } from './sizes'

interface Props {
   tabItem: TabItem
   size: SmallAndMedium
   tabClassName?: string
   tabContainerClassName?: string
   selectedTabClassName?: string
   onRightClickTab?: (key: string, tabRef: React.RefObject<HTMLElement>) => void
   customTabItem?: (tabItem: TabItem) => React.ReactElement
   renderTabChildrenWrapper?: (
      tabChildren: React.ReactElement,
      tabItem: TabItem
   ) => React.ReactElement
   shouldShowHoverStyles?: boolean
}

const Tab = (props: Props) => {
   const {
      tabItem,
      size,
      tabClassName,
      onRightClickTab,
      customTabItem,
      renderTabChildrenWrapper,
      shouldShowHoverStyles = true,
      tabContainerClassName = '',
      selectedTabClassName = ''
   } = props

   const tabRef = useRef(null)

   const tabSize = tabsSizes[size]

   const renderIcon = (isSelectedTab: boolean): React.ReactElement => {
      if (!tabItem.leftEnhancer) return <></>

      if (typeof tabItem.leftEnhancer === 'string')
         return (
            <img
               className={iconClassName}
               src={tabItem.leftEnhancer}
               alt={'icon'}
            />
         )

      const TabIcon = tabItem.leftEnhancer
      return (
         <span className={iconClassName}>
            {cloneElement(TabIcon, {
               className: isSelectedTab
                  ? 'fill-fg-brand-primary-600'
                  : 'fill-fg-quarterary-500'
            })}
         </span>
      )
   }

   const renderTabChildren = (args: TabRenderProps): React.ReactElement => {
      const { isSelected, isHovered, isFocused, isDisabled } = args

      return (
         <div
            className={classNames(
               'border-b-2 border-transparent flex flex-row items-center gap-x-md',
               {
                  [`!border-fg-brand-primary_alt ${selectedTabClassName}`]:
                     isSelected
               },
               {
                  '!border-fg-brand-primary_alt':
                     isHovered && shouldShowHoverStyles
               },
               getTabStyles(
                  tabSize,
                  isSelected,
                  isHovered,
                  isDisabled,
                  shouldShowHoverStyles
               ),
               tabClassName
            )}
            onContextMenu={event => {
               event.preventDefault()
               onRightClickTab?.(tabItem.id, tabRef)
            }}
         >
            {customTabItem ? (
               customTabItem(tabItem)
            ) : (
               <>
                  {renderIcon(
                     shouldShowHoverStyles
                        ? isHovered || isSelected
                        : isSelected
                  )}
                  <span>{tabItem.name}</span>
                  {tabItem.rightEnhancer
                     ? tabItem.rightEnhancer(
                          shouldShowHoverStyles
                             ? isHovered || isSelected
                             : isSelected
                       )
                     : null}
               </>
            )}
         </div>
      )
   }

   return (
      <RACTab
         key={tabItem.id}
         id={tabItem.id}
         className={classNames('outline-none', tabContainerClassName)}
         ref={tabRef}
      >
         {renderTabChildrenWrapper
            ? (props: TabRenderProps) =>
                 renderTabChildrenWrapper(renderTabChildren(props), tabItem)
            : renderTabChildren}
      </RACTab>
   )
}

export default observer(Tab)
