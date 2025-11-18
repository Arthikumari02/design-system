import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const SolidCheckboxDisabledSelectedIcon = ({
   className,
   width,
   height,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={'0 0 16 16'}
      className={className}
      {...props}
   >
      <path d='M.5 4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4Z' />
      <path d='M.5 4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4Z' />
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='m12 5-5.5 5.5L4 8'
      />
   </svg>
)

export default SolidCheckboxDisabledSelectedIcon
