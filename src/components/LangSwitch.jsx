import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Language from '@material-ui/icons/Language';

import i18n from '../i18n';

const LangSwitch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentLanguage = window.localStorage.getItem('i18nextLng') || 'en';

  const openMenu = event => setAnchorEl(event.currentTarget);

  const changeLanguage = lng => () => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button style={{ color: 'white' }} onClick={openMenu}>
        <Language style={{ marginRight: 5 }} />
        {currentLanguage}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={changeLanguage('ru')}>Русский</MenuItem>
        <MenuItem onClick={changeLanguage('ua')}>Українська</MenuItem>
      </Menu>
    </div>
  );
};

export default LangSwitch;
