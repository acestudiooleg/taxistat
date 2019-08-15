import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Input from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';

import { H5, P, D12 } from '../MyHTML';

import actions from '../actions/settings';
import { getSettings } from '../reducers/settings';

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

const FuelConsumption = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = debounce(useDispatch(), 500);
  const {
    fuelConsumption, fuelPrice, timePrice, timePriceEnabled,
  } = useSelector(getSettings, shallowEqual);

  const handleChange = name => (event) => {
    const newValues = { [name]: event.target.value };
    dispatch(actions.save(newValues));
  };

  const handleCheckboxChange = name => (a, enabled) => {
    const newValues = { [name]: enabled };
    dispatch(actions.save(newValues));
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
            defaultValue={fuelConsumption}
            className={classes.input}
            type="number"
            onChange={handleChange('fuelConsumption')}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">{t('liters')}</InputAdornment>,
            }}
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="price"
            label={t('fuel-price-per-liter')}
            defaultValue={fuelPrice}
            className={classes.input}
            type="number"
            onChange={handleChange('fuelPrice')}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">{t('uah')}</InputAdornment>,
            }}
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="timePrice"
            label={t('time-price')}
            defaultValue={timePrice}
            disabled={!timePriceEnabled}
            className={classes.input}
            type="number"
            onChange={handleChange('timePrice')}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">{t('uah')}</InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <Switch
                    checked={timePriceEnabled}
                    onChange={handleCheckboxChange('timePriceEnabled')}
                    defaultValue={timePriceEnabled}
                  />
                </InputAdornment>
              ),
            }}
          />
        </D12>
      </form>
      <D12 />
    </div>
  );
};

export default FuelConsumption;