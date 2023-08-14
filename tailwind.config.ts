import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import formsPlugin from '@tailwindcss/forms';
import { join } from 'path';
import { type Config } from 'tailwindcss';
import safeAreaPlugin from 'tailwindcss-safe-area';
import { plugin as customPlugin } from './tailwind';

export default {
  darkMode: 'class',
  content: [
    join(__dirname, 'index.html'),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin, safeAreaPlugin, customPlugin],
} satisfies Config;
