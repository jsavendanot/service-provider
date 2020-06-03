import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

import { Grid, Theme, IconButton, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowDropDown, Menu } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  /** Header */
  header: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '20px'
  },
  headerMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D',
    cursor: 'pointer',
    marginRight: '20px'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '127.69%',
    color: '#C57D7D',
    cursor: 'pointer'
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
  },
  /** Image  */
  bottonImage: {
    position: 'absolute',
    bottom: 0,
    top: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: 200,
      height: 170,
      marginTop: '50px'
    },
    [theme.breakpoints.up('xs')]: {
      width: 250,
      height: 220,
      marginTop: '50px'
    },
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: 300,
      height: 270
    },
    [theme.breakpoints.up('md')]: {
      width: 350,
      height: 320
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '45px',
    color: '#37474F',
    marginTop: '5px'
  },
  firstRow: {
    marginBottom: '50px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    }
  },
  logo: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20px',
      width: 200,
      height: 50
    },
    [theme.breakpoints.up('xs')]: {
      marginBottom: '20px'
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '30px'
    }
  },
  row: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButton: {
    width: 151,
    height: 59,
    background: '#FFFFFF',
    borderRadius: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50px',
    cursor: 'pointer',
    '&:hover': {
      background: '#AE466A',
      boxShadow:
        '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px',
      marginLeft: 0
    }
  },
  arrowDown: {
    fill: '#73BA9B'
  },
  middleGrid: {
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      height: '130px'
    }
  },
  menuIcon: {
    fill: '#C57D7D',
    position: 'absolute',
    top: 0
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Landing: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.header}>
          <div className={classes.headerMenu}>
            <Hidden mdUp>
              <IconButton>
                <Menu fontSize="large" className={classes.menuIcon} />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <div className={classes.headerMenuText}>
                <span>Use Jiemba For...</span>
                <IconButton>
                  <ArrowDropDown className={classes.arrowDown} />
                </IconButton>
              </div>
              <div className={classes.headerMenuText}>
                <span>Information</span>
                <IconButton>
                  <ArrowDropDown className={classes.arrowDown} />
                </IconButton>
              </div>
            </Hidden>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} className={classes.middleGrid} />
      <Grid item xs={12} container justify="center">
        <div>
          <div className={classes.firstRow}>
            <img
              src="/images/landing/logo.svg"
              alt=""
              className={classes.logo}
            />
            <div className={classes.title}>For providing services</div>
          </div>
          <div className={classes.row}>
            <div
              className={classes.label}
              onClick={() => history.push('/auth')}>
              Create Account
            </div>
            <div className={classes.buttonContainer}>
              <div
                className={clsx(classes.label, classes.signInButton)}
                onClick={() => history.push('/auth')}>
                Sign in
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} container justify="center">
        <img
          src="/images/landing/gary.svg"
          alt=""
          className={classes.bottonImage}
        />
      </Grid>
    </Grid>
  );
};

export default Landing;
