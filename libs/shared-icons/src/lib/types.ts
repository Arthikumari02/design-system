export interface CommonIconPropsType {
   className?: string
   height?: number
   style?: React.CSSProperties | undefined
   width?: number
}

export interface IconPropsType extends CommonIconPropsType {
   fill?: string
   secondFill?: string
   stroke?: string
   strokeWidth?: number
   style?: React.CSSProperties | undefined
   x?: number
   y?: number
   opacity?: number
   version?: string
}
