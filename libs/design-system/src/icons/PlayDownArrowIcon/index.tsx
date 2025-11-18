import * as React from 'react'

interface IconProps {
   width?: number
   height?: number
   className?: string
}

const PlayDownArrowIcon = ({ className, ...props }: IconProps) => (
   <svg
      width={8}
      height={8}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 8 8'
      className={className}
      {...props}
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='m7.066 2.669-.008.012-2.344 3.516c-.068.102-.13.196-.19.268a.69.69 0 0 1-.269.217.667.667 0 0 1-.51 0 .69.69 0 0 1-.27-.217 3.895 3.895 0 0 1-.189-.268L.934 2.669a4.655 4.655 0 0 1-.209-.331.704.704 0 0 1-.1-.378.667.667 0 0 1 .262-.492.704.704 0 0 1 .37-.125c.108-.01.242-.01.392-.01H6.35c.15 0 .284 0 .392.01.107.01.248.033.37.125a.667.667 0 0 1 .263.492.704.704 0 0 1-.101.378c-.052.095-.126.206-.21.33Z'
      />
   </svg>
)

export { PlayDownArrowIcon }
