import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';

const Statistics = () => {
  const { t } = useTranslation();

  return <Layout title={t('statistics')}>{t('statistics')}</Layout>;
};

export default Statistics;
