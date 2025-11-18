import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const ChevronRightIcon = ({
   className,
   width = 20,
   height = 20,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      className={className}
      {...props}
   >
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
         d='M9 18l6-6-6-6'
      ></path>
   </svg>
)

export { ChevronRightIcon }
