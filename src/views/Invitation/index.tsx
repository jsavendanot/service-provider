import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Avatar, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import { Button } from 'common/components';
import { RouteComponentProps } from 'react-router-dom';
import { acceptInvitation } from 'slices/invitation/action';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#FFEAEA'
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
  headerMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    marginRight: '20px'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D'
  },
  headerButton: {
    width: '109px',
    padding: '5px',
    border: '1.5px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '18px',
    color: '#C57D7D',
    background: '#FFEAEA',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFEAEA'
    },
    '&:active': {
      backgroundColor: '#FFEAEA'
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

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12}>
          <div className={classes.header}>
            <img
              src="/images/landing/logo.svg"
              alt=""
              style={{ cursor: 'pointer', marginLeft: '20px' }}
              onClick={() => history.push('/')}
            />
            <div className={classes.headerMenu}>
              <span
                className={classes.headerMenuText}
                style={{ marginRight: '20px' }}>
                Help
              </span>
              <button
                className={clsx(classes.headerButton, classes.headerMenuText)}
                onClick={() => history.push('/auth')}>
                Sign in
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <div className={classes.title}>
            <div style={{ textAlign: 'center' }}>
              You are invited to be involved
              <br />
              in {invitationValues.inviter} wellbeing plan as
              <br />
              service provider!
            </div>
          </div>
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
              Join {` ${invitationValues.inviter}’s `} network now by creating
              an account or logging in if you
              <br />
              already have an account on Jiemba.
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
