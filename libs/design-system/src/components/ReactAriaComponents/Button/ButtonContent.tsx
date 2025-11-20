import cn from 'classnames';
import React from 'react';
import { withFocusRing, FocusRingProps } from '../WithFocusRing/WithFocusRing';
import { useButtonContext } from './ButtonContext';

export interface ButtonContentProps extends Omit<FocusRingProps, 'variant'> {
   children: React.ReactNode;
   className?: string;
   isFocused: boolean;
}

const ButtonContentBase = ({ children, className }: ButtonContentProps) => {
   const {
      bgColor,
      textColor,
      border,
      sizedTheme,
      isLink,
      isLoading,
      shouldShrinkButtonWhileLoading,
      isDisabled,
   } = useButtonContext();

   const isButtonDisabled = isDisabled || isLoading;

   return (
      <div
         className={cn(
            'flex justify-center items-center outline-none',
            !shouldShrinkButtonWhileLoading && 'relative',
            bgColor,
            textColor,
            border,
            sizedTheme.typography,
            sizedTheme.borderRadius,
            isLink ? 'px-0 py-0' : sizedTheme.padding,
            isButtonDisabled && 'cursor-not-allowed',
            className
         )}
      >
         <div className={`flex items-center ${sizedTheme.gap}`}>
            {children}
         </div>
      </div>
   );
};

export const ButtonContent = withFocusRing(ButtonContentBase);