import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { Group, GroupProps } from 'react-aria-components'
import { BasicSize } from '../../../types'
import { sizes } from './sizes'
import { getFocusRingClass, getPickerButtonClass } from './styles'

interface Props extends GroupProps {
   size: BasicSize
}

const FieldGroup = (props: Props) => {
   const { size, ...other } = props

   const sizeClassNames = sizes[size]
   return (
      <Group
         {...other}
         className={({ isDisabled, isInvalid, isFocusWithin }) =>
            classNames(
               getPickerButtonClass(isInvalid, isDisabled),
               getFocusRingClass(isFocusWithin, isInvalid),
               sizeClassNames,
               props.className
            )
         }
      />
   )
}

export default observer(FieldGroup)
