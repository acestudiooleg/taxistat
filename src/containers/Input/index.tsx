import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../actions/keyboard';
import styles from './Input.module.scss';
import { InputGroup, InputGroupAddon, InputGroupText, Input as BSInput, InputProps } from 'reactstrap';

interface IProps extends InputProps {
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const Input = ({ start, end, ...props }: IProps) => {
  const dispatch = useDispatch();
  const show = () => dispatch(actions.show());
  const hide = () => dispatch(actions.hide());

  return (
    <InputGroup>
      {start && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{start}</InputGroupText>
        </InputGroupAddon>
      )}
      <BSInput onFocus={show} onBlur={hide} {...props} />
      {end && (
        <InputGroupAddon addonType="append">
          <InputGroupText>{end}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default Input;
