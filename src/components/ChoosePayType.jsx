import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { PayTypes } from '../constants';

const useStyles = makeStyles(theme => ({
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const ChoosePayType = ({ selected, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <FormLabel component="legend">{t('pay-type')}</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" className={classes.group} value={selected} onChange={onChange}>
        <FormControlLabel value={PayTypes.Cash} control={<Radio />} label={t('cash')} />
        <FormControlLabel value={PayTypes.Card} control={<Radio />} label={t('card')} />
        <FormControlLabel value={PayTypes.CardAndCash} control={<Radio />} label={t('card-and-cash')} />
      </RadioGroup>
    </>
  );
};

ChoosePayType.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default ChoosePayType;
