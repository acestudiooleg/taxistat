import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, CustomInput, Button } from 'reactstrap';
import Icon from '../Icon';
import styles from './ExpenseForm.module.scss';
import { IExpenseSetting } from '../../constants';
import Input from '../../containers/Input';

interface IProps {
  expense: IExpenseSetting;
  onChange: (el: IExpenseSetting) => void;
  onRemove: () => void;
  onSave: () => void;
}

const ExpenseForm = ({ expense, onChange, onRemove, onSave }: IProps) => {
  const { t } = useTranslation();

  const handleInputChange = name => ({ target: { value } }) => {
    const newState = { ...expense, [name]: value };
    onChange(newState);
  };
  const handleCheckboxChange = (name: string, prevValue: boolean) => () => {
    const newState = { ...expense, [name]: !prevValue };
    onChange(newState);
  };
  return (
    <div>
      {expense.isNew && (
        <FormGroup>
          <Input
            placeholder={t('expense-name')}
            value={expense.newName}
            className={styles.input}
            onChange={handleInputChange('newName')}
          />
        </FormGroup>
      )}
      <FormGroup>
        <CustomInput
          id="fuel"
          type="switch"
          checked={expense.isFuel}
          onChange={handleCheckboxChange('isFuel', expense.isFuel)}
          label={t('is-it-fuel')}
        />
      </FormGroup>
      <FormGroup>
        <CustomInput
          type="switch"
          id="comments"
          checked={expense.commentsEnabled}
          onChange={handleCheckboxChange('commentsEnabled', expense.commentsEnabled)}
          label={t('add-comments-input')}
        />
      </FormGroup>
      <FormGroup className={styles.buttons}>
        <Button color="danger" onClick={onRemove}>
          <Icon name="delete">{t('delete')}</Icon>
        </Button>
        {expense.isNew && (
          <Button onClick={onSave}>
            <Icon name="save">{t('save')}</Icon>
          </Button>
        )}
      </FormGroup>
    </div>
  );
};

export default ExpenseForm;
