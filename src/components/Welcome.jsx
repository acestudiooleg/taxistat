import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { H5, P, D12 } from '../MyHTML';

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

const Welcome = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <D12>
        <H5 align="center">{t('welcome-title')}</H5>
        <P align="center">{t('welcome-desc')}</P>
      </D12>
    </div>
  );
};

export default Welcome;
