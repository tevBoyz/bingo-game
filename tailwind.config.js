/** @type {import('tailwindcss').Config} */
export default {
darkMode: 'class', // Enable dark mode support
content: [
   './index.html',
   './src/**/*.{js,jsx}', // <- VERY important to include your source files!
],
theme: {
extend: {},
},
plugins: [],
}
