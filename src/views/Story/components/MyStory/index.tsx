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

export const MyStory: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.name}>Bessie Richards</span>
      <div className={classes.story}>
        I was born and bred in Green Island, Australia. I grew up swimming with
        my friends from the ocean - just like a mermaid. I lost my parents when
        I was young so Rudy, the giant red crab and Nemo, the fish are the most
        important friends for me. My life is mostly happy but I hate tsunami
        because it destroys my home and I will have to rebuild it. I educated
        myself by the magazines that were brought by the sea. I love to learn
        new things from the mainland and I hope one day I can leave this small
        island and start my adventure there.
      </div>
    </div>
  );
};

export default MyStory;
