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

async function getCountryStats(countryName) {
  return (await instance.get(`/statistics/${countryName}/`)).data;
}

export { getCountriesBeen, getStats, getCountryStats };
