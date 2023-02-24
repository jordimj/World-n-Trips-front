export const euroFormatter = (expense: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(expense);

export const percentageFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const numberFormatter = (number: number, appendix: string = '') => {
  const noDecimals = number % 1 === 0;
  return (
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: noDecimals ? 0 : 2,
      maximumFractionDigits: noDecimals ? 0 : 2,
    }).format(number) +
    ' ' +
    appendix
  );
};

export const getAdverbialNumber = (number: number) => {
  if (number === 1) return 'Once';
  if (number === 2) return 'Twice';
  return `${number} times`;
};
