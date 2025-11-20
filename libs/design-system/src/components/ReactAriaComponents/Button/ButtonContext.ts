import { createContext, useContext } from 'react';
import type { ButtonStyles, ButtonIconColors } from './types';

export interface ButtonContextValue extends ButtonStyles {
    iconColors: ButtonIconColors;
    sizedTheme: any;
    isLoading: boolean;
    isDisabled: boolean;
    shouldShrinkButtonWhileLoading: boolean;
    isLink: boolean;
}

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext() {
    const ctx = useContext(ButtonContext);
    if (!ctx) throw new Error('Button.* sub-component must be used inside <Button>');
    return ctx;
}
