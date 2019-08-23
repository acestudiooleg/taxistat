import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MoneyIcon from '@material-ui/icons/AttachMoney';
import ExpensesIcon from '@material-ui/icons/ShoppingCart';
import CommentsIcon from '@material-ui/icons/Create';
import Divider from '@material-ui/core/Divider';

import Text from './Text';

const useStyles = makeStyles(theme => ({
  listIcon: {
    minWidth: 30,
  },

  divider: {
    color: theme.palette.grey[500],
    marginRight: 5,
    width: 10,
  },
}));

const ExpensesList = ({ expenses }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <List component="nav" aria-label="main mailbox folders">
      {expenses.map(({ expenseName, value, comment }) => (
        <div>
          <ListItem key={expenseName}>
            <ListItemIcon className={classes.listIcon}>
              <ExpensesIcon color="secondary" />
            </ListItemIcon>
            <Text exp label={expenseName} />
            <ListItemIcon className={classes.listIcon}>
              <MoneyIcon color="secondary" />
            </ListItemIcon>
            <Text exp label={value} measure={t('uah')} />
            <ListItemIcon className={classes.listIcon}>
              <CommentsIcon color="secondary" />
            </ListItemIcon>
            <Text exp label={comment} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      expenseName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ExpensesList;
