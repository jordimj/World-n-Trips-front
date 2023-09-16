/**
 * Format date as DD/MM/YYYY with leading zeros
 */
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ca-CA', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
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
export function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date(date));
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

export const formatTripDates = (arrivalDate: string, departureDate: string) => {
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);

  if (arrival.getFullYear() !== departure.getFullYear())
    return formatCardDate(arrival) + ' - ' + formatCardDate(departure);

  if (arrival.getMonth() !== departure.getMonth())
    return formatCardDate(arrival, false) + ' - ' + formatCardDate(departure);

  return formatCardDate(arrival);
};

export function getYearsAgo(date: string) {
  const yearDifference = new Date(date).getFullYear() - new Date().getFullYear();
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  return rtf.format(yearDifference, 'year');
}
