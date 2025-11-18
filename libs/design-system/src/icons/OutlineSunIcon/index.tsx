import React from 'react'

interface IconProps {
   width?: number
   height?: number
   className?: string
}

function OutlineSunIcon({ className, ...props }: IconProps) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='16'
         viewBox='0 0 16 16'
         fill='none'
         className={className}
         {...props}
      >
         <g clipPath='url(#clip0_3397_10189)'>
            <path
               d='M7.99992 1.33301V2.66634M7.99992 13.333V14.6663M2.66659 7.99967H1.33325M4.20933 4.20909L3.26652 3.26628M11.7905 4.20909L12.7333 3.26628M4.20933 11.793L3.26652 12.7358M11.7905 11.793L12.7333 12.7358M14.6666 7.99967H13.3333M11.3333 7.99967C11.3333 9.84062 9.84087 11.333 7.99992 11.333C6.15897 11.333 4.66659 9.84062 4.66659 7.99967C4.66659 6.15873 6.15897 4.66634 7.99992 4.66634C9.84087 4.66634 11.3333 6.15873 11.3333 7.99967Z'
               strokeWidth='1.5'
               strokeLinecap='round'
               strokeLinejoin='round'
            />
         </g>
         <defs>
            <clipPath id='clip0_3397_10189'>
               <rect width='16' height='16' />
            </clipPath>
         </defs>
      </svg>
   )
}

export { OutlineSunIcon }
