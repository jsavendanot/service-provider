import React, { useState, ChangeEvent } from 'react';

import { Grid, Tabs, Tab, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { General, Health } from './components';
import { NotReadyPopup } from 'common/components';

const useStyles = makeStyles(() => ({
  /** Profile */
  nameContainer: {
    padding: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '26px',
    lineHeight: '22px',
    color: '#000000',
    textAlign: 'center'
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
  avatar: {
    marginTop: '20px',
    width: '100px',
    height: '100px'
  }
}));

export const Consumer: React.FC = () => {
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
        return setNotReady(true);
      }
      default:
        return;
    }
  };

  /** Dialog */
  const [notReady, setNotReady] = useState(false);

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={3}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '35px',
              position: 'relative'
            }}>
            <div className={classes.nameContainer}>
              {`${sessionStorage.getItem('FirstName')!} 
            ${sessionStorage.getItem('SurName')!}`}
            </div>
            <Avatar
              alt=""
              className={classes.avatar}
              src={'data:image/png;base64,' + sessionStorage.getItem('Photo')!}
            />
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
            {tab === 'general' && <General />}
            {tab === 'health' && <Health />}
          </div>
        </Grid>
        <Grid item xs={3}>
          {/* <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '25px'
          }}>
          <div
            style={{
              width: '180px'
            }}>
            <Button type="primary" disabled>
              Save Changes
            </Button>
          </div>
        </div> */}
        </Grid>
      </Grid>
      {notReady && (
        <NotReadyPopup open={notReady} close={() => setNotReady(false)} />
      )}
    </>
  );
};

export default Consumer;
