import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CONTINENTS_AND_REGIONS from '../../../constants/continentsAndRegions';
import { WORLD_MAP } from '../../../constants';
import useMapSidebar from '../../../hooks/useMapSidebar';
import styles from './sidebar.module.css';

export default function MapSidebar() {
  const {
    isVisible,
    worldMapConf: { graduallyColored, selectedContinent, selectedRegion },
    toggleSidebar,
    toggleColoring,
    continentSelectedHandler,
    regionSelectedHandler,
  } = useMapSidebar();

  const continentSelectOptions = CONTINENTS_AND_REGIONS.map((continent) => (
    <MenuItem key={continent.name} value={continent.code}>
      {continent.name}
    </MenuItem>
  ));

  const regionSelectOptions =
    selectedContinent === WORLD_MAP
      ? [
          <MenuItem key="all" value="all">
            All
          </MenuItem>,
        ]
      : [
          <MenuItem key="all" value="all">
            All
          </MenuItem>,
          ...CONTINENTS_AND_REGIONS.find(
            (continent) => continent.code === selectedContinent
          ).regions.map((region) => (
            <MenuItem key={region.name} value={region.code}>
              {region.name}
            </MenuItem>
          )),
        ];

  return (
    <>
      <IconButton
        size="large"
        title={`${isVisible ? 'Close' : 'Open'} sidebar`}
        className={styles.toggleButton}
        onClick={toggleSidebar}
      >
        <ViewSidebarIcon fontSize="large" />
      </IconButton>
      <nav
        className={[styles.sidebar, isVisible && styles.visible]
          .filter(Boolean)
          .join(' ')}
      >
        <Typography variant="h3">Map filters</Typography>
        <FormControl>
          <InputLabel id="continent-select-label" className={styles.text}>
            Continent
          </InputLabel>
          <Select
            labelId="continent-select-label"
            id="continent-select"
            className={styles.select}
            value={selectedContinent}
            onChange={continentSelectedHandler}
          >
            {continentSelectOptions}
          </Select>
          <FormHelperText className={styles.formHelperText}>
            Continent to display
          </FormHelperText>
        </FormControl>

        <FormControl disabled={selectedContinent === WORLD_MAP}>
          <InputLabel id="region-helper-label" className={styles.text}>
            Region
          </InputLabel>
          <Select
            labelId="region-helper-label"
            id="region-helper"
            className={styles.select}
            value={selectedRegion}
            onChange={regionSelectedHandler}
          >
            {regionSelectOptions}
          </Select>
          <FormHelperText className={styles.formHelperText}>
            Region to display
          </FormHelperText>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              color="default"
              checked={graduallyColored}
              onChange={toggleColoring}
            />
          }
          label="Colour the map according to the number of places I've been to"
        />

        <IconButton
          aria-label="close"
          title="Close sidebar"
          onClick={toggleSidebar}
          sx={{ fontSize: '80px', width: 'fit-content', alignSelf: 'center' }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </nav>
    </>
  );
}
