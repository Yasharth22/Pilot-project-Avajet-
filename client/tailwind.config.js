// client/tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      spacing: {
        '64': '16rem', // Adds back support for w-64 if it's missing
      },
    },
  },
};
