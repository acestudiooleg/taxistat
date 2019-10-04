import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import Input from '../containers/Input';

import { Container, D12, D6 } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',
  },
  removeButton: {
    backgroundColor: theme.palette.red,
  },
}));

const RemoveButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Fab);

const ExpenseForm = ({
  expense, onChange, onRemove, onSave,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleInputChange = name => ({ target: { value } }) => {
    const newState = { ...expense, [name]: value };
    onChange(newState);
  };
  const handleCheckboxChange = name => (a, enabled) => {
    const newState = { ...expense, [name]: enabled };
    onChange(newState);
  };
  return (
    <Container>
      {expense.isNew && (
        <D12>
          <Input
            label={t('expense-name')}
            defaultValue={expense.newName}
            className={classes.input}
            onChange={handleInputChange('newName')}
            margin="normal"
            variant="outlined"
          />
        </D12>
      )}
      <D12>
        <FormControlLabel
          control={
            <Switch checked={expense.isFuel} onChange={handleCheckboxChange('isFuel')} defaultValue={expense.isFuel} />
          }
          label={t('is-it-fuel')}
        />
      </D12>
      <D12>
        <FormControlLabel
          control={(
            <Switch
              checked={expense.commentsEnabled}
              onChange={handleCheckboxChange('commentsEnabled')}
              defaultValue={expense.commentsEnabled}
            />
)}
          label={t('add-comments-input')}
        />
      </D12>
      {!expense.isNew && (
        <D12>
          <Container justify="flex-end">
            <RemoveButton onClick={onRemove}>
              <Delete />
            </RemoveButton>
          </Container>
        </D12>
      )}
      {expense.isNew && (
        <D12>
          <Container justify="flex-end">
            <D6>
              <RemoveButton onClick={onRemove}>
                <Delete />
              </RemoveButton>
            </D6>
            <D6>
              <Container justify="flex-end">
                <Fab color="secondary" onClick={onSave}>
                  <Save />
                </Fab>
              </Container>
            </D6>
          </Container>
        </D12>
      )}
    </Container>
  );
};

export const ExpenseType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  commentsEnabled: PropTypes.bool.isRequired,
});

ExpenseForm.propTypes = {
  expense: ExpenseType.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ExpenseForm;
