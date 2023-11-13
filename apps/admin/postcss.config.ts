import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config';

export default {
  plugins: [autoprefixer, tailwindcss(tailwindConfig)],
};
