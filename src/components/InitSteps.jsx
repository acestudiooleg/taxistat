import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const InitSteps = ({ steps, activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map(el => (
      <Step key={el.label}>
        <StepLabel>{el.label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

InitSteps.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ).isRequired,
};

export default InitSteps;
