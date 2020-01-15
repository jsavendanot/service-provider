import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#692B40'
  },
  /** Search Input */
  input: {
    marginLeft: '8px',
    '& .MuiInputBase-input': {
      color: '#FFFFFF'
    }
  },
  iconButton: {
    padding: 10
  },
  /** Menu */
  topMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '50px',
    cursor: 'pointer'
  },
  topMenuText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    color: '#FFFFFF'
  },
  menuIcon: {
    width: '25px',
    height: '18px',
    marginBottom: '2px'
  }
}));

type Props = {
  className: string;
  onOpenNavBarMobile: () => void;
};

const TopBar: React.FC<Props> = (props: Props) => {
  const { className } = props;

  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <img src="/images/landing/logo.svg" alt="" />
          </Grid>
          <Grid item xs={5}>
            <InputBase
              className={classes.input}
              placeholder="Search consumer"
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search">
              <Search style={{ fill: '#FFEAEA' }} />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingTop: '11px'
                }}>
                <div className={classes.topMenu}>
                  <img
                    src="/images/topbar/consumers.svg"
                    alt=""
                    className={classes.menuIcon}
                  />
                  <span className={classes.topMenuText}>Consumer</span>
                </div>
                <div className={classes.topMenu}>
                  <img
                    src="/images/topbar/invites.svg"
                    alt=""
                    className={classes.menuIcon}
                  />
                  <span className={classes.topMenuText}>Invites</span>
                </div>
                <div className={classes.topMenu}>
                  <img
                    src="/images/topbar/notif.svg"
                    alt=""
                    className={classes.menuIcon}
                  />
                  <span className={classes.topMenuText}>Notifications</span>
                </div>
                <div className={classes.topMenu}>
                  <img
                    src="/images/topbar/settings.svg"
                    alt=""
                    className={classes.menuIcon}
                  />
                  <span className={classes.topMenuText}>Settings</span>
                </div>
                <img
                  src="/images/topbar/service_provider.svg"
                  alt=""
                  style={{ marginBottom: '5px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
