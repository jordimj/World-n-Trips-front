import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Option } from '@/template/components/Autocomplete/Autocomplete';
import { ExpensesFilters } from '../../interfaces';
import Table from '../Table';
import Filters from '../Filters';

interface LocationState {
  country?: Option;
  keyword?: string;
}

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ price: [0, 1000] });

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const { country, keyword } = state ?? {};

  useEffect(() => {
    if (country !== undefined) setFilters({ ...filters, countries: [country] });
    if (keyword !== undefined) setFilters({ ...filters, query: keyword });
  }, [country, keyword]);

  return (
    <Fragment>
      <Typography variant="h2">Expenses</Typography>
      <Filters filters={filters} setFilters={setFilters} />
      <Table filters={filters} setFilters={setFilters} />
    </Fragment>
  );
}

export default Expenses;
