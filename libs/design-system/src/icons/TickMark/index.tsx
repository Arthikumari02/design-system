import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

interface TickMarkProps extends CommonIconPropsType {
   onClick?: () => void
}

const TickMark = ({
   className,
   width = 24,
   height = 24,
   onClick,
   ...props
}: TickMarkProps): ReactElement => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
   >
      <path
         fillRule='evenodd'
         d='M9.863 18a1 1 0 01-.729-.315l-4.863-5.179a1 1 0 111.457-1.369l4.125 4.391 8.408-9.202a1 1 0 011.477 1.348l-9.137 10a.997.997 0 01-.73.326h-.008z'
         clipRule='evenodd'
      />
   </svg>
)

export { TickMark }
