import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import styles from './sidebar.module.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MapSidebar() {
  const [active, setActive] = useState(false);
  const toggleSidebar = () => setActive(!active);

  return (
    <>
      <ViewSidebarIcon onClick={toggleSidebar} />
      <Typography>Open filter sidebar</Typography>
      <nav className={`${styles.sidebar} ${active && styles.active}`}>
        <Typography variant="h3">Some filters</Typography>
        <FormControl className={styles.root}>
          <InputLabel id="continent-select-label" className={styles.text}>
            Continent
          </InputLabel>
          <Select
            labelId="continent-select-label"
            id="continent-select"
            className={styles.select}
          >
            <MenuItem key="all" value="all">
              All
            </MenuItem>
          </Select>
          <FormHelperText className={styles.formHelperText}>
            Continent to be shown
          </FormHelperText>
        </FormControl>

        <FormControl className={styles.root}>
          <InputLabel id="region-helper-label" className={styles.text}>
            Region
          </InputLabel>
          <Select
            labelId="region-helper-label"
            id="region-helper"
            className={styles.select}
          >
            <MenuItem key="all" value="all">
              All
            </MenuItem>
          </Select>
          <FormHelperText className={styles.formHelperText}>
            Region to be shown
          </FormHelperText>
        </FormControl>

        <FormControlLabel
          control={<Switch defaultChecked color="default" />}
          label="Colour the map according to the number of places I've been to"
        />

        <div>
          <CloseIcon onClick={toggleSidebar} sx={{ fontSize: '60px' }} />
        </div>
      </nav>
    </>
  );
}
