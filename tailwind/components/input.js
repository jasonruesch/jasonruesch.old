export const Input = {
  'input:autofill, input:-webkit-autofill-strong-password, input:-webkit-autofill-strong-password-viewable, input:-webkit-autofill-and-obscured':
    {
      '-webkit-box-shadow': '0 0 0px 1000px theme(colors.cyan.300) inset',
      transition: 'background-color 5000s ease-in-out 0s',
    },
  '@media (prefers-color-scheme: dark)': {
    'input:autofill, input:-webkit-autofill-strong-password, input:-webkit-autofill-strong-password-viewable, input:-webkit-autofill-and-obscured':
      {
        '-webkit-box-shadow': '0 0 0px 1000px theme(colors.violet.300) inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },
  },
};
