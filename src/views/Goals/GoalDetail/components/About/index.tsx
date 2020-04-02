import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Step } from 'types/goal';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    width: '130px'
  },
  goalText: {
    padding: '10px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'justify'
  }
}));

export type Props = {
  goalDesc: string;
  steps: Step[];
};
export const About: React.FC<Props> = ({ goalDesc, steps }) => {
  const classes = useStyles();
  return (
    <div>
      <div style={{ margin: '20px 0' }}>
        <span className={classes.subTitle}>About this goal</span>
        <div className={classes.goalText}>{goalDesc}</div>
      </div>
      <div style={{ margin: '20px 0' }}>
        <span className={classes.subTitle}>Goal shared with</span>
        <div className={classes.goalText}></div>
      </div>
    </div>
  );
};

export default About;
