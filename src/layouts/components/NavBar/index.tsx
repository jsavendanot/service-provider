import React from 'react';
import clsx from 'clsx';
import useRouter from 'utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { Paper, Theme, Divider, Avatar } from '@material-ui/core';

import { Navigation } from 'components';
import navigationConfig from '../../navigationConfig';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    overflowY: 'auto',
    background: '#FFFFFF'
  },
  content: {
    padding: theme.spacing(1)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  divider: {
    border: '1px solid #E0E0E0'
  },
  /** Profile */
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40
  },
  profileName: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '10px',
    width: '150px',
    wordWrap: 'break-word'
  },
  profileDate: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '30px',
    letterSpacing: '0.15px',
    color: '#000000',
    marginTop: '-2px'
  },
  profileButton: {
    width: '142px',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    color: '#FFFFFF',
    background: '#692B40',
    cursor: 'pointer',
    margin: '10px 0 20px',
    padding: '7px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.15px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  /** Contact */
  contact: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 10px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0'
  },
  contactText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0.1px',
    color: '#C57D7D',
    width: '120px',
    wordWrap: 'break-word'
  }
}));

type Props = {
  className: string;
};

const NavBar: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const { history } = useRouter();

  const classes = useStyles();

  const navbarContent = (
    <div className={classes.content}>
      <nav className={classes.navigation}>
        <div className={classes.profile}>
          <Avatar
            alt=""
            className={classes.avatar}
            src="/images/avatar/avatar_1.svg"
          />
          <span className={classes.profileName}>Bessie Richard</span>
          <span className={classes.profileDate}>11/09/1990</span>
          <button
            className={classes.profileButton}
            onClick={() => history.push('/consumer')}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <img
                src="/images/consumer/consumer_icon.svg"
                alt=""
                style={{ marginRight: '5px' }}
              />
              <span className={classes.buttonText}>Profile</span>
            </div>
          </button>
        </div>
        <Divider className={classes.divider} />
        {navigationConfig.map(list => (
          <Navigation key={list.title} pages={list.pages} title={list.title} />
        ))}
        <div className={classes.contact}>
          <div className={classes.contactItem}>
            <img
              src="/images/navbar/call.svg"
              alt=""
              style={{ marginRight: '15px' }}
            />
            <div className={classes.contactText}>0412 345 678</div>
          </div>
          <div className={classes.contactItem}>
            <img
              src="/images/navbar/email.svg"
              alt=""
              style={{ marginRight: '15px' }}
            />
            <div className={classes.contactText}>kristen.ramos@example.com</div>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <Paper className={clsx(classes.root, className)} elevation={1} square>
        {navbarContent}
      </Paper>
    </>
  );
};

export default NavBar;
