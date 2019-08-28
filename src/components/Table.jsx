import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { P } from '../MyHTML';

const useStyles = makeStyles(theme => ({
  negativeValue: {
    color: theme.palette.error.main,
  },
  listIcon: {
    minWidth: 30,
  },
  tableCell: {
    padding: 0,
  },
  label: {
    color: theme.palette.primary.main,
    marginRight: 10,
    width: 100,
  },
}));

const Row = ({
  icon, title, value, percent, ms,
}) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.tableCell} component="th" scope="row">
        <ListItem>
          {icon && <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>}
          <P variant="subtitle2" className={classes.label}>
            {title}
            {':'}
          </P>
        </ListItem>
      </TableCell>
      <TableCell align="right">
        <P variant="subtitle2" className={cx({ [classes.negativeValue]: value < 0 })}>
          {`${value} ${ms}`}
          {Boolean(percent) && <span>{` (${percent}%)`}</span>}
        </P>
      </TableCell>
    </TableRow>
  );
};

Row.defaultProps = {
  icon: null,
  percent: null,
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  value: PropTypes.number.isRequired,
  percent: PropTypes.number,
  ms: PropTypes.string.isRequired,
};

const Table = ({ rows }) => (
  <TableMUI>
    <TableBody>
      {rows.map(row => (
        <Row key={row.title} title={row.title} icon={row.icon} value={row.value} percent={row.percent} ms={row.ms} />
      ))}
    </TableBody>
  </TableMUI>
);

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
      value: PropTypes.any,
    }),
  ).isRequired,
};

export default Table;
