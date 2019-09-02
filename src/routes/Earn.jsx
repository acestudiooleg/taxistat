import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import GoodProfitIcon from '@material-ui/icons/Mood';
import BadProfitIcon from '@material-ui/icons/MoodBad';
import NormalProfitIcon from '@material-ui/icons/SentimentSatisfied';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import DateInput from '../containers/Date';
import Input from '../containers/Input';

import Layout from '../components/Layout';
import ChooseTaxiService from '../components/ChooseTaxiService';
import ChoosePayType from '../components/ChoosePayType';
import Table from '../components/Table';

import { getTaxiServices } from '../reducers/taxiServices';
import { getSettings } from '../reducers/settings';

import actions from '../actions/rides';

import { Container, D12, D11 } from '../MyHTML';
import { PayTypes } from '../constants';
import { calcProfit, calcTotal, calcPercent } from '../utils';

import { goToBalance } from '../router';

const useStyles = makeStyles(theme => ({
  content: {
    position: 'relative',
    height: '100%',
    minHeight: 700,
  },
  buttons: {
    marginTop: 15,
    width: '100%',
  },

  radios: {
    display: 'flex',
  },
  row: {
    margin: '0 20px',
  },
  input: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const Earn = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { list: services, hasData: hasServices } = useSelector(getTaxiServices, shallowEqual);
  const settings = useSelector(getSettings, shallowEqual);

  const [state, setState] = useState({
    init: false,
    distance: null,
    serviceId: 1,
    timestamp: new Date(),
    payType: PayTypes.Cash,
    rideTime: null,
    money: null,
    moneyCard: null,
    tips: null,
  });

  if (!state.init && hasServices) {
    setState({ ...state, init: true, serviceId: services[0].ID });
  }

  const dispatch = useDispatch();

  const setData = key => ({ target: { value } }) => setState({ ...state, [key]: value });
  const handleDate = timestamp => setState({ ...state, timestamp });

  const isBoth = state.payType === PayTypes.CardAndCash;

  const total = calcTotal(state);
  let profit = 0;

  if (state.init && settings.hasData && hasServices) {
    profit = calcProfit({
      ...state,
      settings,
      services,
    });
  }

  const percent = calcPercent(profit, total).toFixed();

  let profitIcon = <GoodProfitIcon color="primary" />;

  if (percent < 50) {
    profitIcon = <NormalProfitIcon color="primary" />;
  }

  if (percent < 20) {
    profitIcon = <BadProfitIcon color="error" />;
  }

  const save = () => {
    if (state.money && state.distance) {
      dispatch(
        actions.add({
          ...state,
          profit,
          money: total,
        }),
      );
    } else {
      window.alert(t('ride-data-validation-error'));
    }
  };

  const rows = [
    {
      title: t('total'),
      icon: <EqualizerIcon color="primary" />,
      value: total,
      ms: settings.currency,
    },
    {
      title: `${t('profit')} (${percent}%)`,
      icon: profitIcon,
      value: profit,
      ms: settings.currency,
    },
  ];

  const makeInput = (label, key, end, value) => (
    <Input label={t(label)} defaultValue={value} type="number" onChange={setData(key)} end={end} />
  );

  return (
    <Layout title={t('earned')}>
      <div className={classes.content}>
        <div className={classes.radios}>
          <FormControl component="fieldset" className={classes.formControl}>
            <ChooseTaxiService
              services={services}
              serviceId={Number(state.serviceId)}
              onChange={setData('serviceId')}
            />
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <ChoosePayType selected={state.payType} onChange={setData('payType')} />
          </FormControl>
        </div>
        <Container>
          <D12 className={classes.row}>
            <DateInput label={t('date')} className={classes.datepicker} value={state.timestamp} onChange={handleDate} />
          </D12>
          <D12 className={classes.row}>
            {makeInput(isBoth ? 'cash' : state.payType, 'money', settings.currency, state.money)}
          </D12>
          {isBoth && (
            <D12 className={classes.row}>{makeInput('card', 'moneyCard', settings.currency, state.moneyCard)}</D12>
          )}
          <D12 className={classes.row}>{makeInput('distance', 'distance', settings.distanceName, state.distance)}</D12>
          <D12 className={classes.row}>{makeInput('tips', 'tips', settings.currency, state.tips)}</D12>
          {settings.timePriceEnabled && (
            <D12 className={classes.row}>{makeInput('ride-time', 'minutes', 'minutes', state.minutes)}</D12>
          )}
          {state.money && (
            <D12 className={classes.row}>
              <Table rows={rows} />
            </D12>
          )}
        </Container>
        <div className={classes.buttons}>
          <Container spacing={1} justify="center">
            <D11>
              <Button fullWidth onClick={save} variant="contained" color="primary">
                {t('save')}
              </Button>
            </D11>
            <D11>
              <Button fullWidth onClick={() => goToBalance(dispatch)} color="secondary" variant="contained">
                {t('back')}
              </Button>
            </D11>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Earn;
