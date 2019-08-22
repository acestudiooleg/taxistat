import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StatIcon from '@material-ui/icons/ShowChart';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import SettingsIcon from '@material-ui/icons/Settings';

import router from '../router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bottomNav: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const pathname = useSelector(state => get(state, 'router.location.pathname') || '');

  return (
    <div>
      <BottomNavigation
        value={pathname}
        onChange={(event, newValue) => {
          dispatch(push(newValue));
        }}
        className={classes.bottomNav}
      >
        <BottomNavigationAction label={t('statistics')} value={router.statistics} icon={<StatIcon />} />
        <BottomNavigationAction label={t('balance')} value={router.balance} icon={<DirectionsCarIcon />} />
        <BottomNavigationAction label={t('settings')} value={router.settings} icon={<SettingsIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Home;
