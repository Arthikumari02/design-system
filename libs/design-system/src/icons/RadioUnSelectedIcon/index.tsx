import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const RadioUnSelectedIcon = ({
   className,
   width = 16,
   height = 16,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      viewBox={'0 0 16 16'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
   >
      <rect x={0.5} y={0.5} width={15} height={15} rx={7.5} />
      <rect x={0.5} y={0.5} width={15} height={15} rx={7.5} />
   </svg>
)

export { RadioUnSelectedIcon }
