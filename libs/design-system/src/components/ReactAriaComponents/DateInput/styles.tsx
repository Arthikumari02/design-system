export const getSegmentStylesCell = (isDisabled: boolean, sizes: any) =>
   `
   ${isDisabled ? 'text-quarterary-300' : 'text-primary-900'}
   ${sizes.textSize}
   `

export const segmentCommonClassNames = `
   border-0
   bg-transparent caret-transparent
   tabular-nums 
   text-right box-content whitespace-nowrap
   outline-none
   focus:bg-utility-gray-200
   `
