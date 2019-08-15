import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StatIcon from '@material-ui/icons/ShowChart';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LangSwitch from '../components/LangSwitch';
import BottomNav from '../containers/BottomNav';
import { Container, H6, D12 } from '../MyHTML';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

import router from '../router';

const useStyles = makeStyles(theme => ({
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
  const { activeStep } = useSelector(getSettings, shallowEqual);

  const dispatch = useDispatch();

  const save = data => dispatch(actions.save(data));

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6 className={classes.title}>{t('home')}</H6>
          <LangSwitch />
        </Toolbar>
      </AppBar>
      <BottomNav />
    </div>
  );
};

export default Home;
