import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20px 10px',
    boxSizing: 'border-box',
    borderRadius: '13px',
    marginTop: '18px',
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 50,
    height: 50
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  commentId: string;
  id: string;
  name: string;
  message: string;
  favorite?: boolean;
  date: string;
  image: string;
};

const Comment: React.FC<Props> = ({
  commentId,
  id,
  name,
  message,
  date,
  favorite = true,
  image
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <span className={classes.text}>{name}</span>
            <Avatar
              alt=""
              className={classes.avatar}
              src={'data:image/png;base64,' + image}
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ overflowWrap: 'break-word' }}>
            <span>{message}</span>
          </div>
          <div style={{ marginTop: '5px' }}>
            <span className={classes.text}>{moment(date).format('LLLL')}</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div>
            {favorite ? (
              <Favorite style={{ fill: '#FA7268' }} />
            ) : (
              <Favorite style={{ fill: '#D5F2E3' }} />
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Comment;
