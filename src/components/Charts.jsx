/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PieChart from 'react-minimal-pie-chart';

import { colors, servicesColors } from '../constants';
import { Container, D11, H6 } from '../MyHTML';

const Charts = ({ expenses, rides, currency }) => {
  const { t } = useTranslation();

  const servicesChart = (rides || []).reduce((acc, ride = {}) => {
    const service = acc.find(el => el.name === ride.serviceName);
    if (service) {
      service.value += Number(ride.profit);
    } else {
      acc.push({
        value: Number(ride.profit),
        name: ride.serviceName,
        color: servicesColors[ride.serviceName] || colors[acc.length],
      });
    }

    return acc;
  }, []);

  const expensesChart = (expenses || []).reduce((acc, exp = {}) => {
    const expense = acc.find(el => el.name === exp.expenseName);
    if (expense) {
      expense.value += Number(exp.value);
    } else {
      acc.push({
        value: Number(exp.value),
        name: exp.expenseName,
        color: colors[acc.length],
      });
    }

    return acc;
  }, []);

  const label = (el) => {
    const { name, value, percentage } = el.data[el.dataIndex] || {};
    return `${name} (${percentage.toFixed(0)}%) - ${Number(value).toFixed(0)} ${currency}`;
  };

  const labelStyle = { fontSize: '5px', fontFamily: 'sans-serif', fill: '#333333' };

  return (
    <Container justify="center">
      <D11>
        <H6>{t('taxi-services-title')}</H6>
      </D11>
      <D11>
        <PieChart data={servicesChart} label={label} labelStyle={labelStyle} />
      </D11>
      <D11>
        <H6>{t('expenses')}</H6>
      </D11>
      <D11>
        <PieChart data={expensesChart} label={label} labelStyle={labelStyle} />
      </D11>
    </Container>
  );
};

export default Charts;
