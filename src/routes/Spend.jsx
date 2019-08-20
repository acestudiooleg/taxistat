import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';

const Spend = () => {
  const { t } = useTranslation();

  return <Layout title={t('spent')}>{t('spent')}</Layout>;
};

export default Spend;
