import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { Container, D12 } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  stepComponent: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 140px)',
  },
  bottomNav: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    width: '100%',
  },
}));

const Settings = ({ steps }) => {
  const classes = useStyles();
  const [activeTab, setTab] = useState(steps[0].name);
  const { component: CurrentStepComponent } = steps.find(el => el.name === activeTab);

  return (
    <Container>
      <D12>
        <BottomNavigation value={activeTab} onChange={(e, name) => setTab(name)} className={classes.bottomNav}>
          {steps.map(el => (
            <BottomNavigationAction key={el.name} label={el.label} value={el.name} icon={<el.icon />} />
          ))}
        </BottomNavigation>
      </D12>

      <div className={classes.stepComponent}>{CurrentStepComponent && <CurrentStepComponent />}</div>
    </Container>
  );
};

Settings.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ).isRequired,
};

export default Settings;
