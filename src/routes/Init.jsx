import React, { useState } from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Container, H6, D12 } from "../MyHTML";
import InitSteps from "../components/InitSteps";
import FuelConsumption from "../components/FuelConsumption";
import TaxiServices from "../components/TaxiServices";
import InitNavButtons from "../components/InitNavButtons";

import words from "../translations.json";

const mapStateToProps = state => ({
  a: state
});

const mapDispatchToProps = {
  save: () => 1
};

const steps = [
  {
    name: "fuel",
    label: words["fuel-consumption-label"],
    component: TaxiServices
  },
  {
    name: "services",
    label: words["taxi-services-label"],
    component: TaxiServices
  },
  {
    name: "expenses",
    label: words["expenses-label"],
    component: FuelConsumption
  }
];

const stepNames = ["fuel", "services", "expenses"];

const Init = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    fuel: {},
    services: {},
    expenses: {}
  });

  const saveState = name => data => setState({ ...state, [name]: data });

  const save = () => setActiveStep(step => step + 1);

  const onBack = () => () => setActiveStep(step => step - 1);

  const CurrentStepContent = steps[activeStep].component;

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6>{words["setup"]}</H6>
        </Toolbar>
      </AppBar>
      <Container>
        <D12>
          <InitSteps {...{ steps, activeStep }} />
        </D12>
        <CurrentStepContent
          onBack={onBack}
          onChange={saveState(stepNames[activeStep])}
        />
        <D12>
          <InitNavButtons
            onBack={onBack}
            onNext={save}
            activeStep={activeStep}
            stepsLen={steps.length}
          />
        </D12>
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init);
