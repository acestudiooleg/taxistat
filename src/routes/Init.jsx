import React, { useState } from "react";
import { connect } from "react-redux";

import { Container, D12 } from "../MyHTML";
import InitSteps from "../components/InitSteps";
import FuelConsumption from "../components/FuelConsumption";
import InitNavButtons from "../components/InitNavButtons";

import words from "../translations.json";

const mapStateToProps = state => ({
  a: state
});

const mapDispatchToProps = {
  save: () => 1
};

const steps = [
  words["fuel-consumption-label"],
  words["taxi-services-label"],
  words["expenses-label"]
];

const stepNames = ["fuel", "services", "expenses"];

const makeSteps = (...steps) => index => steps[index];

const Init = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    fuel: {},
    services: {},
    expenses: {}
  });

  const saveState = name => data => {
    setState({ ...state, [name]: data });
  };

  const save = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

  const onBack = () => () =>
    setActiveStep(prevActiveStep => prevActiveStep - 1);

  const getSteps = makeSteps(FuelConsumption);

  const CurrentStepContent = getSteps(activeStep);

  return (
    <Container>
      <D12>
        <InitSteps {...{ steps, activeStep }} />
      </D12>
      <CurrentStepContent
        onBack={onBack}
        onChange={saveState(stepNames[activeStep])}
      />
      <D12>
        <InitNavButtons onBack={onBack} onNext={save} />
      </D12>
    </Container>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init);
