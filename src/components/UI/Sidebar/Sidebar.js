import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as actions from '../../../actions/actions';
import CONTINENTS_AND_REGIONS from '../../../constants/continentsAndRegions';
import { WORLD_MAP } from '../../../constants';
import styles from './sidebar.module.css';

export default function MapSidebar() {
  const worldMapConf = useSelector((state) => state.worldMapConf);
  const { graduallyColored, selectedContinent, selectedRegion } = worldMapConf;

  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const toggleSidebar = () => setActive(!active);
  const toggleColoring = () => dispatch(actions.toggleGradualColoring());
  const continentSelectedHandler = (e) =>
    dispatch(actions.setSelectedContinent(e.target.value));
  const regionSelectedHandler = (e) =>
    dispatch(actions.setSelectedRegion(e.target.value));

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
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        <ViewSidebarIcon fontSize="large" />
        <Typography>Open filter sidebar</Typography>
      </div>
      <nav className={`${styles.sidebar} ${active && styles.active}`}>
        <Typography variant="h3">Some filters</Typography>
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
            Continent to be shown
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
            Region to be shown
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

        <div>
          <CloseIcon onClick={toggleSidebar} sx={{ fontSize: '60px' }} />
        </div>
      </nav>
    </>
  );
}
