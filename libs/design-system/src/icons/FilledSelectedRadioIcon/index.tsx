import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const FilledSelectedRadioIcon = ({
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
   >
      <path
         fillRule='evenodd'
         d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'
      />
   </svg>
)
export default FilledSelectedRadioIcon
