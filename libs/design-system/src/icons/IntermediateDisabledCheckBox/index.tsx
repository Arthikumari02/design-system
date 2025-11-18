import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const IntermediateDisabledCheckBoxIcon = ({
   className,
   width,
   height,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={'0 0 16 16'}
      className={className}
      {...props}
      fill='none'
   >
      <path d='M.5 4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4Z' />
      <path d='M.5 4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4Z' />
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='M4.5 8h7'
      />
   </svg>
)
export default IntermediateDisabledCheckBoxIcon
