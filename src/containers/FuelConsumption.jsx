import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';
import Input from './Input';

import { H5, P, D12 } from '../MyHTML';

import actions from '../actions/settings';
import { getSettings } from '../reducers/settings';

const useStyles = makeStyles(() => ({
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
    fuelConsumption, fuelPrice, timePrice, timePriceEnabled, taxiDriver, currency,
  } = useSelector(
    getSettings,
    shallowEqual,
  );

  const handleChange = name => (event) => {
    const newValues = { [name]: event.target.value };
    dispatch(actions.save(newValues));
  };

  const handleCheckboxChange = name => (a, enabled) => {
    const newValues = { [name]: enabled };
    dispatch(actions.save(newValues));
  };

  return (
    <>
      <D12>
        <H5 align="center">{t('fuel-consumption-title')}</H5>
        <P align="center">{t('fuel-consumption-desc')}</P>
      </D12>
      <form noValidate autoComplete="off">
        <D12 className={classes.container}>
          <Input
            id="currency"
            label={t('currency')}
            defaultValue={currency}
            className={classes.input}
            onChange={handleChange('currency')}
          />
        </D12>
        <D12 className={classes.container}>
          <Input
            id="liters"
            label={t('liters-per-hundred-km')}
            defaultValue={fuelConsumption}
            className={classes.input}
            type="number"
            onChange={handleChange('fuelConsumption')}
            end={t('liters')}
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
            end={currency}
          />
        </D12>
        <D12 className={classes.container}>
          <FormControlLabel
            control={<Switch checked={taxiDriver} onChange={handleChange('taxiDriver')} value={taxiDriver} />}
            label={t('taxi-is-my-main-job')}
          />
        </D12>
        {!taxiDriver && (
          <D12 className={classes.container}>
            <Input
              id="timePrice"
              label={t('time-price')}
              defaultValue={timePrice}
              disabled={!timePriceEnabled}
              className={classes.input}
              type="number"
              onChange={handleChange('timePrice')}
              start={currency}
              end={(
                <Switch
                  checked={timePriceEnabled}
                  onChange={handleCheckboxChange('timePriceEnabled')}
                  defaultValue={timePriceEnabled}
                />
)}
            />
          </D12>
        )}
      </form>
      <D12 />
    </>
  );
};

export default FuelConsumption;
