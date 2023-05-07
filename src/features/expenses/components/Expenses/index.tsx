import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ExpensesFilters } from '../../interfaces';
import Table from '../Table';
import Filters from '../Filters';

interface LocationState {
  countryId?: number;
}

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ price: [0, 1000] });

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const countryId = state?.countryId;

  useEffect(() => {
    if (countryId === undefined) return;
    setFilters({ ...filters, countries: [countryId] });
  }, [countryId]);

  return (
    <Fragment>
      <Typography variant="h2">Expenses</Typography>
      <Filters filters={filters} setFilters={setFilters} />
      <Table filters={filters} setFilters={setFilters} />
    </Fragment>
  );
}

export default Expenses;
