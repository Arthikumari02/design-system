import cn from 'classnames'
import React, { ReactElement } from 'react'

import MenuOption from '../MenuOption'
import * as Styles from '../styles'
import { ButtonGroupVariant, ExtendedSize, MenuOptionType } from '../types'

interface OptionsListProps {
   options: MenuOptionType[]
   selectedOption?: MenuOptionType
   size: ExtendedSize
   variant: ButtonGroupVariant
   optionTextClassName?: string
   optionContainerClassName?: string
   optionsListContainerClassName?: string
   shouldStopPropagation?: boolean
   onClickOption: (option: MenuOptionType) => void
   renderCustomOption?: (optionProps: MenuOptionType) => ReactElement
}

export const OptionsList: React.FC<OptionsListProps> = ({
   options,
   selectedOption,
   size,
   variant,
   optionTextClassName,
   optionContainerClassName,
   optionsListContainerClassName,
   shouldStopPropagation,
   onClickOption,
   renderCustomOption
}) => {
   const renderMenuOption = (option: MenuOptionType): ReactElement => (
      <MenuOption
         key={option.id}
         size={size}
         menuOption={option}
         optionTextClassName={optionTextClassName}
         optionContainerClassName={optionContainerClassName}
         onClickOption={onClickOption}
         isSelected={option.id === selectedOption?.id}
         variant={variant}
         shouldStopPropagation={shouldStopPropagation}
      />
   )

   return (
      <div
         className={cn(Styles.optionsListStyles, optionsListContainerClassName)}
         onPointerDown={e => {
            if (shouldStopPropagation) {
               e.preventDefault?.()
            }
         }}
      >
         {options.map(renderCustomOption ?? renderMenuOption)}
      </div>
   )
}
