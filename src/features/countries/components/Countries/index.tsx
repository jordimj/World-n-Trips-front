import { ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { DATABASE_REGIONS } from '@/constants/continentsAndRegions';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import { Continent, Region } from '@/features/countries/model/country.schema';
import SearchInput from '@/template/components/SearchInput';
import Select from '@/template/components/Select/Select';
import CountryBox from './CountryBox';
import styles from './index.module.css';

function Countries() {
  const [selectedContinents, setSelectedContinents] = useState<Array<Continent>>([]);
  const [selectedRegions, setSelectedRegions] = useState<Array<Region>>([]);
  const [keyword, setKeyword] = useState('');

  const { data: visitedCountries, isLoading } = useVisitedCountries();
  const navigate = useNavigate();

  const onCountryClick = (countryName: string) => navigate(`/countries/${countryName}/`);

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const onContinentChange = (e: SelectChangeEvent<typeof selectedContinents>) => {
    if (typeof e.target.value === 'string') return;
    setSelectedContinents(e.target.value);
  };

  const onRegionChange = (e: SelectChangeEvent<typeof selectedRegions>) => {
    if (typeof e.target.value === 'string') return;
    setSelectedRegions(e.target.value);
  };

  const filteredCountries = visitedCountries?.filter((country) => {
    if (selectedContinents.length === 0 && selectedRegions.length === 0)
      return country.name.toLowerCase().includes(keyword);

    if (selectedContinents.length > 0 && selectedRegions.length === 0)
      return (
        country.name.toLowerCase().includes(keyword) &&
        selectedContinents.includes(country.continent)
      );

    return country.name.toLowerCase().includes(keyword) && selectedRegions.includes(country.region);
  });

  return (
    <Fragment>
      <Typography variant="h1">Countries I've been to</Typography>
      <Stack direction="row" gap={2} sx={{ m: 2 }}>
        <Select.Multiple label="Continent" value={selectedContinents} onChange={onContinentChange}>
          {(Object.keys(DATABASE_REGIONS) as Array<Continent>).map((continent) => (
            <MenuItem key={continent} value={continent}>
              <Checkbox checked={selectedContinents.indexOf(continent) > -1} />
              <ListItemText primary={continent} />
            </MenuItem>
          ))}
        </Select.Multiple>
        <Select.Multiple
          label="Region"
          value={selectedRegions}
          onChange={onRegionChange}
          disabled={selectedContinents.length === 0}
        >
          {selectedContinents
            .map((continent) => [
              <ListSubheader key={continent}>{continent}</ListSubheader>,
              DATABASE_REGIONS[continent].map((region) => (
                <MenuItem key={region} value={region}>
                  <Checkbox checked={selectedRegions.indexOf(region) > -1} />
                  <ListItemText primary={region} />
                </MenuItem>
              )),
            ])
            .flat()}
        </Select.Multiple>
        <SearchInput placeholder="Filter by name" onChange={onInputChange} />
      </Stack>
      <section className={styles.countries}>
        {visitedCountries?.length === 0 && !isLoading ? (
          <Typography>Something went wrong!</Typography>
        ) : (
          filteredCountries?.map((country) => (
            <CountryBox
              key={country.alpha3code}
              name={country.name}
              onClick={() => onCountryClick(country.alpha3code)}
            />
          ))
        )}
      </section>
    </Fragment>
  );
}

export default Countries;
