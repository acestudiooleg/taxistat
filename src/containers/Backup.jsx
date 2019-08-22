import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Container, D11 } from '../MyHTML';

import actions from '../actions/backup';
import { getSettings } from '../reducers/settings';
import { getBackup } from '../reducers/backup';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const Backup = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const settings = useSelector(getSettings, shallowEqual);
  const backup = useSelector(getBackup, shallowEqual);
  const dispatch = useDispatch();
  const restore = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      dispatch(actions.restore(reader.result));
    };

    reader.readAsText(file);
  };

  let buttonSave;

  if (backup && backup.hasData) {
    const blob = new Blob([backup.database], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const fileName = `taxistat_backup_${new Date().toGMTString()}`;
    buttonSave = (
      <Button fullWidth href={url} download={fileName} variant="contained" color="primary">
        {t('save-all-settings')}
      </Button>
    );
  } else {
    dispatch(actions.save());
  }

  return (
    <div className={classes.root}>
      <Container spacing={1} justify="center">
        <D11>{settings && settings.done && buttonSave}</D11>
        <D11>
          <label htmlFor="restore-from-file" onChange={restore}>
            <input accept="application/json" className={classes.input} id="restore-from-file" type="file" />
            <Button fullWidth component="span" color="secondary" variant="contained">
              {t('restore-all-settings')}
            </Button>
          </label>
        </D11>
      </Container>
    </div>
  );
};

export default Backup;
