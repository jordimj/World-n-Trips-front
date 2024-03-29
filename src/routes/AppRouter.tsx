import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/template/components/Layout/Layout';
import Spinner from '@/template/components/Spinner/Spinner';

const Home = lazy(() => import('@/features/countries/components/Home/Home'));
const Countries = lazy(() => import('@/features/countries/components/Countries'));
const Country = lazy(() => import('@/features/countries/components/Country/Country'));
const TravelStats = lazy(() => import('@/features/statistics/components/TravelStats'));
const Trips = lazy(() => import('@/features/journals/components/Trips'));
const Journals = lazy(() => import('@/features/journals/components/Journals'));
const Expenses = lazy(() => import('@/features/expenses/components/Expenses'));

export const AppRouter = () => (
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/countries/:countryCode" element={<Country />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/statistics" element={<TravelStats />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/journals/:tripId" element={<Journals />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Suspense>
);
