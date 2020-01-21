import React from 'react';
import useRouter from 'utils/useRouter';
import { Journal as JournalType } from 'store/journey';

import { makeStyles } from '@material-ui/styles';
import { Divider, IconButton, Paper } from '@material-ui/core';

import { Comment } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0 50px'
  },
  divider: {
    border: '1px solid #B3B3B3'
  },
  dayText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B3B3B3',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginBottom: '10px'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '154.5%',
    color: '#37474F'
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '15px 10px 20px'
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30px'
  },
  stepText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#F79221',
    marginLeft: '10px'
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    cursor: 'pointer'
  },
  footerContent: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '0 10px'
  },
  feelingImage: {
    width: '25px',
    height: '25px'
  }
}));

type Props = {
  journal: JournalType;
};

const Journal: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { journal } = props;
  const { history } = useRouter();

  return (
    <div className={classes.root}>
      <span className={classes.dayText}>{journal.date}</span>
      <Divider className={classes.divider} />
      <div className={classes.stepsContainer}>
        <div className={classes.stepContainer}>
          <img src="/images/journey/journal/flag_icon.svg" alt="" />
          <span className={classes.stepText}>+1</span>
        </div>
        <div className={classes.stepContainer}>
          <img src="/images/journey/journal/flag_icon.svg" alt="" />
          <span className={classes.stepText}>+2</span>
        </div>
      </div>
      <Paper style={{ borderRadius: '14px', padding: '10px' }} elevation={2}>
        <div
          className={classes.content}
          onClick={() => history.push('/journal')}>
          <span className={classes.title}>{journal.title}</span>
          <span className={classes.text}>{journal.journalText}</span>
        </div>
        <div className={classes.footerContent}>
          <div style={{ flexGrow: 1 }}>
            {journal.feeling === '1' && (
              <img
                src="/images/journey/feelings/1.svg"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.feeling === '2' && (
              <img
                src="/images/journey/feelings/2.svg"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.feeling === '3' && (
              <img
                src="/images/journey/feelings/3.svg"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.feeling === '4' && (
              <img
                src="/images/journey/feelings/4.svg"
                alt=""
                className={classes.feelingImage}
              />
            )}
            {journal.feeling === '5' && (
              <img
                src="/images/journey/feelings/5.svg"
                alt=""
                className={classes.feelingImage}
              />
            )}
          </div>
          <IconButton style={{ padding: '0', marginRight: '25px' }}>
            <Comment />
          </IconButton>
          <span className={classes.dayText}>{journal.time}</span>
        </div>
      </Paper>
    </div>
  );
};

export default Journal;
