import React from 'react';
import { useSelector } from 'react-redux';

import { Spinner } from './components/UI/Spinner/Spinner';
import Layout from './components/UI/Layout/Layout';
import { AppRouter } from './routes/AppRouter';

function App() {
  const loading = useSelector((state) => state.loading);

  return (
    <Layout>
      <Spinner loading={loading} />
      <AppRouter />
    </Layout>
  );
}

export default App;
