import React, { useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchWithLabel(props) {
  const [state, setState] = React.useState({
    checkedValue: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    return () => {
      if (props.onChange) {
        props.onChange(!state.checkedValue);
      }
    };
  },[state.checkedValue]);

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedValue}
            onChange={handleChange}
            name="checkedValue"
            color="primary"
          />
        }
        label="Show colored map depending on the number of the places I've been"
      />
    </FormGroup>
  );
}
