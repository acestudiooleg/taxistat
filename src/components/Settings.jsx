import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swipe from 'react-easy-swipe';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { Container, D12 } from '../MyHTML';
import { goToBalance } from '../router';

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
  const dispatch = useDispatch();
  const [activeTabNum, setTabNum] = useState(0);
  const { component: CurrentStepComponent } = steps[activeTabNum];

  const swipeLeft = () => {
    if (activeTabNum < steps.length) {
      setTabNum(activeTabNum + 1);
    }
  };

  const swipeRight = () => {
    if (activeTabNum > 0) {
      setTabNum(activeTabNum - 1);
    } else {
      goToBalance(dispatch);
    }
  };

  return (
    <Swipe onSwipeLeft={swipeLeft} onSwipeRight={swipeRight}>
      <Container>
        <D12>
          <BottomNavigation value={activeTabNum} onChange={(e, name) => setTabNum(name)} className={classes.bottomNav}>
            {steps.map((el, index) => (
              <BottomNavigationAction key={el.name} label={el.label} value={index} icon={<el.icon />} />
            ))}
          </BottomNavigation>
        </D12>

        <div className={classes.stepComponent}>{CurrentStepComponent && <CurrentStepComponent />}</div>
      </Container>
    </Swipe>
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
