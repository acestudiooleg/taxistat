import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { H5, P, D12 } from '../MyHTML';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
  },
  input: {
    width: '100%',
  },
  container: {
    padding: 10,
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
  },
}));

const FuelConsumption = ({ fuelConsumption, fuelPrice, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChange = name => (event) => {
    const newValues = { fuelConsumption, fuelPrice, [name]: event.target.value };
    onChange(newValues);
  };

  return (
    <div>
      <D12>
        <H5 align="center">{t('fuel-consumption-title')}</H5>
        <P align="center">{t('fuel-consumption-desc')}</P>
      </D12>
      <form noValidate autoComplete="off">
        <D12 className={classes.container}>
          <Input
            id="liters"
            label={t('liters-per-hundred-km')}
            value={fuelConsumption}
            className={classes.input}
            type="number"
            onChange={handleChange('fuelConsumption')}
            margin="normal"
            variant="outlined"
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="price"
            label={t('fuel-price-per-liter')}
            value={fuelPrice}
            className={classes.input}
            type="number"
            onChange={handleChange('fuelPrice')}
            margin="normal"
            variant="outlined"
          />
        </D12>
      </form>
      <D12 />
    </div>
  );
};

FuelConsumption.propTypes = {
  onChange: PropTypes.func.isRequired,
  fuelPrice: PropTypes.number.isRequired,
  fuelConsumption: PropTypes.number.isRequired,
};

export default FuelConsumption;
