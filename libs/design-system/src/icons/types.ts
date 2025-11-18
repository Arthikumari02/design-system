export interface CommonIconPropsType {
   className?: string
   height?: number | string
   style?: React.CSSProperties | undefined
   width?: number | string
}

export interface IconPropsType extends CommonIconPropsType {
   style?: React.CSSProperties | undefined
   x?: number
   y?: number
   opacity?: number
   version?: string
   strokeWidth?: number
}
