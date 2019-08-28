import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import WelcomeIcon from '@material-ui/icons/PanTool';
import FuelConsumptionIcon from '@material-ui/icons/LocalGasStation';
import TaxiServicesIcon from '@material-ui/icons/LocalTaxi';
import ExpensesIcon from '@material-ui/icons/ShoppingCart';
import BackupIcon from '@material-ui/icons/Save';

import FuelConsumption from '../containers/FuelConsumption';
import Expenses from '../containers/Expenses';
import TaxiServices from '../containers/TaxiServices';
import Backup from '../containers/Backup';

import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import Settings from '../components/Settings';
import Init from '../components/Init';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

const SettingsRoute = () => {
  const { t } = useTranslation();

  const steps = [
    {
      name: 'welcome',
      label: t('welcome'),
      component: Welcome,
      icon: WelcomeIcon,
    },
    {
      name: 'backup',
      label: t('backup'),
      component: Backup,
      icon: BackupIcon,
    },
    {
      name: 'settings',
      label: t('settings'),
      component: FuelConsumption,
      icon: FuelConsumptionIcon,
    },
    {
      name: 'services',
      label: t('taxi-services-label'),
      component: TaxiServices,
      icon: TaxiServicesIcon,
    },
    {
      name: 'expenses',
      label: t('expenses-label'),
      component: Expenses,
      icon: ExpensesIcon,
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
