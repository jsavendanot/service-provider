import React, { useState, ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Theme } from '@material-ui/core';

import { SummaryBox } from './components';
import { JournalChart } from 'types/journey';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    padding: '20px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    },
    '& .MuiTab-root': {
      minWidth: '72px'
    },
    marginBottom: '10px',
    padding: '0'
  },
  summaryTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#C57D7D'
  }
}));

const Summary: React.FC = () => {
  const classes = useStyles();

  const journalsChart: JournalChart[] = useSelector(
    (state: RootState) => state.journey.journalsChart
  );

  /** Tabs */
  const [tab, setTab] = useState('week');

  const tabs = [
    { value: 'all', label: 'ALL' },
    { value: 'week', label: 'WEEK' },
    { value: 'month', label: 'MONTH' },
    { value: 'year', label: 'YEAR' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    switch (value) {
      case 'all': {
        return setTab('all');
      }
      case 'week': {
        return setTab('week');
      }
      case 'month': {
        return setTab('month');
      }
      case 'year': {
        return setTab('year');
      }
      default:
        return;
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable">
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              label={<span className={classes.summaryTitle}>{tab.label}</span>}
              value={tab.value}
            />
          ))}
        </Tabs>
        {tab === 'all' && <SummaryBox journalsChart={journalsChart} />}
        {tab === 'week' && <SummaryBox journalsChart={journalsChart} />}
        {tab === 'month' && <SummaryBox journalsChart={journalsChart} />}
        {tab === 'year' && <SummaryBox journalsChart={journalsChart} />}
      </div>
    </>
  );
};

export default Summary;
