import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

function Polygon2Icon({
   className,
   width = 12,
   height = 8,
   ...props
}: CommonIconPropsType): ReactElement {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 12 8'
         className={className}
         {...props}
      >
         <path d='M6 0l6 8H0l6-8z'></path>
      </svg>
   )
}

export default Polygon2Icon
