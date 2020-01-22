import React from 'react';
import { makeDayLine } from '../DateLine';
import Text from '../Text';
import styles from './ExpenseList.module.scss';
import { IExpense } from '../../constants';
import Icon from '../Icon';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface IProps {
  expenses: IExpense[];
  currency: string;
}

const ExpenseList = ({ expenses, currency }: IProps) => {
  return (
    <ListGroup>
      {expenses.map(({ timestamp, expenseName, value, comment }) => (
        <div key={timestamp + value}>
          {makeDayLine(timestamp)}
          <ListGroupItem className={styles.li}>
            <div className={styles.param}>
              <Icon name="shopping_cart" textColor="primary" color="secondary">
                <Text exp label={expenseName} />
              </Icon>
            </div>
            <div className={styles.param}>
              <Icon name="attach_money" textColor="primary" color="secondary">
                <Text exp label={value} measure={currency} />
              </Icon>
            </div>
            <div className={styles.param}>
              <Icon name="create" textColor="primary" color="secondary">
                <Text exp label={comment} />
              </Icon>
            </div>
          </ListGroupItem>
        </div>
      ))}
    </ListGroup>
  );
};

export default ExpenseList;
