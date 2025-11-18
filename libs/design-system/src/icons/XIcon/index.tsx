import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const XIcon = ({
   className,
   width = 20,
   height = 20,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className={className}
      {...props}
   >
      <path
         d='M15 5 5 15M5 5l10 10'
         strokeWidth={1.667}
         strokeLinecap='round'
         strokeLinejoin='round'
      />
   </svg>
)

export { XIcon }
