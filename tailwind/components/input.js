export const Input = {
  'input:autofill, input:-webkit-autofill-strong-password, input:-webkit-autofill-strong-password-viewable, input:-webkit-autofill-and-obscured':
    {
      '-webkit-box-shadow': '0 0 0px 1000px transparent inset',
      transition: 'background-color 5000s ease-in-out 0s',
      '-webkit-text-fill-color': 'theme(colors.neutral.900)',

      '&::placeholder': {
        color: 'theme(colors.neutral.500)',
      },
    },
  '@media (prefers-color-scheme: dark)': {
    'input:autofill, input:-webkit-autofill-strong-password, input:-webkit-autofill-strong-password-viewable, input:-webkit-autofill-and-obscured':
      {
        '-webkit-box-shadow': '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
        '-webkit-text-fill-color': 'theme(colors.neutral.50)',

        '&::placeholder': {
          color: 'theme(colors.neutral.400)',
        },
      },
  },
};
