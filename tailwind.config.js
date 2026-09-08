import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                pr: {
                    50: '#e7e8ec',
                    100: '#ced2d8',
                    200: '#b5bbc5',
                    300: '#9da4b2',
                    400: '#858e9f',
                    500: '#6c778b',
                    600: '#546078',
                    700: '#3b4965',
                    800: '#233351',
                    900: '#0a1c3e',
                },
                sec: {
                    50: '#fbf7eb',
                    100: '#f7efd7',
                    200: '#f2e7c3',
                    300: '#eedfaf',
                    400: '#ead79b',
                    500: '#e5cf87',
                    600: '#e1c773',
                    700: '#dcbf5f',
                    800: '#d8b74b',
                    900: '#d4af37',
                },
                dan: {
                    50: '#f8e9e9',
                    100: '#f1d3d3',
                    200: '#e9bcbc',
                    300: '#e2a6a6',
                    400: '#db9090',
                    500: '#d47a7a',
                    600: '#cc6464',
                    700: '#c54e4e',
                    800: '#be3737',
                    900: '#b72121',
                },
                suc: {
                    50: '#e8f2ec',
                    100: '#d0e6d8',
                    200: '#b9d9c5',
                    300: '#a1ccb1',
                    400: '#8abf9e',
                    500: '#73b38b',
                    600: '#5ba677',
                    700: '#449964',
                    800: '#2c8d50',
                    900: '#15803d',
                },
                neu: {
                    50: '#e9e9e9',
                    100: '#d3d3d3',
                    200: '#bcbcbc',
                    300: '#a6a6a6',
                    400: '#909090',
                    500: '#7a7a7a',
                    600: '#646464',
                    700: '#4d4d4d',
                    800: '#373737',
                    900: '#212121',
                },
                'bg-900': '#070C18',
            },
        },
    },

    plugins: [forms],
};
