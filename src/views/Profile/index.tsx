import React, { useState, ChangeEvent } from 'react';

import { Grid, Tabs, Tab, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';
import { General, Health } from './components';

const useStyles = makeStyles(() => ({
  root: {},
  /** Profile */
  menu: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  /** Save Button */

  /** Tabs */
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#000000'
    }
  },
  tabLabelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#692B40',
    textTransform: 'capitalize'
  },
  divider: {
    border: '1px solid #C57D7D'
  }
}));

type ProfileProps = {};
export const Profile: React.FC<ProfileProps> = ({}) => {
  const classes = useStyles();
  /** Tabs */
  const [tab, setTab] = useState('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    switch (value) {
      case 'general': {
        return setTab('general');
      }
      case 'health': {
        return setTab('health');
      }
      default:
        return;
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={3}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '35px'
          }}>
          <span className={classes.menu}>Profile</span>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div style={{ padding: '20px 0' }}>
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable">
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={
                  <span className={classes.tabLabelText}>{tab.label}</span>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          {tab === 'general' && <General />}
          {tab === 'health' && <Health />}
        </div>
      </Grid>
      <Grid item xs={3}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '25px'
          }}>
          <div
            style={{
              width: '136px'
            }}>
            <Button type="primary" disabled>
              Save Changes
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Profile;
