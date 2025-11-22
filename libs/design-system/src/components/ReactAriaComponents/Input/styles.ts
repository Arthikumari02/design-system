import { TEXT_INPUT_THEME } from "./constants";
import { sizeStyles } from "./sizes";
import { BasicSize } from "../../../types";
import { FOCUS_RING_THEME } from "../WithFocusRing/constants";

interface UIStates {
   isDisabled: boolean;
   isFocused: boolean;
   error?: string;
   size?: BasicSize;
   variant?: 'default' | 'borderless';
}

export const containerStyles = `
   w-full border rounded-md bg-white transition-all duration-200 relative
`;

export const containerStylesNoBorder = `
   w-full bg-transparent transition-all duration-200 relative border-0 rounded-none
`;

export const rootStyles = "w-full flex flex-col gap-1";

export const labelStyles = "text-sm-medium text-gray-800";

export const hintStyles = "text-gray-500 text-sm-regular mt-1";

export const errorStyles = "text-red-500 text-sm-regular mt-1";

export const groupStyles = "relative w-full";

export const iconLeftStyles = "absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10";
export const iconRightStyles = "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10";

export const getElementTypeStyles = ({
   isDisabled,
   isFocused,
   error,
   size,
   variant = 'default',
}: UIStates) => {
   const commonStyles = `grow truncate shadow-none focus:outline-none`;
   const sizeContext = sizeStyles[size || "Medium"];
   const placeholderTextColor = TEXT_INPUT_THEME.placeholderColor;

   const sizeClass = sizeContext.inputClassName;

   let textColor = TEXT_INPUT_THEME.default.textColor;
   let borderColor = variant === 'borderless' ? '' : TEXT_INPUT_THEME.default.borderColor;
   let focusRing = "";
   let backgroundColor = "";

   if (isDisabled) {
      textColor = TEXT_INPUT_THEME.disabled.textColor;
      borderColor = variant === 'borderless' ? '' : TEXT_INPUT_THEME.disabled.borderColor;
      backgroundColor = "bg-disabled_subtle text-disabled cursor-not-allowed";
   } else if (isFocused) {
      textColor = TEXT_INPUT_THEME.focused.textColor;
      if (variant === 'default') {
         borderColor = FOCUS_RING_THEME.Primary.borderColor;
         focusRing = `${FOCUS_RING_THEME.Primary.ring} ring-2 ring-offset-1 transition-all duration-200`;
      }
   }

   if (error) {
      textColor = TEXT_INPUT_THEME.error.textColor;
      if (variant === 'default') {
         borderColor = TEXT_INPUT_THEME.error.borderColor;
         focusRing = "shadow-none";
      }
   }

   return `
      ${commonStyles} 
      ${sizeClass}
      ${textColor} ${borderColor} ${placeholderTextColor} ${backgroundColor}
      ${focusRing}
   `.replace(/\s+/g, ' ').trim();
};