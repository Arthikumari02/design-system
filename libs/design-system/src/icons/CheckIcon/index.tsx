import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const CheckIcon = ({
   className,
   height = 20,
   width = 20,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 20 20'
      className={className}
      {...props}
   >
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={1.667}
         d='M16.667 5 7.5 14.167 3.333 10'
      />
   </svg>
)

export default CheckIcon
