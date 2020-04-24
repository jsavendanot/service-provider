import React, { useState, MouseEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Avatar, Hidden, Menu, MenuItem, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ArrowDropDown } from '@material-ui/icons';
import queryString from 'query-string';

import { Button } from 'common/components';
import { RouteComponentProps } from 'react-router-dom';
import { acceptInvitation } from 'slices/invitation/action';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#DEE9FE'
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px 20px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#37474F'
  },
  desc: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  bigAvatar: {
    margin: 10,
    width: 152,
    height: 152
  },
  heyText: {
    fontFamily: 'Play',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#692B40',
    transform: 'rotate(-14.66deg)',
    position: 'absolute',
    top: 6,
    right: -48
  },
  line1: {
    width: '35.85px',
    border: '2px solid #692B40',
    transform: 'rotate(-33.22deg)',
    position: 'absolute',
    top: 7,
    right: -23
  },
  line2: {
    width: '35.85px',
    border: '2px solid #692B40',
    transform: 'rotate(-4.96deg)',
    position: 'absolute',
    top: 38,
    right: -37
  },
  buttonContainer: {
    width: '100%',
    margin: '10px 0',
    padding: '0 20%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '25px 15px 15px'
  },
  menuBox: {
    display: 'flex',
    alignItems: 'center'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#692B40'
  },
  headerMenuItemText: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#B7C38C'
  },
  headerLogo: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '10px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '20px'
    }
  }
}));

const Invitation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const { location } = history;
  const dispatch = useDispatch();

  const invitationValues = queryString.parse(location.search);

  useEffect(() => {
    dispatch(
      acceptInvitation(
        invitationValues.id ? (invitationValues.id as string) : ''
      )
    );
  }, [dispatch, invitationValues.id]);

  /** Header menus */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<Element | null>(null);

  const handleClick2 = (event: MouseEvent) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12}>
          <div className={classes.header}>
            <img
              src="/images/landing/logo.svg"
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
            <Hidden smDown>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <div style={{ marginRight: '50px' }}>
                  <div className={classes.menuBox} onClick={handleClick}>
                    <span className={classes.headerMenuText}>How It Works</span>
                    <ArrowDropDown
                      style={{ fill: '#692B40', marginLeft: '10px' }}
                    />
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                      <span className={classes.headerMenuItemText}>
                        Create A Recovery Plan
                      </span>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <span className={classes.headerMenuItemText}>
                        Access Other&apos;s Recovery Plan
                      </span>
                    </MenuItem>
                  </Menu>
                </div>
                <div style={{ marginRight: '50px' }}>
                  <div className={classes.menuBox} onClick={handleClick2}>
                    <span className={classes.headerMenuText}>Information</span>
                    <ArrowDropDown
                      style={{ fill: '#692B40', marginLeft: '10px' }}
                    />
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleMenuClose2}>
                    <MenuItem onClick={handleMenuClose2}>
                      <span className={classes.headerMenuItemText}>
                        About Us
                      </span>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose2}>
                      <span className={classes.headerMenuItemText}>
                        Privacy
                      </span>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <span className={classes.headerMenuItemText}>FAQ</span>
                    </MenuItem>
                  </Menu>
                </div>
                <span
                  className={classes.headerMenuText}
                  style={{ marginRight: '50px' }}
                  onClick={() => history.push('/home')}>
                  Sign In
                </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '96px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    marginRight: '20px',
                    padding: '5px'
                  }}>
                  <span
                    className={classes.headerMenuText}
                    onClick={() => history.push('/home')}>
                    Sign Up
                  </span>
                </div>
              </div>
            </Hidden>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <span className={classes.title}>
            <div style={{ textAlign: 'center' }}>
              You are received an invitation from
              <br />
              {invitationValues.inviter} to be involved in
              <br />
              your recovery plan!
            </div>
          </span>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <div className={classes.avatarContainer}>
            <div className={classes.line1} />
            <div className={classes.heyText}>Hey!</div>
            <div className={classes.line2} />
            <Avatar
              src={
                invitationValues.profile
                  ? (invitationValues.profile as string)
                  : ''
              }
              alt=""
              className={classes.bigAvatar}
            />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <span className={classes.desc}>
            <div style={{ textAlign: 'center' }}>
              By signing up or logging if you already have an account.
            </div>
          </span>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          className={classes.flexItem}
          style={{ flexDirection: 'column' }}>
          <div className={classes.buttonContainer}>
            <Button type="secondary" click={() => history.push('/home')}>
              Log in
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button type="primary" click={() => history.push('/home')}>
              Create account
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Invitation;
