import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';

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

const ServiceForm = ({
  service, onChange, onRemove, onSave,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleInputChange = (name, type = 'number') => ({ target: { value } }) => {
    const newState = { ...service, [name]: type === 'number' ? Number(value) : value };
    onChange(newState);
  };
  const handleCheckboxChange = name => (a, enabled) => {
    const newState = { ...service, [name]: enabled };
    onChange(newState);
  };
  return (
    <Container>
      {service.isNew && (
        <D12>
          <Input
            label={t('service-name')}
            defaultValue={service.newName}
            className={classes.input}
            onChange={handleInputChange('newName', 'string')}
            margin="normal"
            variant="outlined"
          />
        </D12>
      )}
      <D12>
        <Input
          label={t('service-fee-per-ride')}
          defaultValue={service.rideFee}
          className={classes.input}
          type="number"
          onChange={handleInputChange('rideFee')}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </D12>
      <D12>
        <Input
          label={t('service-fee-per-week')}
          defaultValue={service.weekFee}
          disabled={!service.weekFeeEnabled}
          className={classes.input}
          type="number"
          onChange={handleInputChange('weekFee')}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">грн</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  checked={service.weekFeeEnabled}
                  onChange={handleCheckboxChange('weekFeeEnabled')}
                  defaultValue={service.weekFeeEnabled}
                />
              </InputAdornment>
            ),
          }}
        />
      </D12>
      <D12>
        <Input
          label={t('card-fee')}
          defaultValue={service.cardFee}
          disabled={!service.cardFeeEnabled}
          className={classes.input}
          type="number"
          onChange={handleInputChange('cardFee')}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  checked={service.cardFeeEnabled}
                  onChange={handleCheckboxChange('cardFeeEnabled')}
                  defaultValue={service.cardFeeEnabled}
                />
              </InputAdornment>
            ),
          }}
        />
      </D12>
      {!service.isNew && (
        <D12>
          <Container justify="flex-end">
            <RemoveButton onClick={onRemove}>
              <Delete />
            </RemoveButton>
          </Container>
        </D12>
      )}
      {service.isNew && (
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

export const ServiceType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  rideFee: PropTypes.number.isRequired,
  weekFee: PropTypes.number.isRequired,
  weekFeeEnabled: PropTypes.bool.isRequired,
  cardFee: PropTypes.number.isRequired,
  cardFeeEnabled: PropTypes.bool.isRequired,
});

ServiceForm.propTypes = {
  service: ServiceType.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ServiceForm;
