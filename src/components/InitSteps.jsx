import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export default ({ steps, activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map(el => (
      <Step key={el.label}>
        <StepLabel>{el.label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);
