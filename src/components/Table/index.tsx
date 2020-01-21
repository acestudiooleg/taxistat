import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './Table.module.scss';
import { Table as TBL } from 'reactstrap';

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
      <td>
        <div className={cx(styles.tableCell)}>
          {icon && <i className={styles.listIcon}>{icon}</i>}
          <span className={styles.label}>
            {title}
            {':'}
          </span>
        </div>
      </td>
      <td align="right">
        <div className={cx({ [styles.negativeValue]: taxiDriver && Number(value) < 0 })}>
          {`${value} ${ms}`}
          {!taxiDriver && Boolean(percent) && <span>{` (${percent}%)`}</span>}
        </div>
      </td>
    </tr>
  );
};

export interface ITable {
  rows: IRow[];
}

const Table = ({ rows }: ITable) => (
  <TBL size="sm">
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
  </TBL>
);

export default Table;
