import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Layout from '../components/Layout';
import { Container, D11, P } from '../MyHTML';

import router from '../router';

const SpendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))(Button);

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
  spentButton: {
    backgroundColor: theme.palette.error.main,
  },

  buttons: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
  },
}));

const Balance = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const goto = url => () => dispatch(push(url));

  return (
    <Layout title={t('balance')}>
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
      <div className={classes.buttons}>
        <Container spacing={1} justify="center">
          <D11>
            <Button fullWidth onClick={goto(router.earn)} variant="contained" color="primary">
              {t('earned')}
            </Button>
          </D11>
          <D11>
            <SpendButton fullWidth onClick={goto(router.spend)} variant="contained">
              {t('spent')}
            </SpendButton>
          </D11>
        </Container>
      </div>
    </Layout>
  );
};

export default Balance;
