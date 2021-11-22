import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import styles from './ColoredMapSwitch.module.css';

export default function ColoredMapSwitch({ checked, onChange }) {
  return (
      <FormGroup row className={styles.container}>
          <FormControlLabel control={<Switch defaultChecked checked={checked} onChange={onChange} color="default" />} label="Colour the map according to the number of places I've been to" />
      </FormGroup>
  );
}
