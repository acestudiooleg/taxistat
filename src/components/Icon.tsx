import React from 'react';
import cx from 'classnames';

interface IProps {
  name: string;
  color?: string;
  size?: string;
}

const Icon = ({ name, color, size }: IProps) => (
  <i className={cx('material-icons', color ? `text-${color}` : '', size)}>{name}</i>
);

export default Icon;
