import React from 'react'
import cn from 'classnames'

interface Props {
   width?: number
   height?: number
   onClick?: () => void
   className?: string
   svgClassName?: string
   [x: string]: any
}

const CloseIcon = ({
   width = 12,
   height = 12,
   className,
   svgClassName,
   ...props
}: Props) => (
   <div className={cn(className, 'cursor-pointer')} {...props}>
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={width}
         height={height}
         viewBox='0 0 12 12'
         className={svgClassName}
      >
         <g fill='none' fillRule='evenodd' opacity='.8'>
            <path
               fill='currentColor'
               fillRule='nonzero'
               d='M11.25 1.808L10.193.75 6 4.942 1.808.75.75 1.808 4.942 6 .75 10.193l1.058 1.057L6 7.057l4.193 4.193 1.057-1.057L7.057 6z'
            />

            <path d='M-3-3h18v18H-3z' />
         </g>
      </svg>
   </div>
)

export { CloseIcon }
