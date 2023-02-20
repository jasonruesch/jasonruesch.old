export const toCurrency = (value?: number) =>
  value !== null
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    : '';

export const toOrdinalString = (number) => {
  let suffix = 'th';
  if (number <= 3 || number >= 21) {
    switch (number % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }
  return `${number}${suffix}`;
};
