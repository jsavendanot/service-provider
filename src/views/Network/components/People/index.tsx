import React from 'react';
import { Network } from 'types/network';
import { Grid } from '@material-ui/core';
import { NetworkCard } from '../components';

type Props = {
  networks: Network[];
};

export const People: React.FC<Props> = ({ networks }) => {
  return (
    <Grid container spacing={3}>
      {networks.map(network => {
        return (
          <Grid item xs={4} key={network.Id}>
            <NetworkCard network={network} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default People;
