import React from 'react'
import { CommonIconPropsType } from '../types'

const CheckboxUnSelectedIcon = ({
   width = 16,
   height = 16,
   className,
   ...props
}: CommonIconPropsType) => (
   <svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
   >
      <rect x={0.5} y={0.5} width={15} height={15} rx={3.5} />
      <rect x={0.5} y={0.5} width={15} height={15} rx={3.5} />
   </svg>
)

export { CheckboxUnSelectedIcon }
