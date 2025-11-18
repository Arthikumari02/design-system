import cn from 'classnames'
import { observer } from 'mobx-react'

import CheckIcon from '../../icons/CheckIcon'
import { getMenuOptionSizeStyles } from './sizes'
import * as Styles from './styles'
import {
   ButtonGroupVariant,
   ExtendedSize,
   MenuOptionThemeStyles,
   MenuOptionType
} from './types'

interface Props {
   size: ExtendedSize
   variant: ButtonGroupVariant
   isSelected?: boolean
   optionTextClassName?: string
   optionContainerClassName?: string
   menuOption: MenuOptionType
   shouldStopPropagation?: boolean
   onClickOption?: (menuOption: MenuOptionType) => void
}

const MenuOption = (props: Props): React.ReactElement => {
   const {
      menuOption,
      optionTextClassName,
      optionContainerClassName,
      onClickOption,
      isSelected,
      size,
      variant,
      shouldStopPropagation
   } = props

   const { value, label } = menuOption
   const sizedTheme = getMenuOptionSizeStyles(variant, size)

   const { bgColor, textColor }: MenuOptionThemeStyles =
      Styles.getMenuOptionThemeStyles(variant)

   const onClickOptionInPopOver = (event: any): void => {
      onClickOption?.(menuOption)
      if (shouldStopPropagation) {
         event.stopPropagation()
      }
   }

   const renderOptionText = (): React.ReactElement => (
      <p
         className={cn(Styles.optionTextStyles, textColor, optionTextClassName)}
         title={label}
      >
         {label}
      </p>
   )

   const renderCheckIcon = (): React.ReactElement | null =>
      isSelected ? (
         <div className={Styles.CheckIconStyles}>
            <CheckIcon className='stroke-fg-brand-primary-600' />
         </div>
      ) : null

   const leftIcon = (): React.ReactElement | null =>
      menuOption.icon ? (
         <div className={cn(Styles.IconWrapperStyles)}>
            {menuOption.icon({
               width: 20,
               height: 20
            })}
         </div>
      ) : null

   return (
      <div
         className={cn('w-full px-sm', {
            'border-t border-primary': menuOption.showShowSeparator
         })}
      >
         <div
            key={value}
            className={cn(
               Styles.optionContainerStyles,
               optionContainerClassName,
               bgColor,
               sizedTheme.typography,
               sizedTheme.padding,
               sizedTheme.borderRadius
            )}
            onClick={onClickOptionInPopOver}
         >
            {leftIcon()}
            {renderOptionText()}
            {renderCheckIcon()}
         </div>
      </div>
   )
}

export default observer(MenuOption)
