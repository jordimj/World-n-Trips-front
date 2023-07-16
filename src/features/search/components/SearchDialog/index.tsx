import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import COUNTRIES from '@/constants/countryCodes';
import useKeyDown from '@/hooks/useKeyDown';
import SearchInput from '@/features/countries/components/SearchInput/SearchInput';
import { getCountryFlagSrc } from '@/utils';
import useSearch from '@/features/search/hooks/useSearch';
import { euroFormatter } from '@/utils/number';
import EXPENSE_CATEGORY_EMOJIS from '@/constants/expenseCategoryEmojis';
import { formatDate } from '@/utils/date';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function SearchDialog(props: SearchDialogProps) {
  const { open, onClose } = props;

  const [keyword, setKeyword] = useState('');
  useKeyDown('Escape', onClose);

  const onChangeKeyword = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const { data, isFetching } = useSearch(keyword);

  const shouldShow = keyword.length > 0;

  const filteredCountries = shouldShow
    ? Object.entries(COUNTRIES).filter(([name]) =>
        name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    : [];

  const shouldShowCountries = shouldShow && filteredCountries.length > 0;

  const expenses = data !== undefined ? data.expenses : [];
  const shouldShowExpenses = shouldShow && expenses.length > 0;

  const journals = data !== undefined ? data.journals : [];
  const shouldShowJournals = shouldShow && journals.length > 0;

  const navigate = useNavigate();
  const goToExpenses = () => {
    onClose();
    navigate('/expenses', {
      state: {
        keyword,
      },
    });
  };

  return (
    <Backdrop open={open}>
      <Box sx={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '500px' }}>
        <SearchInput placeholder="Search anything" onChange={onChangeKeyword} autoFocus />
        <IconButton
          aria-label="close-search"
          onClick={onClose}
          sx={{
            ml: 'auto',
            position: 'absolute',
            top: 'var(--spacing-2)',
            right: 'var(--spacing-2)',
          }}
        >
          <CloseIcon />
        </IconButton>
        {shouldShowCountries && (
          <Box sx={{ backgroundColor: 'white', p: 1, pt: 2, border: 'var(--border)' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>
              COUNTRIES
            </Typography>
            <Stack>
              {filteredCountries.slice(0, 5).map(([name, code]) => (
                <NavLink key={code} to={`/countries/${code}/`} onClick={onClose}>
                  <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                    <img
                      src={getCountryFlagSrc(code)}
                      alt={`${name}'s flag`}
                      height="34"
                    />
                    <Typography>{name}</Typography>
                  </Stack>
                </NavLink>
              ))}
              {filteredCountries.length > 5 && (
                <Typography sx={{ color: 'var(--text-color-secondary)', ml: 'auto' }}>
                  + {filteredCountries.length - 5} countries
                </Typography>
              )}
            </Stack>
          </Box>
        )}
        {shouldShowExpenses && (
          <Box
            sx={{
              backgroundColor: 'white',
              p: 1,
              pt: 2,
              border: 'var(--border)',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>
              EXPENSES
            </Typography>
            <Stack>
              {expenses.slice(0, 5).map((expense) => (
                <Stack
                  key={expense.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ p: 1 }}
                >
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography sx={{ fontSize: 'var(--spacing-5)' }}>
                      {
                        EXPENSE_CATEGORY_EMOJIS[
                          expense.category as keyof typeof EXPENSE_CATEGORY_EMOJIS
                        ]
                      }
                    </Typography>
                    <Stack>
                      <Typography>{expense.details}</Typography>
                      <Typography
                        sx={{ fontSize: 12, color: 'var(--text-color-secondary)' }}
                      >
                        {expense.category} / {expense.subcategory}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="end">
                    <Typography>{euroFormatter(expense.valueEur)}</Typography>
                    <Typography
                      sx={{ fontSize: 12, color: 'var(--text-color-secondary)' }}
                    >
                      {expense.country}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
              {expenses.length > 5 && (
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ pl: 2, fontSize: 14 }}>
                    + {expenses.length - 5} expenses
                  </Typography>
                  <Button
                    onClick={goToExpenses}
                    variant="text"
                    sx={{ color: 'var(--text-color-secondary)', fontSize: 14 }}
                  >
                    Show all
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        )}
        {shouldShowJournals && (
          <Box sx={{ backgroundColor: 'white', p: 1, pt: 2, border: 'var(--border)' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>
              JOURNALS
            </Typography>
            <Stack>
              {journals.slice(0, 5).map((journal) => (
                <Stack
                  key={journal.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ p: 1 }}
                >
                  <Typography sx={{ fontSize: 12, color: 'var(--text-color-secondary)' }}>
                    {formatDate(journal.date)}: {journal.title}
                  </Typography>
                </Stack>
              ))}
              {journals.length > 5 && (
                <Typography sx={{ color: 'var(--text-color-secondary)', ml: 'auto' }}>
                  + {journals.length - 5} journal entries
                </Typography>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Backdrop>
  );
}

export default SearchDialog;
