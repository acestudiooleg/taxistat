import React, { useState } from 'react';
import Swipe from 'react-easy-swipe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Accordion from '@material-ui/core/ExpansionPanel';
import AccBody from '@material-ui/core/ExpansionPanelDetails';
import AccHead from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Layout from '../components/Layout';
import RidesList from '../components/RidesList';
import ExpensesList from '../components/ExpensesList';

import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';

import { goToBalance } from '../router';
import { P } from '../MyHTML';

const Statictics = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { list: rides } = useSelector(getRides, shallowEqual);
  const { list: expenses } = useSelector(getExpenses, shallowEqual);
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t('balance')}>
        <Accordion expanded={expanded === 'rides'} onChange={handleAccordionChange('rides')}>
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P>{t('rides')}</P>
          </AccHead>
          <AccBody>
            <RidesList rides={rides} />
          </AccBody>
        </Accordion>
        <Accordion expanded={expanded === 'expenses'} onChange={handleAccordionChange('expenses')}>
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P>{t('expenses')}</P>
          </AccHead>
          <AccBody>
            <ExpensesList expenses={expenses} />
          </AccBody>
        </Accordion>
      </Layout>
    </Swipe>
  );
};

export default Statictics;
