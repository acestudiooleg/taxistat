import React from 'react';
import Grid from '@material-ui/core/Grid';
import MUIButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const Button = ({ children, ...props }) => (
  <MUIButton variant="contained" {...props}>
    {children}
  </MUIButton>
);

export const H1 = ({ children, ...props }) => (
  <Typography variant="h1" {...props}>
    {children}
  </Typography>
);

export const H2 = ({ children, ...props }) => (
  <Typography variant="h2" {...props}>
    {children}
  </Typography>
);

export const H3 = ({ children, ...props }) => (
  <Typography variant="h3" {...props}>
    {children}
  </Typography>
);

export const H4 = ({ children, ...props }) => (
  <Typography variant="h4" {...props}>
    {children}
  </Typography>
);

export const H5 = ({ children, ...props }) => (
  <Typography variant="h5" {...props}>
    {children}
  </Typography>
);

export const H6 = ({ children, ...props }) => (
  <Typography variant="h6" {...props}>
    {children}
  </Typography>
);
export const P = ({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
);

export const Container = ({ children, ...props }) => (
  <Grid container {...props}>
    {children}
  </Grid>
);
export const D12 = ({ children, ...props }) => (
  <Grid item xs={12} {...props}>
    {children}
  </Grid>
);
export const D11 = ({ children, ...props }) => (
  <Grid item xs={11} {...props}>
    {children}
  </Grid>
);
export const D10 = ({ children, ...props }) => (
  <Grid item xs={10} {...props}>
    {children}
  </Grid>
);
export const D9 = ({ children, ...props }) => (
  <Grid item xs={9} {...props}>
    {children}
  </Grid>
);
export const D8 = ({ children, ...props }) => (
  <Grid item xs={8} {...props}>
    {children}
  </Grid>
);
export const D7 = ({ children, ...props }) => (
  <Grid item xs={7} {...props}>
    {children}
  </Grid>
);
export const D6 = ({ children, ...props }) => (
  <Grid item xs={6} {...props}>
    {children}
  </Grid>
);
export const D5 = ({ children, ...props }) => (
  <Grid item xs={5} {...props}>
    {children}
  </Grid>
);

export const D4 = ({ children, ...props }) => (
  <Grid item xs={4} {...props}>
    {children}
  </Grid>
);
export const D3 = ({ children, ...props }) => (
  <Grid item xs={3} {...props}>
    {children}
  </Grid>
);
export const D2 = ({ children, ...props }) => (
  <Grid item xs={2} {...props}>
    {children}
  </Grid>
);
export const D1 = ({ children, ...props }) => (
  <Grid item xs={1} {...props}>
    {children}
  </Grid>
);
