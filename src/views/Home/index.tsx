import React, { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { Consumer } from 'types/home';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Consumers, Toolbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px'
  }
}));

export const Home: React.FC = () => {
  const classes = useStyles();

  const [consumers, setConsumers] = useState<Consumer[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchNetwork = () => {
      axios.get('/api/consumers').then(response => {
        if (mounted) {
          setConsumers(response.data.consumers);
        }
      });
    };

    fetchNetwork();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Toolbar />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <Consumers consumers={consumers} />
          </Grid>
          <Grid item xs={3}>
            <div
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <img src="/images/home/gary.svg" alt="" />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
