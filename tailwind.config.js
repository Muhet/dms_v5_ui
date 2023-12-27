/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['ui-serif', 'Georgia', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
        'display': ['Oswald', 'display'],
        'body': ['"Open Sans"', 'sans'], 
        'poppins': ['Poppins', 'sans-serif'],
      },
       colors: {
        "custom-dark-blue": "#1B1F33",
        "custom-light-white": "#F1F6FE",
        "custom-white": "#FFFFFF",
        "custom-yellow": "#F79E1B",
        "custom-light-blue": "#0095DA",
        "custom-gray": "#95969F",
        "custom-light-gray": "#A5B4CB",
        "custom-light-green": "#EBFFF3",
        "custom-green": "#61BB84",
        "custom-light-orange": "#FFF1ED",
        "custom-orange": "#FFAA90",
        "custom-red": "#FF2121",
        "custom-sky": "#EEFAFF",
        "custom-deep": "#034B5E",
        "custom-main-gray": "#6c6f80",
      },
    },
  },
  plugins: [],
}
