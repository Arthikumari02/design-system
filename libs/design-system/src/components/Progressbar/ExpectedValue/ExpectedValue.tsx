import { observer } from 'mobx-react'

import Polygon2Icon from '../../../icons/Polygon2Icon'

import { getExpectedValueSize } from '../sizes'
import { ProgressbarSize, ProgressbarVariant } from '../types'

interface Props {
   expectedValue: number
   expectedValueTitle?: string
   variant: ProgressbarVariant
   size: ProgressbarSize
   customExpectedIconSize?: { width: number; height: number }
}

const ExpectedValue = (props: Props) => {
   const {
      expectedValue,
      variant,
      size,
      customExpectedIconSize,
      expectedValueTitle = `${expectedValue}%`
   } = props

   const {
      expectedValueContainerStyles,
      expectedValueIconHeight,
      expectedValueIconWidth
   } = getExpectedValueSize(variant, size)

   const iconWidth = customExpectedIconSize
      ? customExpectedIconSize.width
      : expectedValueIconWidth
   const iconHeight = customExpectedIconSize
      ? customExpectedIconSize.height
      : expectedValueIconHeight

   return (
      <div className={`absolute w-full ${expectedValueContainerStyles}`}>
         <div title={expectedValueTitle}>
            <Polygon2Icon
               width={iconWidth}
               height={iconHeight}
               className={`absolute fill-fg-senary-300`}
               style={{
                  left: `${expectedValue}%`,
                  transform: `translateX(-${iconWidth / 2}px)`
               }}
            />
         </div>
      </div>
   )
}

export default observer(ExpectedValue)
