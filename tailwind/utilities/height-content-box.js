/** iOS Safari fix to allow for padding
 * (e.g. "h-screen py-4")
 * Expands on the postcss-100vh-fix plugin
 */
export const HeightContentBox = {
  '@supports (-webkit-touch-callout: none)': {
    '.h-screen, .min-h-screen, .max-h-screen': {
      boxSizing: 'content-box',
    },
  },
};
