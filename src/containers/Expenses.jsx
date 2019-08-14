import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccBody from '@material-ui/core/ExpansionPanelDetails';
import AccHead from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ExpenseForm from '../components/ExpenseForm';
import { Container, P } from '../MyHTML';
import { getExpensesSettings } from '../reducers/expensesSettings';
import actions from '../actions/expensesSettings';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 240px)',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  input: {
    width: '100%',
  },
  fab: {
    margin: 20,
  },
}));

const Expenses = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const dispatch = useDispatch();

  const { list } = useSelector(getExpensesSettings, shallowEqual);

  const expenses = list.map(el => ({ ...el, name: t(el.name) }));

  const [expanded, setExpanded] = useState(false);

  const [expensesState, setExpenses] = useState(expenses);

  const showAddButton = expensesState.every(el => el.name !== expanded && !el.isNew);

  const handleService = name => (data) => {
    const newExpenses = expensesState.map((el) => {
      if (el.name === name) {
        return data;
      }
      return el;
    });
    setExpenses(newExpenses);
  };

  const handleAccordionChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const addExpenses = () => {
    const newServices = [
      ...expenses,
      {
        name: t('new-expense-name'),
        newName: t('expense-name'),
        commentsEnabled: false,
      },
    ];
    setExpenses(newServices);
    setExpanded(t('new-expenses-name'));
  };

  const saveNewExpenses = () => dispatch(
    actions.save(
      expensesState.map((el) => {
        if (el.isNew) {
          return omit({ ...el, name: el.newName }, ['isNew', 'newName']);
        }
        return el;
      }),
    ),
  );

  const removeExpenses = name => () => {
    const isDelete = window.confirm(t('remove-expense-confirmation', { name }));
    if (isDelete) {
      alert(t('remove-expense-success', { name }));
      setExpenses(expenses.filter(el => el.name !== name));
    }
  };

  return (
    <div className={classes.root}>
      {expenses.map(el => (
        <Accordion key={el.name} expanded={expanded === el.name} onChange={handleAccordionChange(el.name)}>
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P className={classes.heading}>{el.name}</P>
          </AccHead>
          <AccBody>
            <ExpenseForm
              expense={el}
              onChange={handleService(el.name)}
              onRemove={removeExpenses(el.name)}
              onSave={saveNewExpenses}
            />
          </AccBody>
        </Accordion>
      ))}
      {showAddButton && (
        <Container justify="flex-end">
          <Fab onClick={addExpenses} className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Container>
      )}
    </div>
  );
};

export default Expenses;
