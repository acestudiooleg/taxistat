import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LangSwitch from '../components/LangSwitch';
import BottomNav from '../containers/BottomNav';
import {
  Container, H6, Item, H2, H3, D12, D6, D8, P,
} from '../MyHTML';

import actions from '../actions/settings';

import { getSettings } from '../reducers/settings';

const useStyles = makeStyles(theme => ({
  list: {
    width: 260,
    display: 'flex',
  },
  listIcon: {
    minWidth: 30,
  },
  tableCell: {
    padding: 0,
  },
  label: {
    color: theme.palette.primary.main,
    marginRight: 10,
    width: 100,
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

const Balance = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { activeStep } = useSelector(getSettings, shallowEqual);

  const dispatch = useDispatch();

  const save = data => dispatch(actions.save(data));

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6 className={classes.title}>{t('balance')}</H6>
          <LangSwitch />
        </Toolbar>
      </AppBar>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell} component="th" scope="row">
              <ListItem>
                <ListItemIcon className={classes.listIcon}>
                  <AttachMoneyIcon color="primary" />
                </ListItemIcon>
                <P variant="subtitle2" className={classes.label}>
                  {t('earn')}
:
                </P>
              </ListItem>
            </TableCell>
            <TableCell align="right">
              <P variant="subtitle2">
                16632.00
                {t('uah')}
              </P>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableCell} component="th" scope="row">
              <ListItem>
                <ListItemIcon className={classes.listIcon}>
                  <AccountBalanceWalletIcon color="primary" />
                </ListItemIcon>
                <P variant="subtitle2" className={classes.label}>
                  {t('balance')}
:
                </P>
              </ListItem>
            </TableCell>
            <TableCell align="right">
              <P variant="subtitle2">
                -5528.00
                {t('uah')}
              </P>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableCell} component="th" scope="row">
              <ListItem>
                <ListItemIcon className={classes.listIcon}>
                  <DirectionsCarIcon color="primary" />
                </ListItemIcon>
                <P variant="subtitle2" className={classes.label}>
                  {t('expenses')}
:
                </P>
              </ListItem>
            </TableCell>
            <TableCell align="right">
              <P variant="subtitle2">
                7191.00
                {t('uah')}
              </P>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableCell} component="th" scope="row">
              <ListItem>
                <ListItemIcon className={classes.listIcon}>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <P variant="subtitle2" className={classes.label}>
                  {t('earn-today')}
:
                </P>
              </ListItem>
            </TableCell>
            <TableCell align="right">
              <P variant="subtitle2">
                168.01
                {t('uah')}
              </P>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <BottomNav />
    </div>
  );
};

export default Balance;
