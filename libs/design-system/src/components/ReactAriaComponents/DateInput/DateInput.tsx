import { observer } from 'mobx-react'
import {
   DateFieldProps as AriaDateFieldProps,
   DateInput as AriaDateInput,
   DateInputProps,
   DateSegment,
   DateValue,
   ValidationResult
} from 'react-aria-components'
import cn from 'classnames'

import { BasicSize } from '../../../types'

import { dateSegmentSizes } from './sizes'
import { getSegmentStylesCell, segmentCommonClassNames } from './styles'

export interface DateFieldProps<T extends DateValue>
   extends AriaDateFieldProps<T> {
   label?: string
   description?: string
   errorMessage?: string | ((validation: ValidationResult) => string)
}

interface Props extends Omit<DateInputProps, 'children'> {
   size: BasicSize
}

const DateInput = (props: Props) => {
   const { size, ...other } = props
   const sizeClassNames = dateSegmentSizes[size]
   const commonClassNames = `${segmentCommonClassNames} ${sizeClassNames.padding} ${sizeClassNames.borderRadius}`

   const placeholderClassNames = `${sizeClassNames.placeholderTextSize} !text-placeholder`

   return (
      <AriaDateInput {...other} className={`${props.className} flex`}>
         {segment => (
            <DateSegment
               segment={
                  segment.type === 'dayPeriod'
                     ? { ...segment, text: segment.text.toUpperCase() }
                     : segment
               }
               className={({ isPlaceholder, isDisabled, type }) =>
                  cn(
                     commonClassNames,
                     {
                        [placeholderClassNames]: isPlaceholder
                     },
                     {
                        [getSegmentStylesCell(isDisabled, sizeClassNames)]:
                           !isPlaceholder
                     },
                     { '!px-0': type === 'literal' }
                  )
               }
            />
         )}
      </AriaDateInput>
   )
}

export default observer(DateInput)
