import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccBody from '@material-ui/core/ExpansionPanelDetails';
import AccHead from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import TaxiServiceFees from './TaxiServiceFees';
import { Container, P } from '../MyHTML';
import { predefinedServices } from '../constants';

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

const TaxiService = ({ stepName, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const savedServices = [...predefinedServices];

  const [servicesState, setState] = useState(savedServices);

  let services = servicesState;

  const showAddButton = services.every(el => el.name !== expanded && !el.isNew);

  if (stepName && stepName !== 'services') {
    services = services.filter(el => !el.isNew);
  }

  const handleService = serviceName => (serviceData) => {
    const newServices = services.map((el) => {
      if (el.name === serviceName) {
        return serviceData;
      }
      return el;
    });
    setState(newServices);
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
        weekFee: {
          value: 0,
          enabled: false,
        },
        cardFee: {
          value: 0,
          enabled: false,
        },
      },
    ];
    setState(newServices);
    setExpanded(t('new-service-name'));
    onChange('services', newServices);
  };

  const saveNewService = () => {
    setState(
      services.map((el) => {
        if (el.isNew) {
          return omit({ ...el, name: el.newName }, ['isNew', 'newName']);
        }
        return el;
      }),
    );
  };

  const removeService = name => () => {
    const isDelete = window.confirm(t('remove-service-confirmation').replace('{name}', name));
    if (isDelete) {
      alert(t('remove-service-success').replace('{name}', name));
      setState(services.filter(el => el.name !== name));
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
            <TaxiServiceFees
              fees={el}
              onChange={handleService(el.name)}
              onRemove={removeService(el.name)}
              onSave={saveNewService}
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

TaxiService.defaultProps = {
  stepName: null,
};

TaxiService.propTypes = {
  onChange: PropTypes.func.isRequired,
  stepName: PropTypes.string,
};

export default TaxiService;
