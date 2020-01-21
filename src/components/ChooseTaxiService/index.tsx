import React from 'react';
import { useTranslation } from 'react-i18next';
import { IService } from '../../constants';
import RadioGroup, { IEl, toPair } from '../RadioGroup';

interface IProps {
  services: IService[];
  onChange: (el: IEl) => void;
  serviceId: number;
}

const ChooseTaxiService = ({ services, serviceId, onChange }: IProps) => {
  const { t } = useTranslation();
  const list = services.map(toPair('name', 'ID'));
  return <RadioGroup list={list} selected={serviceId} name={t('taxi-service')} onChange={onChange} />;
};

export default ChooseTaxiService;
