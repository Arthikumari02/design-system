import React from 'react';
import cn from 'classnames';
import { Loader } from '../../Loader/Loader';
import { useButtonContext } from './ButtonContext';

export const ButtonLoader: React.FC = () => {
    const { loaderColor, isLoading, shouldShrinkButtonWhileLoading } = useButtonContext();
    if (!isLoading) return null;

    return (
        <span
            className={cn(
                'flex items-center justify-center',
                shouldShrinkButtonWhileLoading ? 'mr-0' : 'absolute inset-0'
            )}
        >
            <Loader className={loaderColor} />
        </span>
    );
};