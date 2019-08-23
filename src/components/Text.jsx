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
  labelService: {
    color: theme.palette.primary.main,
    marginRight: 10,
    width: 45,
  },
  labelExpense: {
    color: theme.palette.primary.main,
    marginRight: 10,
    width: 80,
  },
  labelSpan: {
    marginRight: 2,
  },
}));

const Text = ({ label, measure, exp }) => {
  const classes = useStyles();
  return (
    <P
      variant="subtitle2"
      className={cx(exp ? classes.labelExpense : classes.labelService, { [classes.negativeValue]: Number(label) < 0 })}
    >
      <span className={classes.labelSpan}>{label}</span>
      <span>{measure}</span>
    </P>
  );
};

Text.defaultProps = {
  exp: false,
};

Text.propTypes = {
  label: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  exp: PropTypes.bool,
};

export default Text;
