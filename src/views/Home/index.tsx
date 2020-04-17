import React, { useEffect } from 'react';
import { Consumer } from 'types/home';
import { useDispatch, useSelector } from 'react-redux';
import { startSession } from 'slices/auth/action';
import { fetchPeople } from 'slices/people/action';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Loading } from 'common/components';
import { Consumers, Toolbar } from './components';
import { Person } from 'types/people';
import { RootState } from 'reducer';
import { fetchAllFocusAreas } from 'slices/other/action';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px'
  }
}));

export const Home: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const peopleLoading: boolean = useSelector(
    (state: RootState) => state.people.loading
  );

  const people: Person[] = useSelector(
    (state: RootState) => state.people.people
  );

  useEffect(() => {
    dispatch(startSession());
    dispatch(fetchPeople());
    dispatch(fetchAllFocusAreas());
  }, [dispatch]);

  return (
    <>
      {peopleLoading && <Loading />}
      <Grid container justify="center" spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Toolbar />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Consumers
                consumers={people.map(person => {
                  const newConsumer: Consumer = {
                    id: person.UserId,
                    avatar: person.Photo,
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
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <img src="/images/home/gary.svg" alt="" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
