import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StatIcon from '@material-ui/icons/ShowChart';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import router from '../router';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  bottomNav: {
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
    <BottomNavigation
      value={pathname}
      onChange={(event, newValue) => {
        dispatch(push(newValue));
      }}
      className={classes.bottomNav}
    >
      <BottomNavigationAction label={t('statictics')} value={router.statictics} icon={<StatIcon />} />
      <BottomNavigationAction label={t('home')} value={router.home} icon={<HomeIcon />} />
      <BottomNavigationAction label={t('settings')} value={router.settings} icon={<SettingsIcon />} />
    </BottomNavigation>
  );
};

export default Home;
