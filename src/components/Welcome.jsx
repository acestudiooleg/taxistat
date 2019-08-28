import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import { H5, P, D12 } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  paragraph: {
    padding: '10px 20px',
  },
  attention: {
    color: theme.palette.error.main,
  },
  input: {
    width: '100%',
  },
  contacts: {
    display: 'flex',
    justifyContent: 'space-around',
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
        <P className={classes.paragraph}>{t('welcome-desc')}</P>
        <P className={classes.paragraph}>{t('welcome-desc2')}</P>
        <P className={classes.paragraph}>
          {t('welcome-donat', { donatValue: 20, cardData: 'PrivatBank - 5169 3600 0007 1484' })}
        </P>
        <P className={classes.contacts}>
          <Chip
            avatar={(
              <Avatar
                component="span"
                alt="Telegram"
                src="data:image/jpeg;base64,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"
              />
)}
            component="a"
            color="secondary"
            label="Telegram"
            href="tg://resolve?domain=acestudiooleg"
          />
          <Chip
            avatar={(
              <Avatar
                alt="Viber"
                component="span"
                src="https://www.freeiconspng.com/uploads/messaging-viber-logo-purple-photo-0.png"
              />
)}
            component="a"
            label="Viber"
            color="secondary"
            href="tel:+380631296005"
          />
        </P>
        <P className={cx(classes.paragraph, classes.attention)}>{t('welcome-attention')}</P>
      </D12>
    </div>
  );
};

export default Welcome;
