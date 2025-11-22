import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const SearchIcon = ({
   className,
   width = 18,
   height = 18,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
   >
      <path
         d='m15.75 15.75-2.625-2.625M15 8.625a6.375 6.375 0 1 1-12.75 0 6.375 6.375 0 0 1 12.75 0Z'
         strokeWidth={1.667}
         strokeLinecap='round'
         strokeLinejoin='round'
      />
   </svg>
)

export { SearchIcon }
