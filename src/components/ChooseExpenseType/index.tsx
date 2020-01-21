import React from 'react';
import { useTranslation } from 'react-i18next';
import { IExpenseSetting } from '../../constants';
import { FormGroup, CustomInput } from 'reactstrap';

interface IProps {
  expenses: IExpenseSetting[];
  onChange: (evt: React.ChangeEvent) => void;
  expenseId: number;
}

const ChooseExpenseType = ({ expenses, expenseId, onChange }: IProps) => {
  const { t } = useTranslation();

  return (
    <FormGroup tag="fieldset">
      <legend>{t('expense')}</legend>
      {expenses.map(el => (
        <CustomInput
          key={el.name}
          onChange={onChange}
          type="radio"
          id={String(el.ID)}
          name="expenseType"
          label={el.name}
          value={el.ID}
          checked={expenseId === el.ID}
        />
      ))}
    </FormGroup>
  );
};

export default ChooseExpenseType;
