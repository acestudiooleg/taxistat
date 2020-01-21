import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';

export interface IEl {
  value: string | number;
  key: string;
}

export interface IProps<E extends IEl = IEl> {
  list: E[];
  name: string;
  onChange: (el: E) => void;
  selected: unknown;
}

export const toPair = (keyProp: string, valueProp: string) => (el: object, i) => ({
  key: el[keyProp],
  value: el[valueProp] || i + 1,
});

const RadioGroup = ({ list, selected, name, onChange }: IProps<IEl>) => {
  return (
    <FormGroup tag="fieldset">
      <legend>{name}</legend>
      {list.map(el => (
        <CustomInput
          key={el.key}
          onChange={() => onChange(el)}
          type="radio"
          id={String(el.value)}
          name={name}
          label={el.key}
          value={el.value}
          checked={selected === el.value}
        />
      ))}
    </FormGroup>
  );
};

export default RadioGroup;
