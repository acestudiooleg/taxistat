import React from 'react';
import cx from 'classnames';

interface IProps {
  name: string;
  color?: string;
  size?: string;
  className?: string;
}

const Icon = ({ name, color, size, className }: IProps) => (
  <i className={cx('material-icons', color ? `text-${color}` : '', size, className)}>{name}</i>
);

export default Icon;
