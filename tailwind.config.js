/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    darkMode: ["class"],
    content: ["src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors:{
                "accent": "#fedd69",
                "accentPlus":"#075a5a",
            },
            fontFamily: {
                "consolas": ["Consolas", "Courier New", 'Courier', 'monospace'],
                "poppins": ["Poppins", ...defaultTheme.fontFamily.serif],
                "icons": ["Material Symbols Outlined"]
            },
            keyframes: {
                "heartPulse": {
                    '0%, 25%, 60%': { transform: 'scale(1)' },
                    '5%, 35%': { transform: 'scale(1.25)' },
                },
                fadeInUp: {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                }
            },
            animation: {
                'heart-pulse': 'heartPulse 0.9375s linear infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
            },
            screens: {
                "mobile":{raw:"(max-width:767px)"},
                "notMobile":{raw:"(min-width:768px)"}
            },
            attracton_card: {
                "card":"w-[250px] p-4 border border rounded-lg text-center"
                
            }

        },
    },
}