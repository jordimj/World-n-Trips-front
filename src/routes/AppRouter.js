import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import CountriesList from '../components/CountriesList/CountriesList';
import Country from '../components/Country/Country';
import Layout from '../components/UI/Layout/Layout';

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/country/:countryCode" component={Country} />
        <Route path="/countriesList" component={CountriesList} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
