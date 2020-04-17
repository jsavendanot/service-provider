import React, { useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { addNewComment } from 'slices/goal/action';
import { Grid, Avatar, TextField } from '@material-ui/core';

import { Button, Comment } from 'components';
import { GoalComment } from 'types/goal';

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
  avatar: {
    width: 50,
    height: 50
  },
  commentTextField: {
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px',
    margin: '0 10px'
  }
}));

type Props = {
  goalId: string;
  comments: GoalComment[];
};

export const Comments: React.FC<Props> = ({ goalId, comments }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (message.length > 1) {
      dispatch(
        addNewComment(goalId, message, sessionStorage.getItem('FirstName')!)
      );
      setMessage('');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
          <Grid item xs={2}>
            <Avatar
              alt=""
              className={classes.avatar}
              src={'/images/avatar/avatar_1.svg'}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              placeholder="Say something about this goal..."
              fullWidth
              multiline
              value={message}
              autoComplete="off"
              rows="2"
              className={classes.commentTextField}
              onChange={event => handleFieldChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                width: '110px',
                float: 'right',
                margin: '20px 0'
              }}>
              <Button type="primarySmall" click={handleCommentSubmit}>
                Comment
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '20px' }}>
        <span className={classes.label}>{`Comments (${comments.length})`}</span>
        {comments.map(comment => {
          return (
            <Comment
              key={comment.Id}
              commentId={comment.Id}
              id={goalId}
              name={comment.PersonName}
              message={comment.Message}
              date={comment.CreatedOnDate}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Comments;