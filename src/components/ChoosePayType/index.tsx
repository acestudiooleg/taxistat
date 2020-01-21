import React from 'react';
import { useTranslation } from 'react-i18next';
import { PayTypes } from '../../constants';
import Radio from '../RadioGroup';

interface IPayType {
  value: PayTypes;
  key: string;
}

interface IProps {
  selected: PayTypes;
  onChange: (el: IPayType) => void;
}

const ChoosePayType = ({ selected, onChange }: IProps) => {
  const { t } = useTranslation();
  const list: IPayType[] = [
    {
      value: PayTypes.Cash,
      key: t('cash'),
    },
    {
      value: PayTypes.Card,
      key: t('card'),
    },
    {
      value: PayTypes.CardAndCash,
      key: t('card-and-cash'),
    },
  ];
  return <Radio list={list} selected={selected} name={t('pay-type')} onChange={onChange} />;
};

export default ChoosePayType;
