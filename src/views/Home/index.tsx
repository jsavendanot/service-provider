import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSession } from 'slices/auth/action';
import { fetchPeople } from 'slices/people/action';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Loading } from 'common/components';
import { Consumers, Toolbar, PendingContacts } from './components';
import { Person } from 'types/people';
import { RootState } from 'reducer';
import { fetchAllFocusAreas } from 'slices/other/action';
import { fetchPendingContactFromInvitation } from 'slices/invitation/action';
import { Invitation } from 'types/network';

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

  const pendingContacts: Invitation[] = useSelector(
    (state: RootState) => state.invitation.pendingContacts
  );

  useEffect(() => {
    dispatch(startSession());
    dispatch(fetchPeople());
    dispatch(fetchAllFocusAreas());
    dispatch(fetchPendingContactFromInvitation());
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
              <Consumers people={people} />
            </Grid>
            <Grid item xs={9}>
              <PendingContacts invitations={pendingContacts} />
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
