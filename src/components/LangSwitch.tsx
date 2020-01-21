import React, { useState } from 'react';
import moment from 'moment';

import i18n, { Langs } from '../i18n';

export const currentLang = () => (window.localStorage.getItem('i18nextLng') || 'en').substring(0, 2).toLowerCase();

export const getDistanceName = (): string => (currentLang() === 'en' ? 'ml' : 'km');
export const getCurrency = (): string => {
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

  const openMenu = (event: any) => setAnchorEl(event.currentTarget);

  const changeLanguage = (lng: Langs) => () => {
    i18n.changeLanguage(lng);
    moment.locale(lng === Langs.UA ? 'uk' : lng);
    setAnchorEl(null);
    console.log(anchorEl);
  };

  return (
    <div>
      <button onClick={openMenu}>
        LngIcon
        {currentLanguage}
      </button>
      <ul id="simple-menu">
        <li onClick={changeLanguage(Langs.EN)}>English</li>
        <li onClick={changeLanguage(Langs.RU)}>Русский</li>
        <li onClick={changeLanguage(Langs.UA)}>Українська</li>
      </ul>
    </div>
  );
};

export default LangSwitch;
