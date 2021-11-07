import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import CountriesList from '../components/CountriesList/CountriesList';
import Country from '../components/Country/Country';
import Layout from '../components/UI/Layout/Layout';

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/country/:countryCode" element={<Country />} />
        <Route path="/countriesList" element={<CountriesList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
