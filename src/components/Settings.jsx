import React from 'react';
import PropTypes from 'prop-types';
import tail from 'lodash/tail';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { Container, D12 } from '../MyHTML';

const Settings = ({ activeStep, steps, setStep }) => {
  const CurrentStepComponent = steps[activeStep].component;

  const settingsSteps = tail(steps);

  return (
    <Container>
      <D12>
        <AppBar color="secondary" position="static">
          <Tabs variant="fullWidth" indicatorColor="primary" value={activeStep} onChange={setStep}>
            {settingsSteps.map(el => (
              <Tab label={el.label} />
            ))}
          </Tabs>
        </AppBar>
      </D12>

      <CurrentStepComponent />
    </Container>
  );
};

Settings.propTypes = {
  setStep: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default Settings;
