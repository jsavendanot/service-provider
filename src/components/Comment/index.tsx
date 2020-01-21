import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Avatar, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D',
    cursor: 'pointer'
  },
  root: {
    width: '445px',
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
    height: 50,
    boxShadow: '3px 5px 5px rgba(0, 0, 0, 0.25)'
  },
  commentName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#692B40'
  },
  commentDate: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  }
}));

interface Comment {
  name: string;
  avatar: string;
  text: string;
  favorite: boolean;
}

type Props = {
  comment: Comment;
};

const Comment: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { comment } = props;
  return (
    <div className={classes.root}>
      <div style={{ margin: '0px 20px' }}>
        <span className={classes.commentName}>{comment.name}</span>
        <Avatar
          alt=""
          className={classes.avatar}
          src={'/images/avatar/' + comment.avatar}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}>
        <div style={{ overflowWrap: 'break-word' }}>
          <span>{comment.text}</span>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px'
          }}>
          <span className={classes.commentDate}>15 Jul</span>
          <span className={classes.label}>Reply</span>
        </div>
      </div>
      <IconButton>
        {comment.favorite ? (
          <Favorite style={{ fill: '#FA7268' }} />
        ) : (
          <Favorite style={{ fill: '#FFEAEA' }} />
        )}
      </IconButton>
    </div>
  );
};

export default Comment;
