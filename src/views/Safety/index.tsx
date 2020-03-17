import React, { useState, useEffect, ChangeEvent } from 'react';

import { Grid, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchStaywellData,
  fetchStressData,
  fetchWarnDiffData,
  fetchWarnStrData
  // fetchPeopleData
} from 'slices/safety/action';

import { SafetyCard, Warning, Unwell, Contact } from './components';
import { SafetyRootType } from 'types/safety';
import { RootState } from 'reducer';
import { Loading } from 'components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 80px'
  },
  menuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  content: {
    marginTop: '20px'
  },
  switchText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    marginRight: '10px'
  }
}));

export const Safety: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState(false);

  const [collapses, setCollapses] = useState({
    staywell: false,
    stress: false,
    warning: false,
    unwell: false,
    contact: false
  });

  const handleCollapse = (name: string, value: boolean) => {
    setCollapses(collapses => ({
      ...collapses,
      [name]: value
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
    state
      ? setCollapses({
          staywell: false,
          stress: false,
          warning: false,
          unwell: false,
          contact: false
        })
      : setCollapses({
          staywell: true,
          stress: true,
          warning: true,
          unwell: true,
          contact: true
        });
  };

  const safetyStory: SafetyRootType = useSelector(
    (state: RootState) => state.safety
  );

  useEffect(() => {
    dispatch(fetchStaywellData());
    dispatch(fetchStressData());
    dispatch(fetchWarnDiffData());
    dispatch(fetchWarnStrData());
    // dispatch(fetchPeopleData());
  }, [dispatch]);

  return (
    <>
      {safetyStory.loading && <Loading />}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <div
            style={{
              marginTop: '37px',
              display: 'flex',
              alignItems: 'center'
            }}>
            <span className={classes.menuText}>Safety Plan</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '50px'
              }}>
              <span className={classes.switchText}>Collapse all</span>
              <Switch
                checked={state}
                color="primary"
                value={state}
                onChange={event => handleChange(event)}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <SafetyCard
                id={1}
                title="Things I do to stay well"
                description="These are things that I can do to be and stay well."
                values={safetyStory.staywell}
                collapse={collapses.staywell}
                change={() => handleCollapse('staywell', !collapses.staywell)}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <SafetyCard
                id={2}
                title="Things that stress me"
                description="Things that may stress me or cause me to have difficulties managing my issues."
                values={safetyStory.stress}
                collapse={collapses.stress}
                change={() => handleCollapse('stress', !collapses.stress)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <Warning
                id={3}
                diffTitle="Warning signs I may be having difficulty"
                diffDescription="Things I or others may notice when I am unwell."
                difficulties={safetyStory.difficulties}
                planTitle="Warning signs I may be having difficulty"
                planDescription="Things I or others may notice when I am unwell."
                strategies={safetyStory.strategies}
                collapse={collapses.warning}
                change={() => handleCollapse('warning', !collapses.warning)}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <div style={{ marginBottom: '20px' }}>
                <Unwell
                  id={4}
                  title="If I become unwell, I would like others to..."
                  description="If I become unwell I would like these to happen or not happen."
                  pleaseDo={safetyStory.pleaseDo}
                  dontDo={safetyStory.doNotDo}
                  collapse={collapses.unwell}
                  change={() => handleCollapse('unwell', !collapses.unwell)}
                />
              </div>
              <Contact
                id={5}
                title="People or services who I can contact"
                description="People or services who I can contact for support if I need immediate help."
                people={safetyStory.people}
                services={safetyStory.people}
                collapse={collapses.contact}
                change={() => handleCollapse('contact', !collapses.contact)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Safety;
