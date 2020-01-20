import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDown } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
    justifyContent: 'space-between'
  },
  sortText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.1px',
    color: '#323C47'
  },
  navText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: '#692B40'
  },
  navPanel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '60px',
    marginTop: '10px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  }
}));

export const Toolbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={classes.sortText}>Sort by</span>
        <div style={{ display: 'flex' }}>
          <div className={classes.navPanel}>
            <span className={classes.navText}>Last active date</span>
            <KeyboardArrowDown
              style={{ fill: '#692B40', marginLeft: '30px', cursor: 'pointer' }}
            />
          </div>
          <div className={classes.navPanel}>
            <span className={classes.navText}>New to old</span>
            <KeyboardArrowDown
              style={{ fill: '#692B40', marginLeft: '30px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
