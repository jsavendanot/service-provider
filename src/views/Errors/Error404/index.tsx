import React, { useState, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ArrowDropDown } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundColor: '#FFEAEA'
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
  notice: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  noticeText: {
    width: '540px',
    fontFamily: 'Scada',
    fontWeight: 'normal',
    fontStyle: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    marginBottom: '50px'
  },
  goBackText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#692B40',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Error404: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  /** Header menus */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (id: string) => {
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
    <div className={classes.root}>
      <Grid container style={{ height: '100%' }}>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          style={{ height: '100px', marginLeft: '30px' }}>
          <Grid item xs={6}>
            <img src="/images/landing/logo.svg" alt="" />
          </Grid>
          <Grid item xs>
            <div className={classes.menuBox}>
              <span className={classes.headerMenuText}>How It Works</span>
              <IconButton onClick={handleClick}>
                <ArrowDropDown style={{ fill: '#692B40' }} />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose('')}>
              <MenuItem onClick={() => handleMenuClose('')}>
                <span className={classes.headerMenuItemText}>
                  Create A Recovery Plan
                </span>
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose('')}>
                <span className={classes.headerMenuItemText}>
                  Access Other's Recovery Plan
                </span>
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs>
            <div className={classes.menuBox}>
              <span className={classes.headerMenuText}>Information</span>
              <IconButton onClick={handleClick2}>
                <ArrowDropDown style={{ fill: '#692B40' }} />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleMenuClose2}>
              <MenuItem onClick={handleMenuClose2}>
                <span className={classes.headerMenuItemText}>About Us</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose2}>
                <span className={classes.headerMenuItemText}>Privacy</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose2}>
                <span className={classes.headerMenuItemText}>FAQ</span>
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs>
            <span
              className={classes.headerMenuText}
              style={{ marginLeft: '30px', cursor: 'pointer' }}
              onClick={() => history.push('/auth')}>
              Sign In
            </span>
          </Grid>
          <Grid item xs>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '96px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                marginRight: '20px',
                padding: '5px',
                cursor: 'pointer'
              }}>
              <span
                className={classes.headerMenuText}
                onClick={() => history.push('/auth')}>
                Sign Up
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <div className={classes.notice}>
              <div className={classes.noticeText}>
                The page you were looking for doesn’t exist.
              </div>
              <div
                className={classes.goBackText}
                onClick={() => history.goBack()}>
                Go back
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img src="/images/error/404.svg" alt="" />
          </Grid>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </div>
  );
};

export default Error404;
