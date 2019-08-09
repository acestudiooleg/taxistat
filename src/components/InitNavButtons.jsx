import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, D6, Button } from '../MyHTML';
import words from '../translations.json';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
  },
  input: {
    width: '100%',
  },
  container: {
    padding: 10,
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
  },
}));

const InitNavButtons = ({
  onBack, onNext, activeStep, stepsLen,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.buttons}>
      <D6 className={classes.container}>
        <Button fullWidth disabled={activeStep === 0} onClick={onBack}>
          {words.back}
        </Button>
      </D6>
      <D6 className={classes.container}>
        <Button fullWidth color="primary" onClick={onNext}>
          {activeStep === stepsLen - 1 ? words.save : words.next}
        </Button>
      </D6>
    </Container>
  );
};

InitNavButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  stepsLen: PropTypes.number.isRequired,
};

export default InitNavButtons;
