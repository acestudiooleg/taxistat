import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';

const Earn = () => {
  const { t } = useTranslation();

  return <Layout title={t('earned')}>{t('earned')}</Layout>;
};

export default Earn;
