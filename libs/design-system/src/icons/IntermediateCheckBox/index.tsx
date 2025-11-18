import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const IntermediateCheckBox = ({
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
      <path d='M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z' />
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={1.667}
         d='M4.5 8h7'
      />
   </svg>
)
export default IntermediateCheckBox
