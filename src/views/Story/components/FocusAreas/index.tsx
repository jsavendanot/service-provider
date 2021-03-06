import React from 'react';
import { FocusArea } from 'types/other';
import useRouter from 'common/utils/useRouter';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button, AreaBox } from 'common/components';

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
  action: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

type Props = {
  myAreas: FocusArea[];
};

export const FocusAreas: React.FC<Props> = ({ myAreas }) => {
  const classes = useStyles();
  const { history } = useRouter();

  return (
    <div className={classes.root}>
      <span className={classes.title}>My focus areas</span>
      <span className={classes.note}>
        A service provider can suggest new focus areas here or when creating a
        new goal.
      </span>
      <div className={classes.areas}>
        <Grid container justify="space-around" spacing={3}>
          {myAreas.map(area => {
            return (
              <Grid item xs={5} key={area.id}>
                <AreaBox
                  id={area.id}
                  background={area.color}
                  name={area.name}
                  image={area.image}
                />
              </Grid>
            );
          })}
          <Grid item xs={5} />
        </Grid>
      </div>
      <div className={classes.action}>
        <div style={{ width: '91px', marginTop: '20px', marginLeft: '50px' }}>
          <Button
            type="primarySmall"
            click={() => history.push('/suggest/story')}>
            <Add style={{ marginRight: '5px' }} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusAreas;
