import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import CountriesList from '../components/CountriesList/CountriesList';
import Country from '../components/Country/Country';
import TravelStats from '../components/TravelStats/TravelStats';
import Trips from '../components/Trips/Trips';
import Journals from '../components/Journals/Journals';
import Layout from '../components/UI/Layout/Layout';

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/country/:countryCode" element={<Country />} />
        <Route path="/countriesList" element={<CountriesList />} />
        <Route path="/statistics" element={<TravelStats />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/journals/:tripId" element={<Journals />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
