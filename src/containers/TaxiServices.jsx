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
import debounce from 'lodash/debounce';

import ServiceForm from '../components/ServiceForm';
import { Container, P } from '../MyHTML';
import { getTaxiServices } from '../reducers/taxiServices';

import actions from '../actions/taxiServices';

const useStyles = makeStyles(() => ({
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

  const { list: services, hasData } = useSelector(getTaxiServices, shallowEqual);

  const [expanded, setExpanded] = useState(false);

  const [servicesState, setServices] = useState(services);

  if (hasData && !servicesState.length) {
    setServices(services);
  }

  const maybeNew = servicesState.find(el => el.isNew);

  if (maybeNew) {
    const alreadySaved = services.find(el => el.name === maybeNew.name);
    if (alreadySaved) {
      setServices(services);
    }
  }

  const showAddButton = servicesState.every(el => el.name !== expanded && !el.isNew);

  const dispatch = debounce(useDispatch(), 500);

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
      ...servicesState,
      {
        isNew: true,
        name: t('new-service-name'),
        newName: '',
        rideFee: 10,
        weekFee: 0,
        weekFeeEnabled: false,
        cardFee: 0,
        cardFeeEnabled: false,
      },
    ];
    setServices(newServices);
    setExpanded(`${t('new-service-name')}New`);
  };

  const saveService = () => {
    const newService = servicesState.find(el => el.isNew);
    if (!newService.newName) {
      return window.alert(t('service-name-validation-error'));
    }
    newService.name = newService.newName;
    dispatch(actions.add(omit(newService, ['isNew', 'newName'])));
    return setExpanded(false);
  };

  const removeService = ({ name, ID }) => () => {
    const isDelete = window.confirm(t('remove-service-confirmation', { name }));
    if (isDelete) {
      alert(t('remove-service-success', { name }));
      setServices(servicesState.filter(el => el.name !== name));
      if (ID) {
        dispatch(actions.remove({ ID }));
      }
    }
  };

  return (
    <>
      {servicesState.map(el => (
        <Accordion
          key={el.name + (el.ID || 'New')}
          expanded={expanded === el.name + (el.ID || 'New')}
          onChange={handleAccordionChange(el.name + (el.ID || 'New'))}
        >
          <AccHead expandIcon={<ExpandMoreIcon />}>
            <P className={classes.heading}>{el.name}</P>
          </AccHead>
          <AccBody>
            <ServiceForm
              service={el}
              onChange={handleService(el.name)}
              onRemove={removeService(el)}
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
    </>
  );
};

export default TaxiServices;
