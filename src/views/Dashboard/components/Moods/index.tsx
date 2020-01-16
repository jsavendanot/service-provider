import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { MoodOverTime } from './components';

const useStyles = makeStyles(() => ({
  goaBoxStepText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  goalBoxCompletedText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '129.69%',
    color: '#692B40'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: '#B7B7B8'
  }
}));

export type MoodsProps = {
  numberOfJournals: number;
  date: string;
};
export const Moods: React.FC<MoodsProps> = ({ numberOfJournals, date }) => {
  const classes = useStyles();

  /** Mood over time */
  const data = {
    thisWeek: {
      data: [],
      labels: []
    },
    thisMonth: {
      data: [],
      labels: []
    },
    thisYear: {
      data: [0, 2, 2, 1, 3, 5, 4, 4],
      labels: ['12/9', '13/9', '14/9', '15/9', '16/9', '17/9', '18/9']
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
          <img
            src="/images/dashboard/goal_mood_icon.svg"
            alt=""
            style={{ marginRight: '10px' }}
          />
          <span className={classes.goaBoxStepText}>
            + {numberOfJournals} journals
          </span>
        </div>
        <span className={classes.value}>{date}</span>
      </div>
      <div style={{ padding: '20px 0' }}>
        <MoodOverTime data={data.thisYear.data} labels={data.thisYear.labels} />
      </div>
    </div>
  );
};

export default Moods;
