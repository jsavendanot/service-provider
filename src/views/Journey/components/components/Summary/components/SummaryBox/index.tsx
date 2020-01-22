import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'utils/axios';
import { GoalProps } from 'types/goals';

import { makeStyles } from '@material-ui/styles';

import { CircularProgress, MoodOverTime, LinearProgress } from './components';

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

const SummaryBox: React.FC = () => {
  const classes = useStyles();

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
    thisWeek: {
      data: [],
      labels: []
    },
    thisMonth: {
      data: [],
      labels: []
    },
    thisYear: {
      data: [0, 1, 3, 2, 3, 4, 5],
      labels: [
        '06 Jul',
        '07 Jul',
        '08 Jul',
        '09 Jul',
        '10 Jul',
        '11 Jul',
        '12 Jul'
      ]
    }
  };

  /** Fetch goals */
  const [goals, setGoals] = useState<GoalProps[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchNetwork = () => {
      axios.get('/api/goals').then(response => {
        if (mounted) {
          setGoals(response.data.goals);
        }
      });
    };

    fetchNetwork();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className={classes.tabContainer}>
        <span className={classes.tabDate}>06 Jul 2019 - 14 Sep 2019</span>
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            className={clsx(
              tab === 'mood' && classes.tabSubMenuBoxActive,
              tab !== 'mood' && classes.tabSubMenuBox
            )}
            onClick={() => handleTabsChange('mood')}>
            <img
              src="/images/journey/summary/mood.svg"
              alt=""
              className={clsx(
                tab === 'mood' && classes.moodTabImageActive,
                tab !== 'mood' && classes.moodTabImage
              )}
            />
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
            {tab === 'goals' ? (
              <CircularProgress value={67} active />
            ) : (
              <CircularProgress value={67} />
            )}
            <span
              className={clsx(
                tab === 'goals' && classes.tabSubMenuTextActive,
                tab !== 'goals' && classes.tabSubMenuText
              )}>
              67% of Goals
              <br />
              Achieved
            </span>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '20px' }}>
          {tab === 'mood' && (
            <MoodOverTime
              data={data.thisYear.data}
              labels={data.thisYear.labels}
            />
          )}
          {tab === 'goals' && (
            <>
              {goals.map(goal => {
                return <LinearProgress key={goal.id} goal={goal} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SummaryBox;
