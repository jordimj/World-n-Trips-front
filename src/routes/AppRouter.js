import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Toolbar from '../components/UI/Navigation/Toolbar/Toolbar';
import Home from '../components/Home/Home';
import CountriesList from '../components/CountriesList/CountriesList';
import Country from '../components/Country/Country';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Toolbar />
      <Switch>
        <Route path="/country/:countryCode" component={Country} />
        <Route path="/countriesList" component={CountriesList} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
