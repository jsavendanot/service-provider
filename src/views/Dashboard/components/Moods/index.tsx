import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { MoodOverTime } from './components';
import { JournalChart } from 'types/journey';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import moment from 'moment';

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

  const journalsChart: JournalChart[] = useSelector(
    (state: RootState) => state.journey.journalsChart
  );

  /** Mood over time */
  const data = {
    data: [...journalsChart.map(item => item.HowAreYouFeeling)],
    labels: [
      ...journalsChart.map(item =>
        moment(item.CreatedOnDate).format('MMMM Do, h:mm a')
      )
    ]
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
            {numberOfJournals} journals
          </span>
        </div>
        <span className={classes.value}>{date}</span>
      </div>
      <div style={{ padding: '20px 0' }}>
        <MoodOverTime data={data.data} labels={data.labels} />
      </div>
    </div>
  );
};

export default Moods;
