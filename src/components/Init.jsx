import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { Container, D12 } from '../MyHTML';
import InitSteps from './InitSteps';
import InitNavButtons from './InitNavButtons';

const useStyles = makeStyles(() => ({
  stepComponent: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 221px)',
  },
}));

const Init = ({
  activeStep, steps, onNext, onBack,
}) => {
  const classes = useStyles();
  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Container>
      <D12>
        <InitSteps steps={steps} activeStep={activeStep} />
      </D12>
      <div className={classes.stepComponent}>
        <CurrentStepComponent />
      </div>

      <D12>
        <InitNavButtons onBack={onBack} onNext={onNext} activeStep={activeStep} stepsLen={steps.length} />
      </D12>
    </Container>
  );
};

Init.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ).isRequired,
};

export default Init;
