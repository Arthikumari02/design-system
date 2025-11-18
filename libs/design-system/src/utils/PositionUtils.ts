export const getPercentOfValueFromMinAndMaxValue = (
   value: number,
   min: number,
   max: number
) => {
   const percent = ((value - min) / (max - min)) * 100

   return percent >= 100 ? 100 : percent < 0 ? 0 : percent
}
