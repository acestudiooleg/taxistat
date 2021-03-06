import React, { useState } from 'react';
import moment from 'moment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Language from '@material-ui/icons/Language';

import i18n from '../i18n';

export const currentLang = () => (window.localStorage.getItem('i18nextLng') || 'en').substring(0, 2).toLowerCase();

export const getDistanceName = () => (currentLang() === 'en' ? 'ml' : 'km');
export const getCurrency = () => {
  const map = {
    en: 'usd',
    ru: 'грн',
    ua: 'грн',
  };
  return map[currentLang()];
};

const LangSwitch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentLanguage = currentLang();

  const openMenu = event => setAnchorEl(event.currentTarget);

  const changeLanguage = lng => () => {
    i18n.changeLanguage(lng);
    moment.locale(lng === 'ua' ? 'uk' : lng);
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
