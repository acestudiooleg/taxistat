import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
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

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 240px)',
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

  const dispatch = debounce(useDispatch(), 500);

  const { list, hasData } = useSelector(getExpensesSettings, shallowEqual);

  const expenses = list.map(el => ({ ...el, name: t(el.name) }));

  const [expanded, setExpanded] = useState(false);

  const [expensesState, setExpenses] = useState(expenses);

  const showAddButton = expensesState.every(el => el.name !== expanded && !el.isNew);
  if (hasData && !expensesState.length) {
    setExpenses(expenses);
  }

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
      ...expensesState,
      {
        isNew: true,
        name: t('new-expense-name'),
        newName: '',
        commentsEnabled: false,
      },
    ];
    setExpenses(newServices);
    setExpanded(`${t('new-expense-name')}New`);
  };

  const saveNewExpenses = () => {
    const newExpense = expensesState.find(el => el.isNew);
    if (!newExpense.newName) {
      return window.alert(t('expense-name-validation-error'));
    }
    newExpense.name = newExpense.newName;
    dispatch(actions.add(omit(newExpense, ['isNew', 'newName'])));
    return setExpanded(false);
  };

  const removeExpenses = ({ name, ID }) => () => {
    const isDelete = window.confirm(t('remove-expense-confirmation', { name }));
    if (isDelete) {
      alert(t('remove-expense-success', { name }));
      setExpenses(expensesState.filter(el => el.ID !== ID));
      if (ID) {
        dispatch(actions.remove({ ID }));
      }
    }
  };

  return (
    <div className={classes.root}>
      {expensesState.map(el => (
        <Accordion
          key={el.name + (el.ID || 'New')}
          expanded={expanded === el.name + (el.ID || 'New')}
          onChange={handleAccordionChange(el.name + (el.ID || 'New'))}
        >
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P className={classes.heading}>{el.name}</P>
          </AccHead>
          <AccBody>
            <ExpenseForm
              expense={el}
              onChange={handleService(el.name)}
              onRemove={removeExpenses(el)}
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
