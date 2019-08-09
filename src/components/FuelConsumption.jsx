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

const FuelConsumption = ({ stepName, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    liters: 9.5,
    price: 30,
  });

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
    onChange(stepName, values);
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
            value={values.liters}
            className={classes.input}
            type="number"
            onChange={handleChange('liters')}
            margin="normal"
            variant="outlined"
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="price"
            label={t('fuel-price-per-liter')}
            value={values.price}
            className={classes.input}
            type="number"
            onChange={handleChange('price')}
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
  stepName: PropTypes.string.isRequired,
};

export default FuelConsumption;
