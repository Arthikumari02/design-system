import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const SolidCheckboxSelectedIcon = ({
   className,
   width,
   height,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={'0 0 16 16'}
      fill='none'
      className={className}
      {...props}
   >
      <path d='M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z' />
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={1.667}
         d='m12 5-5.5 5.5L4 8'
      />
   </svg>
)

export default SolidCheckboxSelectedIcon
