import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Toggle as ToggleSwitch } from 'react-toggle-component'

import { SPACE_BAR_KEY_CODE } from '../../constants/KeyboardConstants'

import { TOGGLE_THEME } from '../../Theme/components/ToggleTheme'
import { SmallAndMedium } from '../../types'

import { FocusRing } from '../FocusRing'

import './index.css'
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

   const toggleClassName = cn(
      '!m-0',
      disabled ? 'toggle-switch-cursor-not-allowed-styles' : ''
   )

   useEffect(() => {
      setIsChecked(checked)
   }, [checked])

   const handleChange = (e: React.ChangeEvent<Element>) => {
      //TODO: Getting ts error so kept ts-ignore, need to discuss and update
      //@ts-ignore
      setIsChecked(e.target.checked)
      //@ts-ignore
      onChange(e.target.checked)
   }

   const onKeyDown = (event: any) => {
      if (toggleOnSpaceKeyPress && event.keyCode === SPACE_BAR_KEY_CODE) {
         setIsChecked(!isChecked)
         onChange(!isChecked)
      }
   }

   return (
      <FocusRing variant={focusRingVariant} focusClass={'rounded-[256px]'}>
         <div
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(containerClassName, 'toggle-container')}
            style={{ ['--thumb-width' as any]: thumbStyles.width }}
         >
            <ToggleSwitch
               leftBackgroundColor={leftBackgroundColor}
               rightBackgroundColor={rightBackgroundColor}
               borderWidth={'0px'}
               knobColor={knobColor}
               onToggle={handleChange}
               checked={isChecked}
               controlled={true}
               disabled={disabled}
               width={trackStyles.width}
               height={trackStyles.height}
               knobWidth={thumbStyles.width}
               knobHeight={thumbStyles.height}
               className={toggleClassName}
               name={name}
            />
         </div>
      </FocusRing>
   )
}

export default observer(Toggle)
