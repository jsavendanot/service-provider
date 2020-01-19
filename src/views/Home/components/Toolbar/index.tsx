import React from 'react';
import useRouter from 'utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDown, Add } from '@material-ui/icons';

import { Button } from 'components';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 80px',
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
  const { history } = useRouter();
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
      <div style={{ width: '186px' }}>
        <Button type="primary" click={() => history.push('/consumer/add')}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Add style={{ fill: '#FFFFFF', marginRight: '10px' }} />
            <span className={classes.buttonText}>Add consumer</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
