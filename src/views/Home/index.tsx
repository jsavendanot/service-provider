import React, { useEffect } from 'react';
import { Consumer } from 'types/home';
import { useDispatch, useSelector } from 'react-redux';
import { startSession } from 'slices/session/action';
import { fetchPeople } from 'slices/people/action';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Consumers, Toolbar } from './components';
import { PeopleRootType } from 'types/people';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px'
  }
}));

export const Home: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const peopleStore: PeopleRootType = useSelector(
    (state: RootState) => state.people
  );

  useEffect(() => {
    dispatch(startSession());
    dispatch(fetchPeople());
  }, [dispatch]);

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Toolbar />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <Consumers
              consumers={peopleStore.people.map(person => {
                const newConsumer: Consumer = {
                  id: person.UserId,
                  avatar: '/images/avatar/avatar_1.svg',
                  name: person.Name,
                  dob: person.DateOfBirth,
                  lastActive: 'Thu, 24 November 2019 ',
                  lastMood: 'yellow'
                };
                return newConsumer;
              })}
            />
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
