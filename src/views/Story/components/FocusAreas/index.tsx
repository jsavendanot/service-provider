import React, { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { Area } from 'types/story';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button } from 'components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginBottom: '10px'
  },
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    marginBottom: '20px'
  },
  areas: {
    padding: '10px'
  },
  areaBox: {
    width: '160px',
    height: '144px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  imageContainer: {
    padding: '10px 0',
    boxSizing: 'border-box'
  },
  nameContainer: {
    background: '#FFFFFF',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0',
    width: '100%'
  },
  areaNameText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    color: '#692B40'
  }
}));

export const FocusAreas: React.FC = () => {
  const classes = useStyles();

  const [myStory, setMyStory] = useState<Area[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/api/mystory').then(response => {
        if (mounted) {
          setMyStory(response.data.mystory);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.title}>My focus areas</span>
      <span className={classes.note}>
        A service provider can suggest new focus areas here or when creating a
        new goal.
      </span>
      <div className={classes.areas}>
        <Grid container justify="space-around" spacing={3}>
          {myStory.map(story => {
            return (
              <Grid item xs={5} key={story.id}>
                <div
                  className={classes.areaBox}
                  style={{ background: `${story.background}` }}>
                  <div className={classes.imageContainer}>
                    <img
                      src={`${story.image}`}
                      alt=""
                      style={{ maxHeight: '140px' }}
                    />
                  </div>
                  <div className={classes.nameContainer}>
                    <span className={classes.areaNameText}>{story.name}</span>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div style={{ width: '91px', marginTop: '20px', marginLeft: '50px' }}>
        <Button type="primarySmall">
          <Add style={{ marginRight: '5px' }} />
          Add
        </Button>
      </div>
    </div>
  );
};

export default FocusAreas;
