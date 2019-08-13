import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccBody from '@material-ui/core/ExpansionPanelDetails';
import AccHead from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ExpenseForm from './ExpenseForm';
import { Container, P } from '../MyHTML';

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

const Expenses = ({ stepName, onChange, expenses: savedExpenses }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [expensesState, setState] = useState(savedExpenses);

  let expenses = expensesState;

  const showAddButton = expenses.every(el => el.name !== expanded && !el.isNew);

  if (stepName && stepName !== 'expenses') {
    expenses = expenses.filter(el => !el.isNew);
  }

  const handleService = serviceName => (serviceData) => {
    const newServices = expenses.map((el) => {
      if (el.name === serviceName) {
        return serviceData;
      }
      return el;
    });
    setState(newServices);
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
    setState(newServices);
    setExpanded(t('new-expenses-name'));
    onChange('services', newServices);
  };

  const saveNewExpenses = () => {
    setState(
      expenses.map((el) => {
        if (el.isNew) {
          return omit({ ...el, name: el.newName }, ['isNew', 'newName']);
        }
        return el;
      }),
    );
  };

  const removeExpenses = name => () => {
    const isDelete = window.confirm(t('remove-expense-confirmation', { name }));
    if (isDelete) {
      alert(t('remove-expense-success', { name }));
      setState(expenses.filter(el => el.name !== name));
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

Expenses.defaultProps = {
  stepName: null,
};

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  stepName: PropTypes.string,
};

export default Expenses;
