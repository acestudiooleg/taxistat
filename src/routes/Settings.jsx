import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useTranslation } from 'react-i18next';

import FuelConsumption from '../containers/FuelConsumption';
import Expenses from '../containers/Expenses';
import TaxiServices from '../containers/TaxiServices';

import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import Settings from '../components/Settings';
import Init from '../components/Init';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

import router from '../router';

const SettingsRoute = () => {
  const { t } = useTranslation();

  const steps = [
    {
      name: 'welcome',
      label: t('welcome'),
      component: Welcome,
    },
    {
      name: 'fuel',
      label: t('fuel'),
      component: FuelConsumption,
    },
    {
      name: 'services',
      label: t('taxi-services-label'),
      component: TaxiServices,
    },
    {
      name: 'expenses',
      label: t('expenses-label'),
      component: Expenses,
    },
  ];
  const { activeStep, done } = useSelector(getSettings, shallowEqual);

  const dispatch = useDispatch();

  const save = data => dispatch(actions.save(data));

  const onNext = () => {
    if (activeStep < steps.length - 1) {
      save({ activeStep: activeStep + 1 });
    } else {
      save({ done: true });
      dispatch(push(router.home));
    }
  };

  const onBack = () => save({ activeStep: activeStep - 1 });

  const setStep = (e, step) => save({ activeStep: step });

  return (
    <Layout title={t('settings')} isShowNavigation={done}>
      {done ? (
        <Settings activeStep={activeStep} setStep={setStep} steps={steps} />
      ) : (
        <Init activeStep={activeStep} onBack={onBack} onNext={onNext} steps={steps} />
      )}
    </Layout>
  );
};

export default SettingsRoute;
