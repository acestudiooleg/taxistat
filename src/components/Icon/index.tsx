import React from 'react';
import styles from './Icon.module.scss';
import cx from 'classnames';

interface IProps {
  name: string;
  color?: string;
  textColor?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
  pos?: string;
}

const Icon = ({ name, color, size, className, children, textColor, pos = 'after' }: IProps) => {
  const txt = (posVal: string) =>
    pos === posVal &&
    children && <span className={cx(styles.label, { [`text-${textColor}`]: textColor })}>{children}</span>;
  return (
    <span className={cx(styles.root, className)}>
      {txt('before')}
      <i className={cx('material-icons', { [`text-${color}`]: color }, size)}>{name}</i>
      {txt('after')}
    </span>
  );
};

export default Icon;
