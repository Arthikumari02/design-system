import '../src/Theme/styles/index.ts';
import 'tailwindcss/tailwind.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        layout: 'centered',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

// NOTE: adding base theme setup for storybook
document.body.classList.add('blue')
document.body.classList.add('light')

export default preview;
