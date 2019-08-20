import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { Container, D12 } from '../MyHTML';

const useStyles = makeStyles(() => ({
  stepComponent: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 140px)',
  },
}));

const Settings = ({ activeStep, steps, setStep }) => {
  const classes = useStyles();
  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Container>
      <D12>
        <AppBar color="secondary" position="static">
          <Tabs variant="fullWidth" indicatorColor="primary" value={activeStep} onChange={setStep}>
            {steps.map(el => (
              <Tab key={el.label} label={el.label} />
            ))}
          </Tabs>
        </AppBar>
      </D12>

      <div className={classes.stepComponent}>
        <CurrentStepComponent />
      </div>
    </Container>
  );
};

Settings.propTypes = {
  setStep: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ).isRequired,
};

export default Settings;
