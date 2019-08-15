import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Container, D6, Button } from '../MyHTML';

const useStyles = makeStyles(theme => ({
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
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    position: 'absolute',
    bottom: 10,
  },
}));

const InitNavButtons = ({
  onBack, onNext, activeStep, stepsLen,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container className={classes.buttons}>
      <D6 className={classes.container}>
        <Button fullWidth disabled={activeStep === 0} onClick={onBack}>
          {t('back')}
        </Button>
      </D6>
      <D6 className={classes.container}>
        <Button fullWidth color="primary" onClick={onNext}>
          {activeStep === stepsLen - 1 ? t('save') : t('next')}
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
