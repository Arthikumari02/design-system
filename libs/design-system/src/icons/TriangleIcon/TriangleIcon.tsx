import * as React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
   width?: number
   height?: number
}
const TriangleIcon = ({ width = 8, height = 6, ...props }: Props) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 8 6'
      {...props}
   >
      <path fill='#EAECF0' d='M4 6 .536 0h6.928L4 6Z' />
   </svg>
)
export default TriangleIcon
