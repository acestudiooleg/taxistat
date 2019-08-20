import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useTranslation } from 'react-i18next';

import { Container, D12 } from '../MyHTML';
import Welcome from '../components/Welcome';
import InitSteps from '../components/InitSteps';
import InitNavButtons from '../components/InitNavButtons';

import FuelConsumption from '../containers/FuelConsumption';
import Expenses from '../containers/Expenses';
import TaxiServices from '../containers/TaxiServices';
import Layout from '../components/Layout';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

import router from '../router';

const steps = [
  {
    name: 'welcome',
    label: 'welcome',
    component: Welcome,
  },
  {
    name: 'fuel',
    label: 'fuel',
    component: FuelConsumption,
  },
  {
    name: 'services',
    label: 'taxi-services-label',
    component: TaxiServices,
  },
  {
    name: 'expenses',
    label: 'expenses-label',
    component: Expenses,
  },
];

const Settings = () => {
  const { t } = useTranslation();
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

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Layout title={t('settings')} isShowNavigation={done}>
      <Container>
        <D12>
          Use tabs when init is done
          <InitSteps steps={steps.map(el => ({ ...el, label: t(el.label) }))} activeStep={activeStep} />
        </D12>
        <CurrentStepComponent />
        {!done && (
          <D12>
            <InitNavButtons onBack={onBack} onNext={onNext} activeStep={activeStep} stepsLen={steps.length} />
          </D12>
        )}
      </Container>
    </Layout>
  );
};

export default Settings;
