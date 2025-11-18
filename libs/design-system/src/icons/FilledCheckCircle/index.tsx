import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const FilledCheckCircle = ({
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
      <rect width={16} height={16} rx={8} />
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={1.667}
         d='M11.333 5.5 6.75 10.083 4.667 8'
      />
   </svg>
)
export default FilledCheckCircle
