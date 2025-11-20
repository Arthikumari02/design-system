import React from 'react';
import cn from 'classnames';
import { useButtonContext } from './ButtonContext';

export interface ButtonTextProps {
    children: React.ReactNode;
}

export const ButtonText: React.FC<ButtonTextProps> = ({ children }) => {
    const { isLoading, shouldShrinkButtonWhileLoading } = useButtonContext();
    return (
        <span
            className={cn({
                'opacity-0': isLoading && !shouldShrinkButtonWhileLoading
            })}
        >
            {children}
        </span>
    );
};