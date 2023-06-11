import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
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
import COUNTRIES from '@/constants/countryCodes';
import useElementOnScreen from '@/hooks/useElementOnScreen';
import { formatFullDate } from '@/utils/date';
import { getCountryFlagSrc } from '@/utils';
import { euroFormatter } from '@/utils/number';
import useExpenses from '../../hooks/useExpenses';
import { ExpensesFilters, OrderBy } from '../../interfaces';
import CountDisplay from './CountDisplay';
import SortableTableHead from './SortableTableHead';
import Skeleton from './Skeleton';
import styles from './index.module.css';

interface Props {
  filters: ExpensesFilters;
  setFilters: Dispatch<SetStateAction<ExpensesFilters>>;
}

function ExpensesTable(props: Props) {
  const { filters, setFilters } = props;
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

  const totalAmount = pages.at(-1)?.totalAmount;

  const sortBy = (newOrderBy: OrderBy) => {
    if (filters.orderBy === newOrderBy) {
      setFilters({ ...filters, order: filters.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ ...filters, orderBy: newOrderBy, order: 'asc' });
    }
  };

  return (
    <Stack>
      <CountDisplay
        items={items}
        isFetching={isFetching}
        totalAmount={totalAmount}
        totalItems={pageParams.totalItems}
      />
      <TableContainer className={styles.paper} component={Paper}>
        <Table size="small" aria-label="table" stickyHeader>
          <TableHead className={styles.head}>
            <TableRow>
              <SortableTableHead
                kind="day"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              <SortableTableHead
                kind="category"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              <SortableTableHead
                kind="subcategory"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              <SortableTableHead
                kind="details"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              {hasLocalCurrency && (
                <TableCell align="center">Value (Local currency)</TableCell>
              )}
              <SortableTableHead
                kind="valueEur"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              <SortableTableHead
                kind="country"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
              <SortableTableHead
                kind="trip"
                sortBy={sortBy}
                orderBy={filters.orderBy ?? 'day'}
                order={filters.order ?? 'asc'}
              />
            </TableRow>
          </TableHead>

          <TableBody sx={{ scrollSnapType: 'y mandatory' }}>
            {hasResults &&
              items?.map((expense, idx) => {
                const {
                  id,
                  day,
                  trip,
                  country,
                  category,
                  subcategory,
                  details,
                  value,
                  currency,
                  valueEur,
                } = expense;

                const countryCode = COUNTRIES[country as keyof typeof COUNTRIES];

                return (
                  <Fragment key={idx}>
                    <TableRow key={id} className={styles.row}>
                      <TableCell align="center">
                        <Typography>{formatFullDate(day)}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{category}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{subcategory}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{details}</Typography>
                      </TableCell>
                      {hasLocalCurrency && (
                        <TableCell align="center">
                          <Typography>
                            {value ? `${currency} ${value}` : ' - '}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Typography>{euroFormatter(Number(valueEur))}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <img
                          src={getCountryFlagSrc(countryCode)}
                          alt={`${country}'s flag`}
                          height="34"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{trip}</Typography>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
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
