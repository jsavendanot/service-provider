import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Consumer } from './components';
import { Person } from 'types/people';

const useStyles = makeStyles(() => ({
  root: {}
}));

type Props = {
  people: Person[];
};

export const Consumers: React.FC<Props> = ({ people }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={3} justify="center">
      {people.map(person => {
        return (
          <Grid item xs={5} key={person.UserId}>
            <Consumer person={person} />
          </Grid>
        );
      })}
      <Grid item xs={5} />
    </Grid>
  );
};

export default Consumers;
