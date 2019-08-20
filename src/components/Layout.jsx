import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LangSwitch from './LangSwitch';
import BottomNav from '../containers/BottomNav';
import { H6 } from '../MyHTML';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ title, children, isShowNavigation }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6 className={classes.title}>{title}</H6>
          <LangSwitch />
        </Toolbar>
      </AppBar>
      {children}
      {isShowNavigation && <BottomNav />}
    </div>
  );
};

Layout.defaultProps = {
  isShowNavigation: true,
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isShowNavigation: PropTypes.bool,
};

export default Layout;
