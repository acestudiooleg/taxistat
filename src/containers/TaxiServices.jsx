import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccBody from '@material-ui/core/ExpansionPanelDetails';
import AccHead from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ServiceForm from '../components/ServiceForm';
import { Container, P } from '../MyHTML';
import { getTaxiServices } from '../reducers/taxiServices';

import actions from '../actions/taxiServices';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 240px)',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  input: {
    width: '100%',
  },
  fab: {
    margin: 20,
  },
}));

const TaxiServices = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { list: services } = useSelector(getTaxiServices, shallowEqual);

  const [expanded, setExpanded] = useState(false);

  const [servicesState, setServices] = useState(services);

  const showAddButton = services.every(el => el.name !== expanded && !el.isNew);

  const dispatch = useDispatch();

  const handleService = serviceName => (serviceData) => {
    const newServices = servicesState.map((el) => {
      if (el.name === serviceName) {
        return serviceData;
      }
      return el;
    });
    setServices(newServices);
  };

  const handleAccordionChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const addService = () => {
    const newServices = [
      ...services,
      {
        isNew: true,
        name: t('new-service-name'),
        newName: t('service-name'),
        rideFee: 10,
        weekFee: 0,
        weekFeeEnabled: false,
        cardFee: 0,
        cardFeeEnabled: false,
      },
    ];
    setServices(newServices);
    setExpanded(t('new-service-name'));
  };

  const saveService = () => dispatch(
    actions.save(
      services.map((el) => {
        if (el.isNew) {
          return omit({ ...el, name: el.newName }, ['isNew', 'newName']);
        }
        return el;
      }),
    ),
  );

  const removeService = name => () => {
    const isDelete = window.confirm(t('remove-service-confirmation', { name }));
    if (isDelete) {
      alert(t('remove-service-success', { name }));
      setServices(services.filter(el => el.name !== name));
    }
  };

  return (
    <div className={classes.root}>
      {services.map(el => (
        <Accordion key={el.name} expanded={expanded === el.name} onChange={handleAccordionChange(el.name)}>
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P className={classes.heading}>{el.name}</P>
          </AccHead>
          <AccBody>
            <ServiceForm
              fees={el}
              onChange={handleService(el.name)}
              onRemove={removeService(el.name)}
              onSave={saveService}
            />
          </AccBody>
        </Accordion>
      ))}
      {showAddButton && (
        <Container justify="flex-end">
          <Fab onClick={addService} className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Container>
      )}
    </div>
  );
};

export default TaxiServices;
