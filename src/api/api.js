import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ROOT_URL,
});

async function getCountriesBeen() {
  return (await instance.get('/countriesBeenTo')).data;
}

async function getStats() {
  return (await instance.get('/statistics')).data;
}

async function getYearStats(year) {
  return (await instance.get(`/statistics/${year}`)).data;
}

async function getCountryStats(countryName) {
  return (await instance.get(`/country/statistics/${countryName}/`)).data;
}

async function getTrips() {
  return (await instance.get('/trips/full')).data;
}

async function getJournals(tripId) {
  return (await instance.get(`/journals/${tripId}`)).data;
}

export {
  getCountriesBeen,
  getStats,
  getYearStats,
  getTrips,
  getJournals,
  getCountryStats,
};
