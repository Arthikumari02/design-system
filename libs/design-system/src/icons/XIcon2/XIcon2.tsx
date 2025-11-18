import { CommonIconPropsType } from '../types'

const XIcon2 = ({
   className,
   width = 20,
   height = 20,
   ...props
}: CommonIconPropsType) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 20 20'
      className={className}
      {...props}
   >
      <g>
         <path d='M14.756 6.423a.833.833 0 10-1.179-1.179L10 8.821 6.423 5.244a.833.833 0 10-1.179 1.179L8.821 10l-3.577 3.577a.833.833 0 101.179 1.179L10 11.178l3.577 3.578a.833.833 0 101.179-1.179L11.178 10l3.578-3.577z'></path>
      </g>
   </svg>
)

export default XIcon2
