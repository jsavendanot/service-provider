import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';
import { SharedItem, Document, Toolbar } from './components';

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
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    color: '#FFFFFF'
  }
}));

export const Export: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <div style={{ marginTop: '37px' }}>
          <span className={classes.menuText}>Export & Share</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #C57D7D',
                borderBottomRightRadius: '12px',
                borderBottomLeftRadius: '12px'
              }}>
              {[
                { id: 1, name: 'Goals', text: 'goals' },
                { id: 2, name: 'Journey', text: 'journals' },
                { id: 3, name: 'Story', text: 'stories' },
                { id: 4, name: 'Safety plan', text: 'safety plans' },
                { id: 5, name: 'Network', text: 'networks' }
              ].map(element => {
                return (
                  <SharedItem
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    text={element.text}
                  />
                );
              })}
            </div>
            <div
              style={{
                width: '260px',
                marginTop: '30px'
              }}>
              <Button type="primary">
                <span className={classes.buttonText}>Generate document</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={7}>
            <Document />
          </Grid>
          <Grid item xs={1}>
            <Toolbar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Export;
