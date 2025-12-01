import { NavLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import COUNTRIES from '@/constants/countryCodes';
import CountryFlag from '@/template/components/CountryFlag';

interface Props {
  keyword: string;
  onClose: () => void;
}

export default function Countries(props: Props) {
  const { keyword, onClose } = props;

  const shouldShow = keyword.length > 0;

  if (!shouldShow) return null;

  const filteredCountries = shouldShow
    ? Object.entries(COUNTRIES).filter(([name]) =>
        name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    : [];

  const hasResults = filteredCountries.length > 0;

  return (
    <Stack
      gap={1}
      sx={{
        backgroundColor: 'white',
        p: 2,
        borderRight: 'var(--border)',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 500, textAlign: 'center' }}>Countries</Typography>
      {hasResults ? (
        <Stack>
          {filteredCountries.slice(0, 5).map(([name, code]) => (
            <NavLink key={code} to={`/countries/${code}/`} onClick={onClose}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                <CountryFlag name={name} />
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
      ) : (
        <Typography sx={{ fontSize: 14, color: 'var(--text-color-secondary)', pt: 2 }}>
          No countries found.
        </Typography>
      )}
    </Stack>
  );
}
