/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 이 부분이 중요합니다!
    // "./public/index.html" 등 다른 경로도 포함될 수 있습니다.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
