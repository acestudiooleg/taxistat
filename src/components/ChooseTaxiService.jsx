import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { ServiceType } from './ServiceForm';

const useStyles = makeStyles(theme => ({
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const ChooseTaxiService = ({ services, selected, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <FormLabel component="legend">{t('taxi-service')}</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        className={classes.group}
        value={String(selected)}
        onChange={onChange}
      >
        {services.map(el => (
          <FormControlLabel key={el.name} value={String(el.ID)} control={<Radio />} label={el.name} />
        ))}
      </RadioGroup>
    </>
  );
};

ChooseTaxiService.propTypes = {
  services: PropTypes.arrayOf(ServiceType).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};

export default ChooseTaxiService;
