import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#75B7FF'
  },
  feelingsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0 30px',
    width: '100%'
  },
  selectedFeeling: {
    border: '3px solid #003E1F',
    borderRadius: '25px'
  }
}));

type Props = {
  feeling: string;
};

export const Moods: React.FC<Props> = ({ feeling }) => {
  const classes = useStyles();
  return (
    <div>
      <span className={classes.subTitle}>Mood</span>
      <div className={classes.feelingsContainer}>
        <img
          src="/images/journey/feelings/5.svg"
          alt=""
          className={clsx(feeling === 'VeryHappy' && classes.selectedFeeling)}
        />
        <img
          src="/images/journey/feelings/4.svg"
          alt=""
          className={clsx(feeling === 'Happy' && classes.selectedFeeling)}
        />
        <img
          src="/images/journey/feelings/3.svg"
          alt=""
          className={clsx(feeling === 'Neutral' && classes.selectedFeeling)}
        />
        <img
          src="/images/journey/feelings/2.svg"
          alt=""
          className={clsx(feeling === 'Sad' && classes.selectedFeeling)}
        />
        <img
          src="/images/journey/feelings/1.svg"
          alt=""
          className={clsx(feeling === 'VerySad' && classes.selectedFeeling)}
        />
      </div>
    </div>
  );
};

export default Moods;
