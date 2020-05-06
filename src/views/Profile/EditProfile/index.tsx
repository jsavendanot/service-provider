import React, { useEffect } from 'react';

import useRouter from 'common/utils/useRouter';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, Save } from '@material-ui/icons';

import { Profile as ProfileType } from 'types/profile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchProfile } from 'slices/profile/action';
import { Loading } from 'common/components';

const useStyles = makeStyles(() => ({
  gridItem: {
    backgroundColor: '#FFFAEA',
    padding: '30px 0 20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  /** Profile Image */
  uploadButton: {
    width: '84px',
    height: '30px',
    background: '#692B40',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '28px',
    color: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0',
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
  uploadButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  providerName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginTop: '5px'
  },
  /** Content */
  content: {
    padding: '20px 0'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000',
    marginTop: '5px',
    marginBottom: '10px'
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
    marginRight: '20px',
    width: '100px'
  },
  value: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D'
  },
  button: {
    width: '100px',
    padding: '5px',
    border: '1px solid #C57D7D',
    borderRadius: '50px',
    color: '#692B40',
    background: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#C57D7D'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  elementGroup: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0'
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    textTransform: 'uppercase'
  }
}));

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const profile: ProfileType = useSelector(
    (state: RootState) => state.profile.profile!
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Grid container>
        <Grid item xs={12} className={classes.gridItem}>
          <Grid container justify="center">
            <Grid item xs={1}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => history.goBack()}>
                <KeyboardArrowLeft style={{ fill: '#692B40' }} />
                <span className={classes.navText}>back</span>
              </div>
            </Grid>
            <Grid item xs={8}>
              <span className={classes.title}>Profile</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '10px'
                  }}>
                  <Avatar
                    alt=""
                    className={classes.avatar}
                    src={profile.ImageUrl}
                  />
                  <span
                    className={
                      classes.providerName
                    }>{`Dr ${profile.FirstName}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '30px'
                  }}>
                  <button className={classes.uploadButton}>
                    <span className={classes.uploadButtonText}>upload</span>
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={7}>
              <div className={classes.content}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '20px'
                  }}>
                  <button className={classes.button}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Save style={{ fill: '#692B40', marginRight: '8px' }} />
                      <span className={classes.buttonText}>Save</span>
                    </div>
                  </button>
                </div>
                <div className={classes.elementGroup}>
                  <span className={classes.subTitle}>Name</span>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div style={{ marginRight: '40px' }}>
                      <span className={classes.name}>Title</span>
                      <span className={classes.value}>Dr</span>
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <span className={classes.name}>Full name</span>
                      <span className={classes.value}>
                        {`${profile.FirstName!}
                      ${profile.Surname}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.elementGroup}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <div className={classes.element}>
                      <span className={classes.subTitle}>Practice</span>
                      <span className={classes.value}>...</span>
                    </div>
                    <div className={classes.element}>
                      <span className={classes.subTitle}>Service</span>
                      <span className={classes.value}>...</span>
                    </div>
                    <div className={classes.element}>
                      <span className={classes.subTitle}>Organisation</span>
                      <span className={classes.value}>...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.elementGroup}>
                <div className={classes.element}>
                  <span className={classes.subTitle}>Work Address</span>
                  <span className={classes.value}>...</span>
                </div>
              </div>
              <div className={classes.elementGroup}>
                <span className={classes.subTitle}>Contact Details</span>
                <div style={{ display: 'flex', margin: '10px 0' }}>
                  <div style={{ marginRight: '50px' }}>
                    <span className={classes.name}>Work</span>
                    <span className={classes.value}>...</span>
                  </div>
                  <div style={{ marginRight: '50px' }}>
                    <span className={classes.name}>Mobile</span>
                    <span className={classes.value}>{profile.MobilePhone}</span>
                  </div>
                  <div style={{ marginRight: '50px' }}>
                    <span className={classes.name}>Email</span>
                    <span className={classes.value}>{profile.UserEmail}</span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
