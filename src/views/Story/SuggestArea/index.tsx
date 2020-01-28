import React, { useState, useEffect } from 'react';
import useRouter from 'utils/useRouter';
import { Area } from 'types/story';
import axios from 'utils/axios';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { AreaCard } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '45px 95px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000',
    margin: '10px 0'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0 10px'
  }
}));

type Props = {
  myAreas: Area[];
};

export const SuggestArea: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();

  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/api/areas').then(response => {
        if (mounted) {
          setAreas(response.data.areas);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => history.push('/story')}>
          <KeyboardArrowLeft style={{ fill: '#692B40' }} />
          <span className={classes.navText}>back</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px'
              }}>
              <span className={classes.title}>Suggest focus areas</span>
              <span className={classes.subTitle}>Available areas</span>
              <div
                style={{
                  borderRight: '2px dashed #C57D7D'
                }}>
                {areas.map(area => {
                  return <AreaCard key={area.image} area={area} />;
                })}
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '20px',
                marginTop: '62px'
              }}>
              <span className={classes.subTitle}>Bessie's focus areas</span>
              <div>areas</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestArea;
