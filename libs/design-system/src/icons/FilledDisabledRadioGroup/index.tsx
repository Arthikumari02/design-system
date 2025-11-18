import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const FilledDisabledRadioGroup = ({
   className,
   width,
   height,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 16 16'
      className={className}
      {...props}
   >
      <path d='M.5 8a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z' />
      <path d='M.5 8a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z' />
      <path d='M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z' />
   </svg>
)
export default FilledDisabledRadioGroup
