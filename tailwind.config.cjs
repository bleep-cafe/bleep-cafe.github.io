const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],

    theme: {
        extend: {
            animation: {
                'gradient-x': 'gradient-x 10s ease infinite',
                'gradient-y': 'gradient-y 10s ease infinite',
                'gradient-xy': 'gradient-xy 10s ease infinite',
            },

            fontFamily: {
                'sans': ['Outfit', ...defaultTheme.fontFamily.sans],
                'title': ['Thiccc', ...defaultTheme.fontFamily.sans],
            },

            keyframes: {
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center center'
                    }
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                }
            }
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
}
