import React, { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { Journal as JournalType } from 'types/journey';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Summary, Journal } from '../components';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0'
  }
}));

const JourneyAll: React.FC = () => {
  const classes = useStyles();

  const [journals, setJournsl] = useState<JournalType[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/api/journals').then(response => {
        if (mounted) {
          setJournsl(response.data.journals);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>Summary</span>
          <Summary />
        </div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>All Journals</span>
          {journals.map(journal => {
            return <Journal key={journal.id} journal={journal} />;
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default JourneyAll;
