import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout';
import Spinner from '../components/UI/Spinner/Spinner';

const Home = lazy(() => import('../components/Home/Home'));
const CountriesList = lazy(() => import('../components/CountriesList/CountriesList'));
const Country = lazy(() => import('../components/Country/Country'));
const TravelStats = lazy(() => import('../components/TravelStats/TravelStats'));
const Trips = lazy(() => import('../components/Trips/Trips'));
const Journals = lazy(() => import('../components/Journals/Journals'));

export const AppRouter = () => (
  <Suspense fallback={<Spinner />}>
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
  </Suspense>
);
