import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Area } from 'types/story';
import axios from 'utils/axios';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { AreaSection, GoalForm } from './components';

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
  }
}));

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const SuggestGoal: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  const [areas, setAreas] = useState<Area[]>([]);
  const [myAreas, setMyAreas] = useState<Area[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchAreas = () => {
      axios.get('/api/areas').then(response => {
        if (mounted) {
          setAreas(response.data.areas);
        }
      });
    };

    const fetchMyAreas = () => {
      axios.get('/api/myareas').then(response => {
        if (mounted) {
          setMyAreas(response.data.myareas);
        }
      });
    };

    fetchAreas();
    fetchMyAreas();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRemove = (id: number) => {
    myAreas.splice(
      myAreas.findIndex(area => area.id === id),
      1
    );
    setMyAreas([...myAreas]);
  };

  const handleAdd = (id: number) => {
    const addedArea: Area[] = areas.filter(area => area.id === id);
    setMyAreas(value => [...value].concat(addedArea));
  };

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
          onClick={() => history.push('/goals')}>
          <KeyboardArrowLeft style={{ fill: '#692B40' }} />
          <span className={classes.navText}>back</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={6}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px'
              }}>
              <span className={classes.title}>Suggest goal</span>
              <div style={{ borderBottom: '2px dashed #C57D7D' }}>
                <AreaSection
                  name="Focus areas"
                  areas={myAreas}
                  note="These areas can be modified by the consumer in ‘My Story’."
                  actionType="remove"
                  action={id => handleRemove(id)}
                />
              </div>
              <AreaSection
                name="Other areas"
                areas={areas.filter(
                  area => !myAreas.find(item => item.id === area.id)
                )}
                note="A service provider can suggest new focus aress using."
                actionType="add"
                action={id => handleAdd(id)}
              />
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <GoalForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestGoal;
