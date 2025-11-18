import React from 'react'

interface IconProps {
   width?: number
   height?: number
   className?: string
}

function ChevronLeftArrowIcon({ className, ...props }: IconProps) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='20'
         height='20'
         viewBox='0 0 20 20'
         fill='none'
         className={className}
         {...props}
      >
         <path
            d='M12.5 15L7.5 10L12.5 5'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
         />
      </svg>
   )
}

export { ChevronLeftArrowIcon }
