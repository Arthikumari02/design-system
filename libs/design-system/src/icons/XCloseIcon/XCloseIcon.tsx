import React from 'react'

import { IconPropsType } from '../types'

const XCloseIcon = ({
   className,
   height = 24,
   width = 24,
   strokeWidth = 2,
   ...props
}: IconPropsType): React.ReactElement => (
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
         strokeWidth={strokeWidth}
         d='M18 6L6 18M6 6l12 12'
      ></path>
   </svg>
)

export { XCloseIcon }
