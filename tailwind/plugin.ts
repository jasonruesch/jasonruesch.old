import { type Config } from 'tailwindcss';
import tailwindPlugin from 'tailwindcss/plugin';
import { Button, Input } from './components';
import { presets } from './presets';

export const plugin = tailwindPlugin.withOptions(
  () =>
    ({ addComponents }) => {
      addComponents(Button);
      addComponents(Input);
    },
  () => ({
    ...presets,
  })
) satisfies Partial<Config>;
