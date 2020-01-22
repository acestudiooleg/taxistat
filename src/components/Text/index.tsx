import React from 'react';
import styles from './Text.module.scss';
import cx from 'classnames';

interface IProps {
  label: number | string;
  measure?: string;
  exp?: boolean;
  date?: boolean;
}

const Text = ({ label, measure, exp, date }: IProps) => (
  <h6
    className={cx(styles.label, {
      [styles.labelDate]: date,
      [styles.labelExpense]: exp,
      [styles.labelService]: !exp,
      [styles.negativeValue]: Number(label) < 0,
    })}
  >
    <span className={styles.labelSpan}>{label}</span>
    <span>{measure}</span>
  </h6>
);

export default Text;
