import * as React from 'react'

interface IconProps {
   width?: number
   height?: number
   className?: string
}

const PlayUpArrowIcon = ({ className, ...props }: IconProps) => (
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
         d='m.934 5.331.008-.012 2.344-3.516c.068-.102.13-.196.19-.268a.69.69 0 0 1 .269-.217.667.667 0 0 1 .51 0 .69.69 0 0 1 .27.217c.058.072.12.166.189.268l2.352 3.528c.083.125.157.236.209.331.051.095.11.226.1.378a.667.667 0 0 1-.262.492.704.704 0 0 1-.37.125c-.108.01-.242.01-.392.01H1.65c-.15 0-.284 0-.392-.01a.704.704 0 0 1-.37-.125.667.667 0 0 1-.263-.492.704.704 0 0 1 .101-.378c.052-.095.126-.206.21-.33Z'
      />
   </svg>
)

export { PlayUpArrowIcon }
