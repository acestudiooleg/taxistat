import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { P } from '../MyHTML';

export const makeDayLine = (() => {
  const cache = { time: moment() };
  return (date) => {
    if (moment(date).isSame(cache.time, 'date')) {
      return '';
    }
    cache.time = moment(date);
    return <DateLine date={date} />;
  };
})();

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 20,
    color: theme.palette.primary.contrastText,
  },
  label: {
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
  },

  listIcon: {
    minWidth: 30,
  },
}));

const DateLine = ({ date }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const d = moment(date);
  const isToday = moment().isSame(d, 'date');
  return (
    <Paper key={date}>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          <CalendarTodayIcon className={classes.icon} />
        </ListItemIcon>
        <P variant="subtitle2" className={classes.label}>
          {isToday ? t('today') : d.format('DD MMMM HH:mm')}
        </P>
      </ListItem>
    </Paper>
  );
};

DateLine.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateLine;
