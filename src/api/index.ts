import axios from 'axios';
import { InserterBody } from '@/features/inserter/hooks/useDataInsertion';
import { ImportKind } from '@/features/inserter/types';

const instance = axios.create({
  baseURL: import.meta.env.VITE_ROOT_URL,
});

export async function getVisitedCountries() {
  return (await instance.get('/countries/visited')).data;
}

export async function getStats(year: string | null) {
  return (await instance.get(year ? `/statistics/${year}` : '/statistics')).data;
}

export async function getCountryStats(countryName: string) {
  return (await instance.get(`/countries/statistics/${countryName}`)).data;
}

export async function setCountryVisited(countryCode: string, visited: boolean) {
  return (await instance.put(`/countries/${countryCode}/visited`, { visited })).data;
}

export async function getCountries(onlyVisited: boolean = false) {
  return (await instance.get('/countries', { params: { onlyVisited } })).data;
}

export async function getTrips() {
  return (await instance.get('/trips')).data;
}

export async function getJournals(tripId: number) {
  return (await instance.get(`/journals/trip/${tripId}`)).data;
}

export async function saveNewData(dataKind: ImportKind, body: InserterBody) {
  return (await instance.post(`/${dataKind}s/create`, body)).data;
}

export async function getAvailableDates() {
  return await (
    await instance.get('/journals/dates')
  ).data;
}

export async function getEphemerides() {
  return (await instance.get('/ephemeris')).data;
}

// todo: give it some love
export async function getExpenses(filters: any) {
  return (await instance.post('/expenses', filters)).data;
}

export async function getCurrencies() {
  return (await instance.get('/expenses/currencies')).data;
}

export async function getCategories() {
  return (await instance.get('/categories')).data;
}

export async function search(keyword: string) {
  return (await instance.get('/search', { params: { keyword } })).data;
}
