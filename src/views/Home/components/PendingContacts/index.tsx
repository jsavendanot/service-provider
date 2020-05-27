import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Invitation } from 'types/network';
import PendingCard from './PendingCard';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 0'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  divider: {
    background: '#37474F',
    border: ' 1px solid #EBEBEB',
    margin: '10px 0 20px 0'
  }
}));

type Props = {
  invitations: Invitation[];
};

export const PendingContacts: React.FC<Props> = ({ invitations }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={9} md={9} lg={10}>
          <span className={classes.title}>Pending connections</span>
          <Divider className={classes.divider} />
        </Grid>
        {invitations.map(invitation => {
          return (
            <Grid
              item
              xs={12}
              container
              justify="center"
              style={{ alignSelf: 'flex-start' }}
              key={invitation.InvitationId}>
              <PendingCard invitation={invitation} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PendingContacts;
