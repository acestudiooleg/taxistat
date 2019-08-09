import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Container, H6, D12 } from '../MyHTML';
import InitSteps from '../components/InitSteps';
import FuelConsumption from '../components/FuelConsumption';
import TaxiServices from '../components/TaxiServices';
import InitNavButtons from '../components/InitNavButtons';

const mapStateToProps = state => ({
  a: state,
});

const mapDispatchToProps = {
  save: () => 1,
};

const steps = [
  {
    name: 'fuel',
    label: 'fuel-consumption-label',
    component: TaxiServices,
  },
  {
    name: 'services',
    label: 'taxi-services-label',
    component: TaxiServices,
  },
  {
    name: 'expenses',
    label: 'expenses-label',
    component: FuelConsumption,
  },
];

const stepNames = ['fuel', 'services', 'expenses'];

const checkUnsavedService = (state, t) => {
  if (!state.unsavedService) {
    return false;
  }
  return !window.confirm(t('reset-unsaved-service-confirmation'));
};

const Init = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    fuel: {},
    services: {},
    expenses: {},
  });

  const saveState = (name, data) => setState({ ...state, [name]: data });

  const onNext = () => {
    const isKeepUnsavedService = checkUnsavedService(state, t);
    if (isKeepUnsavedService) {
      return;
    }
    setState({ ...state, unsavedService: false });
    setActiveStep(step => step + 1);
  };

  const onBack = () => {
    const isKeepUnsavedService = checkUnsavedService(state, t);
    if (isKeepUnsavedService) {
      return;
    }
    setState({ ...state, unsavedService: false });
    setActiveStep(step => step - 1);
  };

  const CurrentStepContent = steps[activeStep].component;

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6>{t('setup')}</H6>
        </Toolbar>
      </AppBar>
      <Container>
        <D12>
          <InitSteps steps={steps.map(el => ({ ...el, label: t(el.label) }))} activeStep={activeStep} />
        </D12>
        <CurrentStepContent stepName={stepNames[activeStep]} onChange={saveState} />
        <D12>
          <InitNavButtons onBack={onBack} onNext={onNext} activeStep={activeStep} stepsLen={steps.length} />
        </D12>
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Init);
