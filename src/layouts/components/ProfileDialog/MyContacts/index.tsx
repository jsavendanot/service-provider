import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Divider } from '@material-ui/core';
import { Close, AddCircleOutline, Delete } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    width: '458px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  divider: {
    border: '1px solid #C57D7D',
    margin: '5px 0'
  },
  note: {
    padding: '15px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  addText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#C57D7D'
  },
  phoneContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0'
  },
  contact: {
    padding: '10px 20px',
    margin: '10px 0',
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700
  },
  nameText: {
    fontSize: '18px',
    lineHeight: '2px',
    color: '#C57D7D',
    margin: '5px 0'
  },
  phoneText: {
    fontSize: '30px',
    lineHeight: '35px',
    color: '#692B40'
  }
}));

type Props = {
  close: () => void;
};
export const MyContacts: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container alignItems="center">
          <div className={classes.title} style={{ flexGrow: 1 }}>
            My contacts
          </div>
          <div>
            <IconButton onClick={close}>
              <Close style={{ fill: '#C57D7D' }} />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.note}>
            Add contacts here and suggest them to your consumer’s Safety Plan.
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.contact}>
            <div className={classes.nameText}>Dr Marlee</div>
            <div className={classes.phoneContainer}>
              <div className={classes.phoneText} style={{ flexGrow: 1 }}>
                9090909090
              </div>
              <IconButton>
                <Delete style={{ fill: '#C57D7D' }} />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} container alignItems="center" justify="center">
          <IconButton>
            <AddCircleOutline style={{ fill: '#C57D7D' }} />
          </IconButton>
          <span className={classes.addText}>Add</span>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyContacts;
