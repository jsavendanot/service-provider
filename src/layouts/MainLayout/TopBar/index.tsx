import React, { useState } from 'react';
import clsx from 'clsx';
import useRouter from 'utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { ProviderDialog } from './components';

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
  },
  /** Profile Dialog */
  navProfile: {
    zIndex: 3,
    top: '64px',
    right: '0',
    position: 'fixed',
    background: '#FFFFFF',
    borderRadius: '6px',
    width: '201px',
    height: '258px',
    padding: '15px',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.24), 0px 2px 8px rgba(0, 0, 0, 0.12)'
  }
}));

type Props = {
  className: string;
  onOpenNavBarMobile: () => void;
};

const TopBar: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const { history } = useRouter();

  const classes = useStyles();

  /** Provile Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <img
              src="/images/landing/logo.svg"
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/home')}
            />
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
                  src="/images/topbar/provider_avatar.svg"
                  alt=""
                  style={{ marginBottom: '5px', cursor: 'pointer' }}
                  onClick={handleClickOpen}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent className={classes.navProfile}>
          <ProviderDialog />
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default TopBar;
