import { CommonIconPropsType } from '../types'

const ArrowRightIcon = ({
   className,
   width = 20,
   height = 20,
   ...props
}: CommonIconPropsType) => (
   <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={'0 0 20 20'}
      className={className}
      {...props}
   >
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={1.667}
         d='M4.167 10h11.666m0 0L10 4.167M15.833 10 10 15.833'
      />
   </svg>
)

export default ArrowRightIcon
