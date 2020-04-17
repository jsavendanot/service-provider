import React, { useState, useEffect } from 'react';
import axios from 'common/utils/axios';
import { Network } from 'types/network';

import { Grid } from '@material-ui/core';

import { NetworkCard } from '../components';

export const People: React.FC = () => {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/api/networks').then(response => {
        if (mounted) {
          setNetworks(response.data.people);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {networks.map(network => {
        return (
          <Grid item xs={4} key={network.id}>
            <NetworkCard network={network} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default People;
