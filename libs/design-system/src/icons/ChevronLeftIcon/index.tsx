import * as React from 'react'

import { CommonIconPropsType } from '../types'

const ChevronLeftIcon = (props: CommonIconPropsType) => {
   const { className, ...rest } = props

   return (
      <svg
         width={20}
         height={20}
         xmlns='http://www.w3.org/2000/svg'
         viewBox={'0 0 20 20'}
         fill='none'
         className={className}
         {...rest}
      >
         <path
            d='m12.5 15-5-5 5-5'
            strokeWidth={1.667}
            strokeLinecap='round'
            strokeLinejoin='round'
         />
      </svg>
   )
}

export { ChevronLeftIcon }
