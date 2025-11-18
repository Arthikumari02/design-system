import { observer } from 'mobx-react'
import cn from 'classnames'

import { MenuOptionType } from './types'

import * as Styles from './styles'
import { RefObject } from 'react'

interface Props {
   menuOption: MenuOptionType
   optionTextClassName?: string
   optionContainerClassName?: string
   onClickAction?: (menuOption: MenuOptionType, event: React.MouseEvent) => void
   onHoverAction?: (id: string, isHovered: boolean) => void
   shouldStopPropagation?: boolean
   optionRef?: RefObject<HTMLDivElement>
}

const ActionMenuOption = (props: Props): React.ReactElement => {
   const {
      menuOption,
      optionTextClassName,
      optionContainerClassName,
      onClickAction,
      onHoverAction,
      shouldStopPropagation = false
   } = props

   const { value, renderLeftIcon, renderRightIcon, label } = menuOption

   const onClickOption = (event: React.MouseEvent): void => {
      onClickAction?.(menuOption, event)
      if (shouldStopPropagation) event.stopPropagation()
   }

   const onMouseLeave = (): void => {
      onHoverAction?.(value, false)
   }

   const onMouseEnter = (): void => {
      onHoverAction?.(value, true)
   }

   const renderOptionText = (): React.ReactElement => (
      <p
         className={cn(
            Styles.getOptionTextStyles(menuOption),
            optionTextClassName
         )}
      >
         {label}
      </p>
   )

   return (
      <div
         className={Styles.getOptionWrapperStyles(menuOption)}
         key={value}
         ref={props.optionRef}
      >
         <div
            className={cn(
               Styles.getOptionContainerStyles(menuOption),
               optionContainerClassName
            )}
            onClick={onClickOption}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
         >
            {renderLeftIcon ? (
               <div className={Styles.IconWrapperStyles}>
                  {renderLeftIcon()}
               </div>
            ) : null}
            {renderOptionText()}
            {renderRightIcon ? (
               <div className={Styles.RightIconWrapperStyles}>
                  {renderRightIcon()}
               </div>
            ) : null}
         </div>
      </div>
   )
}

export default observer(ActionMenuOption)
