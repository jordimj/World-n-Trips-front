import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import MapPage from './containers/MapPage/MapPage';
import CountriesList from './containers/CountriesList/CountriesList';
import Country from './components/Country/Country';
import { Spinner } from './components/shared/Spinner/Spinner';

function App() {
  const loading = useSelector((state) => state.loading);

  return (
    <BrowserRouter>
      <Toolbar />
      <Spinner loading={loading} />
      <Switch>
        <Route path="/country/:countryName" component={Country} />
        <Route path="/list" component={CountriesList} />
        <Route path="/" exact component={MapPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
