import { ReactElement } from 'react'

import { CommonIconPropsType } from '../types'

const FeaturedCheckCircleIcon = ({
   className,
   width = 36,
   height = 36,
   ...props
}: CommonIconPropsType): ReactElement => (
   <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={'0 0 36 36'}
      className={className}
      {...props}
   >
      <g opacity='0.3'>
         <path
            d='M5.49996 18C5.49996 11.0964 11.0964 5.49996 18 5.49996C24.9035 5.49996 30.5 11.0964 30.5 18C30.5 24.9035 24.9035 30.5 18 30.5C11.0964 30.5 5.49996 24.9035 5.49996 18Z'
            strokeWidth='1.66667'
         />
      </g>
      <g opacity='0.1'>
         <path
            d='M1.33333 17.1667C1.33333 8.42216 8.42216 1.33333 17.1667 1.33333H18.8333C27.5778 1.33333 34.6667 8.42216 34.6667 17.1667V18.8333C34.6667 27.5778 27.5778 34.6667 18.8333 34.6667H17.1667C8.42216 34.6667 1.33333 27.5778 1.33333 18.8333V17.1667Z'
            strokeWidth='1.66667'
         />
      </g>
      <g clipPath='url(#clip0_161_3931)'>
         <path
            d='M18 14.6666V18M18 21.3333H18.0083M26.3333 18C26.3333 22.6023 22.6023 26.3333 18 26.3333C13.3976 26.3333 9.66663 22.6023 9.66663 18C9.66663 13.3976 13.3976 9.66663 18 9.66663C22.6023 9.66663 26.3333 13.3976 26.3333 18Z'
            strokeWidth='1.66667'
            strokeLinecap='round'
            strokeLinejoin='round'
         />
      </g>
      <defs>
         <clipPath id='clip0_161_3931'>
            <rect width='20' height='20' transform='translate(8 8)' />
         </clipPath>
      </defs>
   </svg>
)

export default FeaturedCheckCircleIcon
