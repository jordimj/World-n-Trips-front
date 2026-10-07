import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/template/components/Layout/Layout';
import Spinner from '@/template/components/Spinner/Spinner';

const Home = lazy(() => import('@/features/home/components/Home'));
const Countries = lazy(() => import('@/features/countries/components/Countries'));
const Country = lazy(() => import('@/features/countries/components/Country'));
const TravelStats = lazy(() => import('@/features/statistics/components/TravelStats'));
const Trips = lazy(() => import('@/features/trips/components/Trips'));
const Trip = lazy(() => import('@/features/trips/components/Trip'));

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
          <Route path="/trips/:tripId" element={<Trip />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Suspense>
);
