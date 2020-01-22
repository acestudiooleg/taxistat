import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { ListGroupItem } from 'reactstrap';
import styles from './DateLine.module.scss';

export const makeDayLine = (() => {
  const cache = { time: moment() };
  const ComDateLine = date => {
    if (moment(date).isSame(cache.time, 'date')) {
      return '';
    }
    cache.time = moment(date);
    return <DateLine date={date} />;
  };
  return ComDateLine;
})();

interface IProps {
  date: string;
}

const DateLine = ({ date }: IProps) => {
  const { t } = useTranslation();
  const d = moment(date);
  const isToday = moment().isSame(d, 'date');

  return (
    <ListGroupItem color="secondary" key={date} className={styles.listItem}>
      <Icon name="calendar_today" color="light" className={styles.icon} />
      <span className={styles.label}>{isToday ? t('today') : d.format('DD MMMM HH:mm')}</span>
    </ListGroupItem>
  );
};

export default DateLine;
