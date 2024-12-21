/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    darkMode: ["class"],
    content: ["src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "accent": "#fedd69",
                "accentPlus": "#075a5a",
                "accentMinus": "#ff5b43"
            },
            screens: {
                'mobileWrap': { raw: '(max-width: 767px)' }
            }
        },
    },
}
