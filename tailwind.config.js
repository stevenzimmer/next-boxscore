const colors = require("tailwindcss/colors");
module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                // Remove the "gray" colors from the theme.
                gray: {},
                grey: {
                    ...colors["blueGray"],
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
