import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import MapPage from './containers/MapPage/MapPage';
import CountriesList from './containers/CountriesList/CountriesList';
import Country from './components/Country/Country';
import { Spinner } from './components/shared/Spinner';
import Layout from './components/UI/Layout/Layout';

function App() {
  const loading = useSelector((state) => state.loading);

  return (
    <Layout>
      <BrowserRouter>
        <Toolbar />
        <Spinner loading={loading} />
        <Switch>
          <Route path="/country/:countryName" component={Country} />
          <Route path="/list" component={CountriesList} />
          <Route path="/" exact component={MapPage} title="Home" />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
