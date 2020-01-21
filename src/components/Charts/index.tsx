import React from 'react';
import { useTranslation } from 'react-i18next';
import PieChart, { LabelProps, ExtendedPieChartData } from 'react-minimal-pie-chart';
import { colors, servicesColors, IExpense, IRide } from '../../constants';
import { Container, Col, Row } from 'reactstrap';

interface IProps {
  expenses: IExpense[];
  rides: IRide[];
  currency: string;
}

function makeChart<T>(dataArr: T[], name: string, val: string) {
  return (dataArr || []).reduce((acc, rec) => {
    const entity = acc.find(el => el.name === rec[name]);
    if (entity) {
      entity.value += Number(rec[val]);
    } else {
      acc.push({
        value: Number(rec[val]),
        name: rec[name],
        color: servicesColors[rec[name]] || colors[acc.length],
      });
    }

    return acc;
  }, []);
}

const Charts = ({ expenses, rides, currency }: IProps) => {
  const { t } = useTranslation();

  const servicesChart = makeChart<IRide>(rides, 'serviceName', 'profit');
  const expensesChart = makeChart<IExpense>(expenses, 'expenseName', 'value');

  const label = (el: LabelProps) => {
    const { name, value, percentage } = el.data[el.dataIndex] as ExtendedPieChartData;
    return `${name} (${percentage.toFixed(0)}%) - ${Number(value).toFixed(0)} ${currency}`;
  };

  const labelStyle = { fontSize: '4px', fontFamily: 'sans-serif', fill: '#333333' };

  return (
    <Container justify="center">
      <Row>
        <Col>
          <h6>{t('taxi-services-title')}</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <PieChart data={servicesChart} label={label} labelStyle={labelStyle} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>{t('expenses')}</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <PieChart data={expensesChart} label={label} labelStyle={labelStyle} />
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
