import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Container, H6, D12 } from '../MyHTML';
import Welcome from '../components/Welcome';
import InitSteps from '../components/InitSteps';
import InitNavButtons from '../components/InitNavButtons';
import LangSwitch from '../components/LangSwitch';

import FuelConsumption from '../containers/FuelConsumption';
import Expenses from '../containers/Expenses';
import TaxiServices from '../containers/TaxiServices';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Init = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { activeStep } = useSelector(getSettings, shallowEqual);

  const dispatch = useDispatch();

  const save = data => dispatch(actions.save(data));

  const onNext = () => save({ activeStep: activeStep + 1 });

  const onBack = () => save({ activeStep: activeStep - 1 });

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6 className={classes.title}>{t('setup')}</H6>
          <LangSwitch />
        </Toolbar>
      </AppBar>
      <Container>
        <D12>
          <InitSteps steps={steps.map(el => ({ ...el, label: t(el.label) }))} activeStep={activeStep} />
        </D12>
        <CurrentStepComponent />
        <D12>
          <InitNavButtons onBack={onBack} onNext={onNext} activeStep={activeStep} stepsLen={steps.length} />
        </D12>
      </Container>
    </div>
  );
};

export default Init;
