import * as React from 'react'
import type { CommonIconPropsType } from '../types'

const ButtonRightArrowIcon = ({
   width = 14,
   height = 12,
   className,
   ...props
}: CommonIconPropsType) => (
   <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 14 12'
      className={className}
      {...props}
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M7.234.634a.8.8 0 0 1 1.132 0l4.8 4.8a.8.8 0 0 1 0 1.132l-4.8 4.8a.8.8 0 0 1-1.132-1.132L10.67 6.8H1.4a.8.8 0 1 1 0-1.6h9.269L7.234 1.766a.8.8 0 0 1 0-1.132Z'
      />
   </svg>
)

export { ButtonRightArrowIcon }
