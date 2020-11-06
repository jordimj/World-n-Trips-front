import React, { useEffect, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function ColoredMapSwitch({ onChange }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((checked) => !checked);
  };

  useEffect(() => {
    return onChange(checked);
  }, [checked]);

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            name="checked"
            color="primary"
          />
        }
        label="Show colored map depending on the number of the places I've been to"
      />
    </FormGroup>
  );
}
