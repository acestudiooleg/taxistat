import React from "react";
import Input from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { H5, P, D12 } from "../MyHTML";
import words from "../translations.json";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  input: {
    width: "100%"
  },
  container: {
    padding: 10
  },
  buttons: {
    position: "absolute",
    bottom: 10
  }
}));

export default ({ stepName, onChange }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    liters: 9.5,
    price: 30
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    onChange(stepName, values);
  };

  return (
    <div>
      <D12>
        <H5 align="center">{words["fuel-consumption-title"]}</H5>
        <P align="center">{words["fuel-consumption-desc"]}</P>
      </D12>
      <form noValidate autoComplete="off">
        <D12 className={classes.container}>
          <Input
            id="liters"
            label={words["liters-per-hundred-km"]}
            value={values.liters}
            className={classes.input}
            type="number"
            onChange={handleChange("liters")}
            margin="normal"
            variant="outlined"
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="price"
            label={words["fuel-price-per-liter"]}
            value={values.price}
            className={classes.input}
            type="number"
            onChange={handleChange("price")}
            margin="normal"
            variant="outlined"
          />
        </D12>
      </form>
      <D12 />
    </div>
  );
};
