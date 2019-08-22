import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { ExpenseType } from './ExpenseForm';

const useStyles = makeStyles(theme => ({
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const ChooseExpenseType = ({ expenses, expenseId, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <FormLabel component="legend">{t('expense')}</FormLabel>
      <RadioGroup className={classes.group} value={String(expenseId)} onChange={onChange}>
        {expenses.map(el => (
          <FormControlLabel key={el.name} value={String(el.ID)} control={<Radio />} label={el.name} />
        ))}
      </RadioGroup>
    </>
  );
};

ChooseExpenseType.propTypes = {
  expenses: PropTypes.arrayOf(ExpenseType).isRequired,
  onChange: PropTypes.func.isRequired,
  expenseId: PropTypes.number.isRequired,
};

export default ChooseExpenseType;
