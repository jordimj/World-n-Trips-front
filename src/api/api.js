import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ROOT_URL,
});

async function getCountriesBeen() {
  const response = await instance.get('/countriesBeenTo/');
  return response.data;
}

async function getCountryStats(countryName) {
  const response = await instance.get(`/statistics/${countryName}/`);
  return response.data;
}

export { getCountriesBeen, getCountryStats };
