import React from 'react';
import { useTranslation } from 'react-i18next';
import { IExpenseSetting } from '../../constants';
import RadioGroup, { toPair, IEl } from '../RadioGroup';
interface IProps {
  expenses: IExpenseSetting[];
  onChange: (el: IEl) => void;
  expenseId: number;
}

const ChooseExpenseType = ({ expenses, expenseId, onChange }: IProps) => {
  const { t } = useTranslation();
  const list = expenses.map(toPair('name', 'ID'));
  return <RadioGroup list={list} selected={expenseId} name={t('expense')} onChange={onChange} />;
};

export default ChooseExpenseType;
