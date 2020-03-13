import React from 'react';
import { Consumer as ConsumerType } from 'types/home';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Consumer } from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

type Props = {
  consumers: ConsumerType[];
};

export const Consumers: React.FC<Props> = ({ consumers }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={3} justify="center">
      {consumers.map(consumer => {
        return (
          <Grid item xs={5} key={consumer.id}>
            <Consumer
              id={consumer.id}
              name={consumer.name}
              dob={consumer.dob}
              avatar={consumer.avatar}
              lastActive={consumer.lastActive}
              lastMood={consumer.lastMood}
            />
          </Grid>
        );
      })}
      <Grid item xs={5} />
    </Grid>
  );
};

export default Consumers;
