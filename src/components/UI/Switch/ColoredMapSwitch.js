import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styles from './ColoredMapSwitch.module.css';

export default function ColoredMapSwitch({ checked, onChange }) {
  return (
    <FormGroup row className={styles.container}>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChange} color="default" />
        }
        label="Show colored map depending on the number of the places I've been to"
      />
    </FormGroup>
  );
}
