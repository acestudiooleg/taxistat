import React, { useState } from "react";
import omit from "lodash/omit";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/ExpansionPanel";
import AccBody from "@material-ui/core/ExpansionPanelDetails";
import AccHead from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import TaxiServiceFees from "./TaxiServiceFees";
import { Container, P } from "../MyHTML";
import { predefinedServices } from "../constants";
import words from "../translations.json";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 240px)",
    borderBottom: `1px solid ${theme.palette.grey[500]}`
  },
  input: {
    width: "100%"
  },
  fab: {
    margin: 20
  }
}));

export default function TaxiService() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const services = [...predefinedServices];

  const [_services, setState] = useState(services);

  const showAddButton = _services.every(
    el => el.name !== expanded && !el.isNew
  );

  const handleService = serviceName => serviceData => {
    const newServices = _services.map(el => {
      if (el.name === serviceName) {
        return serviceData;
      }
      return el;
    });
    setState(newServices);
  };

  const handleAccordionChange = panel => (event, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  const addService = () => {
    const newServices = [
      ..._services,
      {
        isNew: true,
        name: words["new-service-name"],
        newName: words["service-name"],
        rideFee: 10,
        weekFee: {
          value: 0,
          enabled: false
        },
        cardFee: {
          value: 0,
          enabled: false
        }
      }
    ];
    setState(newServices);
    setExpanded(words["new-service-name"]);
  };

  const saveNewService = () => {
    setState(
      _services.map(el => {
        if (el.isNew) {
          return omit({ ...el, name: el.newName }, ["isNew", "newName"]);
        }
        return el;
      })
    );
  };

  const removeService = name => () => {
    const isDelete = window.confirm(
      words["remove-service-confirmation"].replace("{name}", name)
    );
    if (isDelete) {
      alert(words["remove-service-success"].replace("{name}", name));
      setState(services.filter(el => el.name !== name));
    }
  };

  return (
    <div className={classes.root}>
      {_services.map(el => (
        <Accordion
          key={el.name}
          expanded={expanded === el.name}
          onChange={handleAccordionChange(el.name)}
        >
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
}
