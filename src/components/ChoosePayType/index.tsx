import React from 'react';
import { useTranslation } from 'react-i18next';
import { PayTypes } from '../../constants';
import { FormGroup, CustomInput } from 'reactstrap';

interface IProps {
  selected: PayTypes;
  onChange: (evt: React.ChangeEvent) => void;
}

const ChoosePayType = ({ selected, onChange }: IProps) => {
  const { t } = useTranslation();

  return (
    <FormGroup tag="fieldset">
      <legend>{t('pay-type')}</legend>
      <CustomInput
        onChange={onChange}
        type="radio"
        id="cash"
        name="payType"
        value={PayTypes.Cash}
        label={t('cash')}
        checked={PayTypes.Cash == selected}
      />
      <CustomInput
        onChange={onChange}
        type="radio"
        id="card"
        name="payType"
        value={PayTypes.Card}
        label={t('card')}
        checked={PayTypes.Card == selected}
      />
      <CustomInput
        onChange={onChange}
        type="radio"
        id="card-and-cash"
        name="payType"
        value={PayTypes.CardAndCash}
        label={t('card-and-cash')}
        checked={PayTypes.CardAndCash == selected}
      />
    </FormGroup>
  );
};

export default ChoosePayType;
