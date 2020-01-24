import React, { useState, ChangeEvent } from 'react';

import { Grid, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { SafetyCard } from './components';

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

  const [state, setState] = useState(false);

  const [collapses, setCollapses] = useState({
    staywell: false,
    stress: false
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
          stress: false
        })
      : setCollapses({
          staywell: true,
          stress: true
        });
  };

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{ marginTop: '37px', display: 'flex', alignItems: 'center' }}>
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
            {[
              {
                id: 1,
                title: 'Things I do to stay well',
                description:
                  'These are things that I can do to be and stay well.',
                values: [
                  {
                    id: 1,
                    value: 'Get enough sleep'
                  },
                  {
                    id: 2,
                    value: 'Have some me time during the day'
                  },
                  {
                    id: 3,
                    value: 'Talk with my close friends'
                  }
                ]
              }
            ].map(value => {
              return (
                <SafetyCard
                  key={value.id}
                  title={value.title}
                  id={value.id}
                  description={value.description}
                  values={value.values}
                  collapse={collapses.staywell}
                  change={() => handleCollapse('staywell', !collapses.staywell)}
                />
              );
            })}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            {[
              {
                id: 2,
                title: 'Things that stress me',
                description:
                  'Things that may stress me or cause me to have difficulties managing my issues.',
                values: [
                  {
                    id: 1,
                    value: 'Not feeling safe'
                  },
                  {
                    id: 2,
                    value: 'Not being listened to'
                  },
                  {
                    id: 3,
                    value: 'Missing my grandpa'
                  }
                ]
              }
            ].map(value => {
              return (
                <SafetyCard
                  key={value.id}
                  title={value.title}
                  id={value.id}
                  description={value.description}
                  values={value.values}
                  collapse={collapses.stress}
                  change={() => handleCollapse('stress', !collapses.stress)}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Safety;
