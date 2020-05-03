import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';

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
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type Props = {
  save: () => void;
  email: () => void;
};

export const Toolbar: React.FC<Props> = ({ save, email }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <IconButton onClick={save} style={{ margin: '20px 0' }}>
          <div className={classes.iconBox}>
            <img src="/images/export/save.svg" alt="" />
          </div>
        </IconButton>
      </div>
      <div>
        <IconButton onClick={email} style={{ margin: '20px 0' }}>
          <div className={classes.iconBox}>
            <img src="/images/export/email.svg" alt="" />
          </div>
        </IconButton>
      </div>
    </div>
  );
};

export default Toolbar;
