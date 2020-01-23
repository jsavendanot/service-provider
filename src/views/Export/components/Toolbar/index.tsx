import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: '30px',
    display: 'flex',
    flexDirection: 'column'
  },
  iconBox: {
    width: '45px',
    height: '45px',
    background: '#692B40',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    margin: '20px 0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));

export const Toolbar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.iconBox}>
        <img src="/images/export/save.svg" alt="" />
      </div>
      <div className={classes.iconBox}>
        <img src="/images/export/email.svg" alt="" />
      </div>
      <div className={classes.iconBox}>
        <img src="/images/export/print.svg" alt="" />
      </div>
    </div>
  );
};

export default Toolbar;
