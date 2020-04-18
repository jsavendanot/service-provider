import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  moodTabImageActive: {
    width: '44px',
    height: '44px',
    margin: '10px',
    opacity: '1'
  },
  moodTabImage: {
    width: '44px',
    height: '44px',
    margin: '10px',
    opacity: '0.3'
  }
}));

type Props = {
  tab: string;
  feelings: number[];
};

export const AverageMood: React.FC<Props> = ({ tab, feelings }) => {
  const classes = useStyles();

  const sum = feelings.reduce((a, b) => a + b, 0);
  const averageMood = Math.round(sum / feelings.length);

  return (
    <img
      src={`/images/journey/feelings/${averageMood}.svg`}
      alt=""
      className={clsx(
        tab === 'mood' && classes.moodTabImageActive,
        tab !== 'mood' && classes.moodTabImage
      )}
    />
  );
};

export default AverageMood;
