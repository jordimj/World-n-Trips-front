import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CONTINENTS_AND_REGIONS from '../../../constants/continentsAndRegions';
import { WORLD_MAP } from '../../../constants';
import useMapSidebar from '../../../hooks/useMapSidebar';
import Select from '../Select/Select';
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
      <Box className={[styles.sidebar, isVisible && styles.visible].filter(Boolean)}>
        <Typography variant="h3">Map filters</Typography>
        <Select
          label="Continent"
          value={selectedContinent}
          onChange={continentSelectedHandler}
          helper="Continent to display"
        >
          {CONTINENTS_AND_REGIONS.map((continent) => (
            <MenuItem key={continent.code} value={continent.code}>
              {continent.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Region"
          value={selectedRegion}
          onChange={regionSelectedHandler}
          helper="Region to display"
          disabled={selectedContinent === WORLD_MAP}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          {selectedContinent !== WORLD_MAP &&
            CONTINENTS_AND_REGIONS.find(
              (continent) => continent.code === selectedContinent
            ).regions.map((region) => (
              <MenuItem key={region.name} value={region.code}>
                {region.name}
              </MenuItem>
            ))}
        </Select>
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
      </Box>
    </>
  );
}
