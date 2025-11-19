import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Switch from 'react-switch'

import { SPACE_BAR_KEY_CODE } from '../../constants/KeyboardConstants'
import { TOGGLE_THEME } from '../../Theme/components/ToggleTheme'
import { SmallAndMedium } from '../../types'
import { FocusRing } from '../FocusRing'
import { toggleSizes } from './sizes'

export interface ToggleProps {
   onChange: (value: boolean) => void
   checked: boolean
   disabled?: boolean
   name: string
   size?: SmallAndMedium
   containerClassName?: string
   toggleOnSpaceKeyPress?: boolean
}

const Toggle = (props: ToggleProps) => {
   const {
      onChange,
      name,
      checked,
      disabled,
      size = 'Small',
      containerClassName = '',
      toggleOnSpaceKeyPress = true
   } = props

   const [isChecked, setIsChecked] = useState(checked)

   const toggleColors = isChecked ? TOGGLE_THEME.selected : TOGGLE_THEME.default
   const themeBasedOnState = disabled
      ? toggleColors.disabled
      : toggleColors.default

   const leftBackgroundColor = themeBasedOnState.bgColor
   const rightBackgroundColor = themeBasedOnState.bgColor
   const knobColor = themeBasedOnState.thumbColor

   const { trackStyles, thumbStyles } = toggleSizes[size]

   const focusRingVariant = disabled
      ? 'None'
      : isChecked
         ? 'Primary'
         : 'GraySecondary'

   const switchStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   }

   useEffect(() => {
      setIsChecked(checked)
   }, [checked])

   const handleChange = (checked: boolean) => {
      setIsChecked(checked)
      onChange(checked)
   }

   const onKeyDown = (event: any) => {
      if (toggleOnSpaceKeyPress && event.keyCode === SPACE_BAR_KEY_CODE) {
         setIsChecked(!isChecked)
         onChange(!isChecked)
      }
   }

   return (
      <FocusRing variant={focusRingVariant} focusClass={'rounded-full'}>
         <div
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(containerClassName, 'toggle-container')}
         >
            <Switch
               onChange={handleChange}
               checked={isChecked}
               disabled={disabled}
               onColor={leftBackgroundColor}
               offColor={rightBackgroundColor}
               handleDiameter={parseInt(thumbStyles.height)}
               height={parseInt(trackStyles.height)}
               width={parseInt(trackStyles.width)}
               className="react-switch"
               activeBoxShadow="0 0 2px 3px #3bf"
               uncheckedIcon={false}
               checkedIcon={false}
               boxShadow="0px 1px 2px rgba(0, 0, 0, 0.1)"
            />
         </div>
      </FocusRing>
   )
}

export default observer(Toggle)
