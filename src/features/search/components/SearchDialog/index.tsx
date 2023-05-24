import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Backdrop, Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import COUNTRIES from '@/constants/countryCodes';
import useKeyDown from '@/hooks/useKeyDown';
import SearchInput from '@/features/countries/components/SearchInput/SearchInput';
import { getCountryFlagSrc } from '@/utils';

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

  const shouldShow = keyword.length > 0;

  const filteredCountries = shouldShow
    ? Object.entries(COUNTRIES).filter(([name]) =>
        name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    : [];

  return (
    <Backdrop open={open}>
      <Box sx={{ position: 'relative' }}>
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
        {shouldShow && (
          <Box sx={{ backgroundColor: 'white', p: 1, border: 'var(--border)' }}>
            <Typography sx={{ fontSize: 12 }}>COUNTRIES</Typography>
            <Stack
              sx={{
                maxHeight: '300px',
                // overflow: 'scroll',
              }}
            >
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
                <Typography>+ {filteredCountries.length - 5} countries</Typography>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Backdrop>
  );
}

export default SearchDialog;
