import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Gallery, MyStory, Strenghts, FocusAreas } from './components';

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
  }
}));

export const Story: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{ marginTop: '37px', display: 'flex', alignItems: 'center' }}>
          <span className={classes.menuText}>Story</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Gallery />
      </Grid>
      <Grid item xs={12}>
        <MyStory />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <Strenghts />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <FocusAreas />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Story;
