import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  /** Navigation and Title */
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  formTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#692B40'
  }
}));

type Props = {
  back: () => void;
};

const Organisation: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { back } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <div className={classes.navigation}>
          <div
            className={classes.navigation}
            style={{ marginRight: '50px' }}
            onClick={back}>
            <IconButton style={{ padding: '0' }}>
              <ArrowBackIos style={{ fill: '#692B40' }} />
            </IconButton>
            <span className={classes.navText}>BACK</span>
          </div>
          <span className={classes.formTitle}>
            Service Provider Registration - Organisation
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Organisation;
