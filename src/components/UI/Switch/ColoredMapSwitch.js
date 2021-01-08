import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function ColoredMapSwitch({ checked, onChange }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChange} color="default" />
        }
        label="Show colored map depending on the number of the places I've been to"
      />
    </FormGroup>
  );
}
