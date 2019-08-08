import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Delete from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

import words from "../translations.json";
import { Container, D12 } from "../MyHTML";

const useStyles = makeStyles(theme => ({
  input: {
    width: "100%"
  },
  removeButton: {
    backgroundColor: theme.palette.red
  }
}));

const RemoveButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
}))(Fab);

export default ({ fees, onChange, onRemove }) => {
  const classes = useStyles();

  const handleInputChange = name => ({ target: { value } }) => {
    const newState = { ...fees, [name]: { ...fees[name], value } };
    onChange(newState);
  };
  const handleCheckboxChange = name => (a, enabled) => {
    const newState = { ...fees, [name]: { ...fees[name], enabled } };
    onChange(newState);
  };
  return (
    <Container>
      <D12>
        <Input
          label={words["service-fee-per-ride"]}
          value={fees.rideFee}
          className={classes.input}
          type="number"
          onChange={handleInputChange("rideFee")}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>
          }}
        />
      </D12>
      <D12>
        <Input
          label={words["service-fee-per-week"]}
          value={fees.weekFee.value}
          disabled={!fees.weekFee.enabled}
          className={classes.input}
          type="number"
          onChange={handleInputChange("weekFee")}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">грн</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  checked={fees.weekFee.enabled}
                  onChange={handleCheckboxChange("weekFee")}
                  value={fees.weekFee.enabled}
                />
              </InputAdornment>
            )
          }}
        />
      </D12>
      <D12>
        <Input
          label={words["card-fee"]}
          value={fees.cardFee.value}
          disabled={!fees.cardFee.enabled}
          className={classes.input}
          type="number"
          onChange={handleInputChange("cardFee")}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  checked={fees.cardFee.enabled}
                  onChange={handleCheckboxChange("cardFee")}
                  value={fees.cardFee.enabled}
                />
              </InputAdornment>
            )
          }}
        />
      </D12>
      <D12>
        <Container justify="flex-end">
          <RemoveButton onClick={onRemove}>
            <Delete />
          </RemoveButton>
        </Container>
      </D12>
    </Container>
  );
};
