const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname)
    ],
    presets: [require('./src/Theme/styles/generated_tailwind_config.js')],
    theme: {
        screens: {
            sm: '0px',
            md: '768px',
            lg: '1024px',
            xl: '1440px',
            '2xl': '1920px'
        },
        extend: {
            boxShadow: {
                // FIXME: Need to update colors from theme
                xs: '0px 1px 2px 0px #1018280D',
                sm: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
                md: '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A',
                lg: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
                xl: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814'
            },
            width: ({ theme }) => ({
                'fit-content': 'fit-content',
                inherit: 'inherit',
                'container-max-width-desktop': theme('spacing.320')
            }),
            height: {
                inherit: 'inherit',
                'fit-content': 'fit-content'
            },
            zIndex: {
                l0: 'var(--z-l0)',
                l1: 'var(--z-l1)',
                l2: 'var(--z-l2)',
                l3: 'var(--z-l3)',
                l4: 'var(--z-l4)',
                l5: 'var(--z-l5)',
                l6: 'var(--z-l6)',
                l7: 'var(--z-l7)',
                l8: 'var(--z-l8)',
                l9: 'var(--z-l9)',
                l10: 'var(--z-l10)',
                l11: 'var(--z-l11)'
            },
            padding: ({ theme }) => ({
                'container-padding-mobile': theme('spacing.4'),
                'container-padding-desktop': theme('spacing.8')
            }),
            fontSize: {
                xs: ['12px', { lineHeight: '18px' }],
                sm: ['14px', { lineHeight: '20px' }],
                base: ['16px', { lineHeight: '24px' }],
                lg: ['18px', { lineHeight: '28px' }],
                xl: ['20px', { lineHeight: '30px' }],
                '2xl': ['24px', { lineHeight: '32px' }],
                '3xl': ['30px', { lineHeight: '38px' }],
                '4xl': ['36px', { lineHeight: '44px' }],
                '5xl': ['48px', { lineHeight: '60px' }],
                '6xl': ['60px', { lineHeight: '72px' }],
                '7xl': ['72px', { lineHeight: '90px' }],
                '8xl': ['96px', { lineHeight: '120px' }],
                '9xl': ['128px', { lineHeight: '160px' }]
            }
        }
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.display-2xl-regular': {
                    'font-size': '72px',
                    'font-weight': 400,
                    'line-height': '90px',
                    'letter-spacing': '-0.02em'
                },
                '.display-2xl-medium': {
                    'font-size': '72px',
                    'font-weight': 500,
                    'line-height': '90px',
                    'letter-spacing': '-0.02em'
                },
                '.display-2xl-semibold': {
                    'font-size': '72px',
                    'font-weight': 600,
                    'line-height': '90px',
                    'letter-spacing': '-0.02em'
                },
                '.display-2xl-bold': {
                    'font-size': '72px',
                    'font-weight': 700,
                    'line-height': '90px',
                    'letter-spacing': ' -0.02em'
                },
                '.display-xl-regular': {
                    'font-size': '60px',
                    'font-weight': 400,
                    'line-height': '72px',
                    'letter-spacing': '-0.02em'
                },
                '.display-xl-medium': {
                    'font-size': '60px',
                    'font-weight': 500,
                    'line-height': '72px',
                    'letter-spacing': '-0.02em'
                },
                '.display-xl-semibold': {
                    'font-size': '60px',
                    'font-weight': 600,
                    'line-height': '72px',
                    'letter-spacing': '-0.02em'
                },
                '.display-xl-bold': {
                    'font-size': '60px',
                    'font-weight': 700,
                    'line-height': '72px',
                    'letter-spacing': ' -0.02em'
                },
                '.display-lg-regular': {
                    'font-size': '48px',
                    'font-weight': 400,
                    'line-height': '60px',
                    'letter-spacing': '-0.02em'
                },
                '.display-lg-medium': {
                    'font-size': '48px',
                    'font-weight': 500,
                    'line-height': '60px',
                    'letter-spacing': '-0.02em'
                },
                '.display-lg-semibold': {
                    'font-size': '48px',
                    'font-weight': 600,
                    'line-height': '60px',
                    'letter-spacing': '-0.02em'
                },
                '.display-lg-bold': {
                    'font-size': '48px',
                    'font-weight': 700,
                    'line-height': '60px',
                    'letter-spacing': ' -0.02em'
                },
                '.display-md-regular': {
                    'font-size': '36px',
                    'font-weight': 400,
                    'line-height': '44px',
                    'letter-spacing': '-0.02em'
                },
                '.display-md-medium': {
                    'font-size': '36px',
                    'font-weight': 500,
                    'line-height': '44px',
                    'letter-spacing': '-0.02em'
                },
                '.display-md-semibold': {
                    'font-size': '36px',
                    'font-weight': 600,
                    'line-height': '44px',
                    'letter-spacing': '-0.02em'
                },
                '.display-md-bold': {
                    'font-size': '36px',
                    'font-weight': 700,
                    'line-height': '44px',
                    'letter-spacing': ' -0.02em'
                },
                '.display-sm-regular': {
                    'font-size': '30px',
                    'font-weight': 400,
                    'line-height': '38px'
                },
                '.display-sm-medium': {
                    'font-size': '30px',
                    'font-weight': 500,
                    'line-height': '38px'
                },
                '.display-sm-semibold': {
                    'font-size': '30px',
                    'font-weight': 600,
                    'line-height': '38px'
                },
                '.display-sm-bold': {
                    'font-size': '30px',
                    'font-weight': 700,
                    'line-height': '38px'
                },
                '.display-xs-regular': {
                    'font-size': '24px',
                    'font-weight': 400,
                    'line-height': '32px'
                },
                '.display-xs-medium': {
                    'font-size': '24px',
                    'font-weight': 500,
                    'line-height': '32px'
                },
                '.display-xs-semibold': {
                    'font-size': '24px',
                    'font-weight': 600,
                    'line-height': '32px'
                },
                '.display-xs-bold': {
                    'font-size': '24px',
                    'font-weight': 700,
                    'line-height': '32px'
                },
                '.text-xl-regular': {
                    'font-size': '20px',
                    'font-weight': 400,
                    'line-height': '30px'
                },
                '.text-xl-medium': {
                    'font-size': '20px',
                    'font-weight': 500,
                    'line-height': '30px'
                },
                '.text-xl-semibold': {
                    'font-size': '20px',
                    'font-weight': 600,
                    'line-height': '30px'
                },
                '.text-xl-bold': {
                    'font-size': '20px',
                    'font-weight': 700,
                    'line-height': '30px'
                },
                '.text-lg-regular': {
                    'font-size': '18px',
                    'font-weight': 400,
                    'line-height': '28px'
                },
                '.text-lg-medium': {
                    'font-size': '18px',
                    'font-weight': 500,
                    'line-height': '28px'
                },
                '.text-lg-semibold': {
                    'font-size': '18px',
                    'font-weight': 600,
                    'line-height': '28px'
                },
                '.text-lg-bold': {
                    'font-size': '18px',
                    'font-weight': 700,
                    'line-height': '28px'
                },
                '.text-md-regular': {
                    'font-size': '16px',
                    'font-weight': 400,
                    'line-height': '24px'
                },
                '.text-md-medium': {
                    'font-size': '16px',
                    'font-weight': 500,
                    'line-height': '24px'
                },
                '.text-md-semibold': {
                    'font-size': '16px',
                    'font-weight': 600,
                    'line-height': '24px'
                },
                '.text-md-bold': {
                    'font-size': '16px',
                    'font-weight': 700,
                    'line-height': '24px'
                },
                '.text-sm-regular': {
                    'font-size': '14px',
                    'font-weight': 400,
                    'line-height': '20px'
                },
                '.text-sm-medium': {
                    'font-size': '14px',
                    'font-weight': 500,
                    'line-height': '20px'
                },
                '.text-sm-semibold': {
                    'font-size': '14px',
                    'font-weight': 600,
                    'line-height': '20px'
                },
                '.text-sm-bold': {
                    'font-size': '14px',
                    'font-weight': 700,
                    'line-height': '20px'
                },
                '.text-xs-regular': {
                    'font-size': '12px',
                    'font-weight': 400,
                    'line-height': '18px'
                },
                '.text-xs-medium': {
                    'font-size': '12px',
                    'font-weight': 500,
                    'line-height': '18px'
                },
                '.text-xs-semibold': {
                    'font-size': '12px',
                    'font-weight': 600,
                    'line-height': '18px'
                },
                '.text-xs-bold': {
                    'font-size': '12px',
                    'font-weight': 700,
                    'line-height': '18px'
                },

                '.ring-brand': {
                    '--tw-ring-color': `${theme('colors.utility-brand-200')}`
                },
                // FIXME: Need to update colors from theme
                '.ring-error': {
                    '--tw-ring-color': '#F044383D'
                },
                '.ring-gray': {
                    '--tw-ring-color': '#98A2B324'
                },
                '.ring-gray-secondary': {
                    '--tw-ring-color': '#98A2B333'
                },
                '.ring-transparent': {
                    '--tw-ring-color': 'transparent'
                }
            })
        })
    ]
}
