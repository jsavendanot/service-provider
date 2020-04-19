import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0 10px'
  },
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  }
}));

type Props = {
  name: string;
  note: string;
};

export const AreaSection: React.FC<Props> = ({ name, note, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.subTitle}>{name}</span>
      <span className={classes.note}>{note}</span>
      <div style={{ padding: '10px 0' }}>{children}</div>
    </div>
  );
};

export default AreaSection;
