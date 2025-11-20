import { Dispatch, SetStateAction, useEffect } from 'react';
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
import Chip from '@/template/components/Chip/Chip';
import CountryFlag from '@/template/components/CountryFlag';
import { formatFullDate } from '@/utils/date';
import { euroFormatter } from '@/utils/number';
import useExpenses from '../../hooks/useExpenses';
import { ExpensesFilters, OrderBy } from '../../interfaces';
import CountDisplay from './CountDisplay';
import Skeleton from './Skeleton';
import SortableTableHead from './SortableTableHead';
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
    <Stack gap={2} sx={{ mx: 2 }}>
      <CountDisplay
        items={items}
        isFetching={isFetching}
        totalAmount={totalAmount}
        totalItems={pageParams.totalItems}
      />
      <TableContainer className={styles.paper} component={Paper}>
        <Table size="small" aria-label="expenses table" stickyHeader>
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

          <TableBody>
            {hasResults &&
              items?.map((expense) => {
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

                return (
                  <TableRow key={id} className={styles.row}>
                    <TableCell>
                      <Typography>{formatFullDate(day)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={category} variant="category" />
                    </TableCell>
                    <TableCell>
                      <Typography>{subcategory}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{details}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {euroFormatter(Number(valueEur))}
                      </Typography>
                      {value && (
                        <Typography
                          sx={{
                            fontSize: '12px!important',
                            color: 'var(--primary-color-600)!important',
                          }}
                        >
                          {value ? `${currency} ${value}` : '-'}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <CountryFlag name={country} />
                    </TableCell>
                    <TableCell>
                      <Chip label={trip} />
                    </TableCell>
                  </TableRow>
                );
              })}
            {!hasResults && !isFetching && (
              <TableRow>
                <Typography sx={{ px: 2, py: 1 }}>No results matching these criteria</Typography>
              </TableRow>
            )}
            {(hasNextPage || isInitialLoading) && <Skeleton cells={7} />}
          </TableBody>
          <Box ref={intersectionRef} />
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ExpensesTable;
