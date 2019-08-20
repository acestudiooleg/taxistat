import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { P } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  negativeValue: {
    color: theme.palette.error.main,
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
}));

const Row = ({ icon, title, value }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell className={classes.tableCell} component="th" scope="row">
        <ListItem>
          <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
          <P variant="subtitle2" className={classes.label}>
            {title}
            {':'}
          </P>
        </ListItem>
      </TableCell>
      <TableCell align="right">
        <P variant="subtitle2" className={cx({ [classes.negativeValue]: value < 0 })}>
          {value}
          {t('uah')}
        </P>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

const BalanceTotal = ({
  earn, balance, expenses, earnToday,
}) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableBody>
        <Row title={t('earn')} icon={<AttachMoneyIcon color="primary" />} value={earn} />
        <Row title={t('balance')} icon={<AccountBalanceWalletIcon color="primary" />} value={balance} />
        <Row title={t('expenses')} icon={<DirectionsCarIcon color="primary" />} value={expenses} />
        <Row title={t('earn-today')} icon={<CalendarTodayIcon color="primary" />} value={earnToday} />
      </TableBody>
    </Table>
  );
};

BalanceTotal.propTypes = {
  earn: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  earnToday: PropTypes.number.isRequired,
};

export default BalanceTotal;
