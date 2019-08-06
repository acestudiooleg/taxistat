import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import actions from "../actions/counter";
import { getCounter } from "../reducers/counter";

const mapStateToProps = state => ({
  counter: getCounter(state)
});

const mapDispatchToProps = {
  increment: actions.increment,
  asyncDec: actions.asyncDec,
  ...actions // decrement
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Home = ({ counter, increment, decrement, asyncInc, asyncDec }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">
          Home - {counter.loading ? <CircularProgress /> : counter.value}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => increment()}
          variant="contained"
          className={classes.button}
          color="primary"
        >
          +
        </Button>
        <Button
          onClick={() => decrement()}
          variant="contained"
          className={classes.button}
          color="secondary"
        >
          -
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => asyncInc(counter.value)}
          variant="contained"
          disabled={counter.loading}
          className={classes.button}
          color="primary"
        >
          Async inc
        </Button>
        <Button
          onClick={() => asyncDec(counter.value)}
          variant="contained"
          disabled={counter.loading}
          className={classes.button}
          color="secondary"
        >
          Async dec
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
