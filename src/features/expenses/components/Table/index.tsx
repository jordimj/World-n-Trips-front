import { Fragment, useEffect } from 'react';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useElementOnScreen from '@/hooks/useElementOnScreen';
import { formatFullDate } from '@/utils/date';
import { euroFormatter } from '@/utils/number';
import useExpenses from '../../hooks/useExpenses';
import { ExpensesFilters } from '../../interfaces';
import Skeleton from './Skeleton';
import styles from './index.module.css';

interface Props {
  filters: ExpensesFilters;
}

function ExpensesTable(props: Props) {
  const { filters } = props;
  const { data, isFetching, fetchNextPage, hasNextPage } = useExpenses(filters);

  const pages = data?.pages ?? [];
  const pageParams = pages.at(-1)?.pagination ?? [];

  const [intersectionRef, isIntersecting] = useElementOnScreen();

  useEffect(() => {
    if (!isIntersecting || !hasNextPage) return;

    fetchNextPage();
  }, [isIntersecting]);

  const items = pages.map((page) => page.items).flat();
  const hasResults = items && items.length > 0;
  const hasLocalCurrency = items.some((item) => item.value);
  const isInitialLoading = items.length === 0 && isFetching;

  return (
    <Stack>
      <Typography sx={{ fontSize: 14, ml: 'auto', pt: 2 }}>
        Showing {items.length} expenses out of {pageParams.totalItems ?? 0} found
      </Typography>
      <TableContainer className={styles.paper} component={Paper}>
        <Table size="small" aria-label="table" stickyHeader>
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Trip</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Subcategory</TableCell>
              <TableCell align="center">Detailed info</TableCell>
              {hasLocalCurrency && (
                <TableCell align="center">Value (Local currency)</TableCell>
              )}
              <TableCell align="center">Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ scrollSnapType: 'y mandatory' }}>
            {hasResults &&
              items?.map((expense, idx) => (
                <Fragment key={idx}>
                  <TableRow key={expense.id} className={styles.row}>
                    <TableCell align="center">
                      <Typography>{formatFullDate(expense.day)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{expense.trip}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{expense.country}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{expense.category}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{expense.subcategory}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{expense.infoExtra}</Typography>
                    </TableCell>
                    {hasLocalCurrency && (
                      <TableCell align="center">
                        <Typography>
                          {expense.value ? `${expense.currency} ${expense.value}` : ' - '}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <Typography>{euroFormatter(Number(expense.valueEur))}</Typography>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            {!hasResults && !isFetching && (
              <TableRow>
                <Typography sx={{ px: 2, py: 1 }}>
                  No results matching these criteria
                </Typography>
              </TableRow>
            )}
            {(hasNextPage || isInitialLoading) && (
              <Skeleton cells={hasLocalCurrency ? 8 : 7} />
            )}
          </TableBody>
          <Box ref={intersectionRef} />
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ExpensesTable;
