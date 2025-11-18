import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const ChevronDownIcon = ({
   className,
   width = 20,
   height = 20,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
   >
      <path
         d='m5 7.5 5 5 5-5'
         strokeWidth={1.667}
         strokeLinecap='round'
         strokeLinejoin='round'
      />
   </svg>
)

export { ChevronDownIcon }
