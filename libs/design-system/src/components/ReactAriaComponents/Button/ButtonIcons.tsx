import React from 'react';
import cn from 'classnames';
import { useButtonContext } from './ButtonContext';
import type { ButtonIconColors } from './types';

export interface ButtonIconProps {
    render: (iconColors: ButtonIconColors) => React.ReactNode;
    position?: 'left' | 'right';
}

const BaseButtonIcon: React.FC<ButtonIconProps> = ({ render, position = 'left' }) => {
    const { iconColors, sizedTheme, isLoading, shouldShrinkButtonWhileLoading } = useButtonContext();

    const marginClass =
        position === 'left' ? sizedTheme.leftIconMargin : sizedTheme.rightIconMargin;

    return (
        <span
            className={cn(
                marginClass,
                'transition-opacity duration-200',
                isLoading && !shouldShrinkButtonWhileLoading && 'opacity-50'
            )}
        >
            {render(iconColors)}
        </span>
    );
};

export const ButtonLeftIcon: React.FC<ButtonIconProps> = (props) => (
    <BaseButtonIcon {...props} position="left" />
);

export const ButtonRightIcon: React.FC<ButtonIconProps> = (props) => (
    <BaseButtonIcon {...props} position="right" />
);
