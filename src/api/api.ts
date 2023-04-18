import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_ROOT_URL,
});

export async function getVisitedCountries() {
  return (await instance.get('/countries/visited')).data;
}

export async function getStats() {
  return (await instance.get('/statistics')).data;
}

export async function getYearStats(year: string) {
  return (await instance.get(`/statistics/${year}`)).data;
}

export async function getCountryStats(countryName: string) {
  return (await instance.get(`/countries/statistics/${countryName}/`)).data;
}

export async function getTrips() {
  return (await instance.get('/trips/full')).data;
}

export async function getJournals(tripId: number) {
  return (await instance.get(`/journals/trip/${tripId}`)).data;
}

export async function getAvailableDates() {
  return await (
    await instance.get('/journals/dates')
  ).data;
}

export async function getEphemeris() {
  return (await instance.get('/ephemeris/')).data;
}

// todo: give it some love
export async function getExpenses(filters: any) {
  return (await instance.post('/expenses', filters)).data;
}

export async function getCurrencies() {
  return (await instance.get('/expenses/currencies')).data;
}
