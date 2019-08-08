import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/ExpansionPanel";
import AccBody from "@material-ui/core/ExpansionPanelDetails";
import AccHead from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { P } from "../MyHTML";
import { predefinedServices } from "../constants";
import TaxiServiceFees from "./TaxiServiceFees";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    width: "100%"
  }
}));

export default function TaxiService() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const services = [...predefinedServices];

  const [_services, setState] = useState(services);

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
            <TaxiServiceFees fees={el} onChange={handleService(el.name)} />
          </AccBody>
        </Accordion>
      ))}
    </div>
  );
}
