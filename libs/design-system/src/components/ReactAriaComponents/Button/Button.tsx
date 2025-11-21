import cn from 'classnames';
import React, { forwardRef, useMemo } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';

import { Hierarchy, SubVariant } from '../../../types/ButtonTypes';
import { ButtonSize } from '../../../types';
import { ButtonContent } from './ButtonContent';
import { buttonSizes } from './sizes';
import { getButtonStyles } from './styles';
import { ButtonContext } from './ButtonContext';

import { ButtonLeftIcon, ButtonRightIcon } from './ButtonIcons';
import { ButtonText } from './ButtonText';
import { ButtonLoader } from './ButtonLoader';

export interface ButtonProps extends Omit<AriaButtonProps, 'isDisabled'> {
   hierarchy?: Hierarchy;
   size?: ButtonSize;
   subVariant?: SubVariant;
   isDisabled?: boolean;
   shouldShrinkButtonWhileLoading?: boolean;
   children?: React.ReactNode;
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         hierarchy = Hierarchy.Primary,
         size = 'Medium',
         subVariant = SubVariant.Primary,
         isDisabled = false,
         shouldShrinkButtonWhileLoading = false,
         children,
         className,
         ...others
      },
      forwardedRef
   ) => {
      const sizedTheme = buttonSizes[size];
      const isLink = hierarchy === Hierarchy.Link;

      const hasLoader = useMemo(() => {
         let foundLoader = false;
         React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === ButtonLoader) {
               foundLoader = true;
            }
         });
         return foundLoader;
      }, [children]);

      return (
         <AriaButton
            {...others}
            ref={forwardedRef}
            isDisabled={isDisabled || hasLoader}
            aria-busy={hasLoader}
            className={cn(className, 'outline-none')}
         >
            {({ isHovered, isPressed, isFocused, isPending }) => {
               const loading = hasLoader || isPending;

               const styles = getButtonStyles({
                  isHovered,
                  isPressed: isPressed || isFocused,
                  isDisabled: isDisabled || loading,
                  hierarchy,
                  subVariant,
                  isLoading: loading,
               });

               return (
                  <ButtonContext.Provider
                     value={{
                        ...styles,
                        sizedTheme,
                        isLoading: loading,
                        isDisabled,
                        shouldShrinkButtonWhileLoading,
                        isLink,
                     }}
                  >
                     <ButtonContent isFocused={isFocused} variant={styles.focusRingVariant}>
                        {children}
                     </ButtonContent>
                  </ButtonContext.Provider>
               );
            }}
         </AriaButton>
      );
   }
);

ButtonBase.displayName = 'Button';

export const Button = Object.assign(ButtonBase, {
   ButtonLeftIcon,
   ButtonRightIcon,
   Text: ButtonText,
   Loader: ButtonLoader,
});

export default Button;
