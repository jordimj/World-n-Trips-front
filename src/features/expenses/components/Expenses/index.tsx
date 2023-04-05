import { Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { ExpensesFilters } from '../../interfaces';
import Table from '../Table';
import Filters from '../Filters';

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ price: [0, 1000] });

  return (
    <Fragment>
      <Typography variant="h2">Expenses</Typography>
      <Filters filters={filters} setFilters={setFilters} />
      <Table filters={filters} />
    </Fragment>
  );
}

export default Expenses;
