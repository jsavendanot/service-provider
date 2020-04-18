import React, { useState } from 'react';
import clsx from 'clsx';
import { Goal } from 'types/goal';

import { makeStyles } from '@material-ui/styles';

import {
  CircularProgress,
  MoodOverTime,
  LinearProgress,
  AverageMood
} from './components';
import { JournalChart } from 'types/journey';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0'
  },
  tabDate: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#C57D7D'
  },
  tabSubMenuBoxActive: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    padding: '10px 0',
    border: '0.5px solid #DFDFDF',
    boxSizing: 'border-box',
    borderRadius: 1,
    borderBottom: '5px solid #F79221'
  },
  tabSubMenuBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    padding: '10px 0',
    border: '0.5px solid #DFDFDF',
    boxSizing: 'border-box',
    borderRadius: 1
  },
  tabSubMenuTextActive: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#692B40'
  },
  tabSubMenuText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#EBB6B6'
  },
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
  journalsChart: JournalChart[];
};

const SummaryBox: React.FC<Props> = ({ journalsChart }) => {
  const classes = useStyles();

  const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);

  /** Tabs */
  const [tab, setTab] = useState('goals');

  const handleTabsChange = (value: string) => {
    switch (value) {
      case 'mood': {
        return setTab('mood');
      }
      case 'goals': {
        return setTab('goals');
      }
      default:
        return;
    }
  };

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
    <>
      <div className={classes.tabContainer}>
        <span className={classes.tabDate}>{`${moment(
          journalsChart.length > 0
            ? journalsChart[0].CreatedOnDate
            : new Date().toDateString()
        ).format('MMMM Do YYYY')} - 
        ${moment(new Date().toDateString()).format('MMMM Do YYYY')}`}</span>
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            className={clsx(
              tab === 'mood' && classes.tabSubMenuBoxActive,
              tab !== 'mood' && classes.tabSubMenuBox
            )}
            onClick={() => handleTabsChange('mood')}>
            {journalsChart.length > 0 && (
              <AverageMood
                tab={tab}
                feelings={[...journalsChart.map(item => item.HowAreYouFeeling)]}
              />
            )}
            <span
              className={clsx(
                tab === 'mood' && classes.tabSubMenuTextActive,
                tab !== 'mood' && classes.tabSubMenuText
              )}>
              Averga Mood
            </span>
          </div>
          <div
            className={clsx(
              tab === 'goals' && classes.tabSubMenuBoxActive,
              tab !== 'goals' && classes.tabSubMenuBox
            )}
            onClick={() => handleTabsChange('goals')}>
            <CircularProgress
              value={
                goals.length > 0
                  ? (goals.filter(item => item.PercentageComplete === 1)
                      .length /
                      goals.length) *
                    100
                  : 0
              }
              active
            />

            <span
              className={clsx(
                tab === 'goals' && classes.tabSubMenuTextActive,
                tab !== 'goals' && classes.tabSubMenuText
              )}>
              Goals Achieved
            </span>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '20px' }}>
          {tab === 'mood' && (
            <MoodOverTime data={data.data} labels={data.labels} />
          )}
          {tab === 'goals' && (
            <>
              {goals
                .filter(item => item.PercentageComplete === 1)
                .map(goal => {
                  return <LinearProgress key={goal.Id} goal={goal} />;
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SummaryBox;
