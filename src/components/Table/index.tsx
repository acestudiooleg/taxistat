import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface IRow {
  title: string;
  icon?: ReactNode;
  value: string | number;
  percent?: number;
  ms: string;
  taxiDriver?: boolean;
}

const Row = ({ icon, title, value, percent, ms, taxiDriver }: IRow) => {
  return (
    <tr>
      <td className={styles.tableCell}>
        <div>
          {icon && <i className={styles.listIcon}>{icon}</i>}
          <p className={styles.label}>
            {title}
            {':'}
          </p>
        </div>
      </td>
      <td align="right">
        <p className={cx({ [styles.negativeValue]: taxiDriver && Number(value) < 0 })}>
          {`${value} ${ms}`}
          {!taxiDriver && Boolean(percent) && <span>{` (${percent}%)`}</span>}
        </p>
      </td>
    </tr>
  );
};

export interface ITable {
  rows: IRow[];
}

const Table = ({ rows }: ITable) => (
  <table>
    <tbody>
      {rows.map(row => (
        <Row
          key={row.title}
          title={row.title}
          icon={row.icon}
          value={row.value}
          percent={row.percent}
          ms={row.ms}
          taxiDriver={row.taxiDriver}
        />
      ))}
    </tbody>
  </table>
);

export default Table;
