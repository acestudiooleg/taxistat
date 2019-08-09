import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Container, H6, D12 } from '../MyHTML';
import InitSteps from '../components/InitSteps';
import FuelConsumption from '../components/FuelConsumption';
import TaxiServices from '../components/TaxiServices';
import InitNavButtons from '../components/InitNavButtons';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

const mapStateToProps = state => ({
  settings: getSettings(state),
});

const mapDispatchToProps = {
  save: actions.save,
};

const steps = [
  {
    name: 'fuel',
    label: 'fuel-consumption-label',
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
    component: FuelConsumption,
  },
];

const stepNames = ['fuel', 'services', 'expenses'];

const Init = ({ settings, save }) => {
  const { t } = useTranslation();
  const [state, setState] = useState(settings);
  const { activeStep } = settings;

  const saveState = (name, data) => setState({ ...state, [name]: data });

  const onNext = () => {
    save({ ...state, activeStep: activeStep + 1 });
  };

  const onBack = () => {
    save({ ...state, activeStep: activeStep - 1 });
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

Init.propTypes = {
  save: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    activeStep: PropTypes.number.isRequired,
    fuel: PropTypes.object.isRequired,
    services: PropTypes.object.isRequired,
    expenses: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Init);
