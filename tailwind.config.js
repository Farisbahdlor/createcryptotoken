/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./components/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      'sm': '640px',      // default
      'md': '768px',      // default
      'lg': '1024px',     // default
      'xl': '1280px',     // default
      '2xl': '1536px',    // default
      'android': '360px',    // custom size
      'iph14p': '390px',    // custom size
      'iph14pm': '430px',    // custom size
      'ipda5': '820px',    // custom size
    },
    extend: {
      fontSize: {
        'tiny': '0.6rem',    // new custom size
        'mtiny': '0.7rem',
        'xs': '0.75rem',       // default
        'sm': '0.875rem',      // default
        'base': '1rem',        // default
        'lg': '1.125rem',      // default
        'xl': '1.25rem',       // default
        '2xl': '1.5rem',       // default
        '3xl': '1.875rem',     // default
        '4xl': '2.25rem',      // default
        '5xl': '3rem',         // default
        '6xl': '3.75rem',      // default
        '7xl': '4.5rem',       // default
      },
    },
  },
  plugins: [],
}