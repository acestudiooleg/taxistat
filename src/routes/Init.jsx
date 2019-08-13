import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Container, H6, D12 } from '../MyHTML';
import Welcome from '../components/Welcome';
import InitSteps from '../components/InitSteps';
import FuelConsumption from '../components/FuelConsumption';
import TaxiServices from '../components/TaxiServices';
import Expenses from '../components/Expenses';
import { ServiceType } from '../components/ServiceForm';
import InitNavButtons from '../components/InitNavButtons';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

const mapStateToProps = state => ({
  ...getSettings(state),
});

const mapDispatchToProps = {
  save: actions.save,
};

const steps = [
  {
    name: 'welcome',
    label: 'welcome',
  },
  {
    name: 'fuel',
    label: 'fuel',
  },
  {
    name: 'services',
    label: 'taxi-services-label',
  },
  {
    name: 'expenses',
    label: 'expenses-label',
  },
];

const Init = ({
  fuelConsumption, fuelPrice, services, expenses, activeStep, save,
}) => {
  const { t } = useTranslation();
  const settings = {
    fuelConsumption,
    fuelPrice,
    services,
    expenses: expenses.map(el => ({ ...el, name: t(el.name) })),
    activeStep,
  };
  const [state, setState] = useState(settings);

  const saveState = (name, data) => setState({ ...state, [name]: data });

  const onNext = () => {
    save({ ...state, activeStep: activeStep + 1 });
  };

  const onBack = () => {
    save({ ...state, activeStep: activeStep - 1 });
  };

  const stepsComponents = [
    () => <Welcome />,
    () => (
      <FuelConsumption
        fuelPrice={settings.fuelPrice}
        fuelConsumption={settings.fuelConsumption}
        services={services}
        stepName={steps[activeStep].name}
        onChange={saveState}
      />
    ),
    () => <TaxiServices services={services} stepName={steps[activeStep].name} onChange={saveState} />,
    () => <Expenses expenses={expenses} stepName={steps[activeStep].name} onChange={saveState} />,
  ];

  const currentStepComponent = stepsComponents[activeStep];

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
        {currentStepComponent()}
        <D12>
          <InitNavButtons onBack={onBack} onNext={onNext} activeStep={activeStep} stepsLen={steps.length} />
        </D12>
      </Container>
    </div>
  );
};

Init.propTypes = {
  save: PropTypes.func.isRequired,
  fuelConsumption: PropTypes.number.isRequired,
  fuelPrice: PropTypes.number.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      ServiceType,
    }),
  ).isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Init);
