import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Option } from '@/template/components/Autocomplete/Autocomplete';
import { ExpensesFilters } from '../../interfaces';
import Filters from '../Filters';
import Table from '../Table';

interface LocationState {
  country?: Option;
  keyword?: string;
  from?: string;
  to?: string;
}

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ price: [0, 1300] });

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const { country, keyword, from, to } = state ?? {};

  useEffect(() => {
    setFilters((previous) => ({
      ...previous,
      ...(country !== undefined && { countries: [country] }),
      ...(keyword !== undefined && { query: keyword }),
      ...(from !== undefined && {
        from: new Date(from + 'T00:00:00'),
        countries: undefined,
        trips: undefined,
      }),
      ...(to !== undefined && { to: new Date(to + 'T00:00:00') }),
    }));
  }, [country, keyword, from, to]);

  return (
    <Fragment>
      <Typography variant="h2">Expenses</Typography>
      <Filters filters={filters} setFilters={setFilters} />
      <Table filters={filters} setFilters={setFilters} />
    </Fragment>
  );
}

export default Expenses;
