/**
 * Format date as DD/MM/YYYY with leading zeros
 */
export function formatDate(date: Date | string) {
  const newDate = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('ca-CA', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(newDate);
}

/**
 * Format date as database format: YYYY-MM-DD with leading zeros
 */
export function formatDatabaseDate(date: Date) {
  return new Intl.DateTimeFormat('en-CA').format(date);
}

/**
 * Format date as "Thursday, May 26, 2022"
 */
export function formatFullDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(typeof date === 'string' ? new Date(date) : date);
}

/**
 * Format date as Month or Month YYYY
 */
function formatCardDate(date: Date, withYear = true) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    ...(withYear && { year: 'numeric' }),
  };

  return Intl.DateTimeFormat('en-US', defaultOptions).format(date);
}

export const formatTripDates = (arrivalDate: Date, departureDate: Date) => {
  if (arrivalDate.getFullYear() !== departureDate.getFullYear())
    return formatCardDate(arrivalDate) + ' - ' + formatCardDate(departureDate);

  if (arrivalDate.getMonth() !== departureDate.getMonth())
    return formatCardDate(arrivalDate, false) + ' - ' + formatCardDate(departureDate);

  return formatCardDate(arrivalDate);
};

export function getYearsAgo(date: string) {
  const yearDifference = new Date(date).getFullYear() - new Date().getFullYear();
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  return rtf.format(yearDifference, 'year');
}
