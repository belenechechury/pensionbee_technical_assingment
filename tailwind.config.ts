import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: '#f9c000',
        brandBlack: '#343a40',
      },
    },
  },
  plugins: [],
};

export default config;
