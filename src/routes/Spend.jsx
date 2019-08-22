import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import find from 'lodash/find';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Layout from '../components/Layout';
import Input from '../components/Input';
import ChooseExpenseType from '../components/ChooseExpenseType';

import { getExpensesSettings } from '../reducers/expensesSettings';

import actions from '../actions/expenses';

import { Container, D12, D11 } from '../MyHTML';

import router from '../router';

const useStyles = makeStyles(theme => ({
  buttons: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
  },

  radios: {
    display: 'flex',
  },
  row: {
    margin: '0 20px',
  },
  input: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const Spend = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list: expenses, hasData } = useSelector(getExpensesSettings, shallowEqual);

  const [state, setState] = useState({
    init: false,
    expenseId: 1,
    value: null,
    comment: null,
  });

  if (!state.init && hasData) {
    setState({ ...state, init: true, expenseId: expenses[0].ID });
  }

  const expense = find(expenses, { ID: state.expenseId }) || {};

  const setData = (key, type) => ({ target: { value } }) => setState({ ...state, [key]: type(value) });
  const goto = url => () => dispatch(push(url));
  const save = () => {
    if (state.value) {
      dispatch(
        actions.add({
          ...state,
          expenseName: expense.name,
        }),
      );
    } else {
      window.alert(t('expense-data-validation-error'));
    }
  };

  return (
    <Layout title={t('spent')}>
      <div className={classes.radios}>
        <FormControl component="fieldset" className={classes.formControl}>
          <ChooseExpenseType expenseId={state.expenseId} expenses={expenses} onChange={setData('expenseId', Number)} />
        </FormControl>
      </div>
      <Container>
        <D12 className={classes.row}>
          <Input
            label={t('sum')}
            defaultValue={state.value}
            type="number"
            onChange={setData('value', Number)}
            end={t('uah')}
          />
        </D12>
        {expense.commentsEnabled && (
          <D12 className={classes.row}>
            <Input label={t('comment')} defaultValue={state.comment} onChange={setData('comment', String)} />
          </D12>
        )}
      </Container>
      <div className={classes.buttons}>
        <Container spacing={1} justify="center">
          <D11>
            <Button fullWidth onClick={save} variant="contained" color="primary">
              {t('save')}
            </Button>
          </D11>
          <D11>
            <Button fullWidth onClick={goto(router.balance)} color="secondary" variant="contained">
              {t('back')}
            </Button>
          </D11>
        </Container>
      </div>
    </Layout>
  );
};

export default Spend;
