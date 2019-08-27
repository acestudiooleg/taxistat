import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import { P } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  negativeValue: {
    '&&': {
      color: theme.palette.error.main,
    },
  },
  label: {
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  labelService: {
    width: 45,
  },
  labelExpense: {
    width: 80,
  },
  labelDate: {
    color: theme.palette.secondary.main,
    width: '100%',
  },
  labelSpan: {
    marginRight: 2,
  },
}));

const Text = ({
  label, measure, exp, date,
}) => {
  const classes = useStyles();
  return (
    <P
      variant="subtitle2"
      className={cx(classes.label, {
        [classes.labelDate]: date,
        [classes.labelExpense]: exp,
        [classes.labelService]: !exp,
        [classes.negativeValue]: Number(label) < 0,
      })}
    >
      <span className={classes.labelSpan}>{label}</span>
      <span>{measure}</span>
    </P>
  );
};

Text.defaultProps = {
  exp: false,
  date: false,
};

Text.propTypes = {
  label: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  exp: PropTypes.bool,
  date: PropTypes.bool,
};

export default Text;
