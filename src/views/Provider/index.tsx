import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  gridItem: {
    backgroundColor: '#FFFAEA',
    height: '254px',
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
    marginTop: '5px'
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
    marginRight: '10px'
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
    padding: '8px',
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
      backgroundColor: '#FFFFFF'
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
  }
}));

export default function Provider() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.gridItem}>
        <Grid container justify="center">
          <Grid item xs={7}>
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
                <img src="/images/profile/gary_avatar.svg" alt="" />
                <span className={classes.providerName}>Dr Gary</span>
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
                    <Edit style={{ fill: '#692B40', marginRight: '8px' }} />
                    <span className={classes.buttonText}>Edit</span>
                  </div>
                </button>
              </div>
              <div>
                <div style={{ padding: '10px' }}>
                  <span className={classes.subTitle}>Name</span>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div style={{ marginRight: '30px' }}>
                      <span className={classes.name}>Title</span>
                      <span className={classes.value}>Dr</span>
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <span className={classes.name}>Full name</span>
                      <span className={classes.value}>Gary Tart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
