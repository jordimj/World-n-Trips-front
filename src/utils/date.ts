export const addDatesToTripCard = (arrivalDate: string, departureDate: string) => {
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };

  if (arrival.getFullYear() !== departure.getFullYear()) {
    return (
      Intl.DateTimeFormat('en-US', defaultOptions).format(arrival) +
      ' - ' +
      Intl.DateTimeFormat('en-US', defaultOptions).format(departure)
    );
  }

  if (arrival.getMonth() !== departure.getMonth()) {
    return (
      Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(new Date(arrival)) +
      ' - ' +
      Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(departure))
    );
  }

  return Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(arrival));
};

export function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date(date));
}

export function getYearsAgo(date: string) {
  const yearDifference = new Date(date).getFullYear() - new Date().getFullYear();
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  return rtf.format(yearDifference, 'year');
}
