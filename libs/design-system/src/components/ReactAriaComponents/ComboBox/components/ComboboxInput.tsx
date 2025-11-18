import cn from 'classnames'
import { observer } from 'mobx-react'
import { ReactNode, RefObject } from 'react'
import { Button, Input } from 'react-aria-components'

import { Icon } from '@shared/icons'

import { ChevronDownIcon } from '../../../../icons/ChevronDownIcon'
import { SearchIcon } from '../../../../icons/SearchIcon'
import { FocusRingVariant, SmallAndMedium } from '../../../../types'

import {
   getComboboxTextInputContainerStylesBasedOnSize,
   getTextInputStylesBasedOnSize
} from '../styles'

import { withFocusRing } from '../../WithFocusRing/WithFocusRing'

import * as styles from '../styles'

interface Props {
   size: SmallAndMedium
   isInvalid?: boolean
   isDisabled?: boolean
   focusRingVariant?: FocusRingVariant
   placeholder?: string
   showClearIcon: boolean
   onClearIconClick: () => void
   renderRightIcon?: () => ReactNode
   renderLeftIcon?: () => ReactNode
   isOpen?: boolean
   iconSize: number
   inputGroupRef: RefObject<HTMLDivElement>
   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
   isError: boolean
   isFocused: boolean
   within: boolean
   isTextInput: boolean
   leftIconContainerClassName?: string
   inputClassName?: string
}

const ComboboxInputWithFocusRing = withFocusRing((props: any) => {
   const {
      size,
      isInvalid,
      isDisabled,
      placeholder,
      showClearIcon,
      onClearIconClick,
      renderRightIcon,
      renderLeftIcon,
      isOpen,
      iconSize,
      inputGroupRef,
      onKeyDown,
      className,
      leftIconContainerClassName = '',
      inputClassName = ''
   } = props

   const inputStyles = getTextInputStylesBasedOnSize(size, isDisabled)

   const onClickClearButton = (): void => {
      if (!isDisabled) {
         onClearIconClick()
      }
   }

   return (
      <div
         ref={inputGroupRef}
         className={cn(
            getComboboxTextInputContainerStylesBasedOnSize(size),
            {
               [styles.disabledInputGroupContainerStyles]: isDisabled,
               [styles.validInputGroupContainerStyles]: !isInvalid,
               [styles.invalidInputGroupContainerStyles]: isInvalid
            },
            styles.inputGroupContainerStyles,
            className
         )}
      >
         <Button
            className={cn(
               'pr-md outline-none focus:outline-none active:outline-none',
               leftIconContainerClassName
            )}
         >
            {renderLeftIcon?.() || (
               <SearchIcon
                  height={iconSize}
                  width={iconSize}
                  className='stroke-fg-quarterary-500'
               />
            )}
         </Button>
         <Input
            className={cn(inputStyles, inputClassName)}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
         />
         {showClearIcon ? (
            <Button
               onPress={onClickClearButton}
               slot={null}
               className={cn(
                  'outline-none focus:outline-none active:outline-none',
                  {
                     ['cursor-not-allowed']: isDisabled
                  }
               )}
            >
               <Icon
                  type='OUTLINE'
                  id='x'
                  className='fill-fg-quinary-400'
                  width={iconSize}
                  height={iconSize}
               />
            </Button>
         ) : null}
         <Button>
            {renderRightIcon?.() || (
               <div
                  style={{
                     transform: isOpen ? 'rotate(180deg)' : '',
                     transition: 'transform 0.5s'
                  }}
               >
                  <ChevronDownIcon
                     className='stroke-fg-quarterary-500'
                     height={iconSize}
                     width={iconSize}
                  />
               </div>
            )}
         </Button>
      </div>
   )
})

const ComboboxInput = (props: Props) => (
   <ComboboxInputWithFocusRing {...props} variant={props.focusRingVariant} />
)

export default observer(ComboboxInput)
