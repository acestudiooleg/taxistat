import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, D6, Button } from "../MyHTML";
import words from "../translations.json";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  input: {
    width: "100%"
  },
  container: {
    padding: 10
  },
  buttons: {
    position: "absolute",
    bottom: 10
  }
}));

export default ({ onBack, onNext, activeStep, stepsLen }) => {
  const classes = useStyles();
  return (
    <Container className={classes.buttons}>
      <D6 className={classes.container}>
        <Button fullWidth onClick={onBack}>
          {words["back"]}
        </Button>
      </D6>
      <D6 className={classes.container}>
        <Button fullWidth color="primary" onClick={onNext}>
          {activeStep === stepsLen - 1 ? words["save"] : words["next"]}
        </Button>
      </D6>
    </Container>
  );
};
