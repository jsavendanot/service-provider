import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginBottom: '17px'
  },
  story: {
    width: '486px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'justify'
  }
}));

type Props = {
  storyText: string;
};

export const MyStory: React.FC<Props> = ({ storyText }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.name}>
        {`${sessionStorage.getItem('FirstName')} ${sessionStorage.getItem(
          'SurName'
        )}`}
      </span>
      <div className={classes.story}>{storyText}</div>
    </div>
  );
};

export default MyStory;
