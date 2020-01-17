import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

import * as envs from '../../env';

console.log(envs);

const Dashboard = (): React.ReactElement => {
  const tree = useSelector(state => state);

  const message = 'You not authorized';

  return (
    <div>
      <h1 className={styles.Redbg}>Dashboard</h1>
      <p>{message}</p>
      <pre>APP TREE:{JSON.stringify(tree, null, '\t')}</pre>
    </div>
  );
};

export default Dashboard;
