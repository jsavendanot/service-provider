import React, { useState } from 'react';
import {
  Theme,
  Card,
  CardContent,
  IconButton,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Invitation } from 'types/network';
import { KeyboardArrowDown, DeleteOutline, Send } from '@material-ui/icons';
import clsx from 'clsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { SubmitConfirmation } from 'common/components';
import { sendInvitation } from 'slices/invitation/action';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: '11px',
    margin: '15px 0',
    [theme.breakpoints.up('xs')]: {
      width: '95%',
      height: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '600px',
      minHeight: '70px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '450px',
      minHeight: '70px'
    }
  },
  networkBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px'
  },
  summaryContainer: {
    width: '80%'
  },
  iconRotate: {
    transform: 'rotate(180deg)'
  },
  emailText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    textAlign: 'left',
    margin: '5px 0 10px 0',
    width: '100%',
    wordWrap: 'break-word'
  },
  sentText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '129.69%',
    color: '#B3B3B3',
    textAlign: 'left',
    margin: '5px 0'
  },
  buttonContainer: {
    paddingTop: '20px',
    borderTop: '1px solid #EBEBEB',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '5px 0 10px'
  },
  buttonDelete: {
    padding: '5px 10px',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '33px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  buttonResend: {
    padding: '5px 10px',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '33px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  }
}));

type Props = {
  invitation: Invitation;
};

export const PendingCard: React.FC<Props> = ({ invitation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [more, setMore] = useState(false);

  /** Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleClickOpen() {
    setOpenConfirm(true);
  }

  function handleClose() {
    setOpenConfirm(false);
  }

  const resendEmailHandler = () => {
    dispatch(sendInvitation(invitation));
  };

  const confirmDialog = (
    <SubmitConfirmation
      open={openConfirm}
      close={handleClose}
      action={resendEmailHandler}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        resend email invitation?
      </span>
    </SubmitConfirmation>
  );

  return (
    <>
      <Card className={classes.card}>
        <CardContent style={{ padding: '0', height: '100%' }}>
          <div className={classes.networkBox}>
            <div
              className={classes.summaryContainer}
              onClick={() => setMore(value => !value)}>
              <div className={classes.emailText}>{invitation.EmailAddress}</div>
              <div className={classes.sentText}>
                {`Invitation sent on ${moment(invitation.CreatedOn).format(
                  'DD MMM YYYY'
                )}`}
              </div>
            </div>
            <IconButton onClick={() => setMore(value => !value)}>
              <KeyboardArrowDown
                fontSize="large"
                className={clsx(more && classes.iconRotate)}
              />
            </IconButton>
          </div>
          {more && (
            <div className={classes.buttonContainer}>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                <Button className={classes.buttonDelete}>
                  <DeleteOutline
                    style={{ fill: '#C57D7D', marginRight: '5px' }}
                  />
                  Delete
                </Button>
              </div>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                <Button
                  className={classes.buttonResend}
                  onClick={handleClickOpen}>
                  <Send style={{ fill: '#C57D7D', marginRight: '10px' }} />
                  Resend
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {openConfirm && confirmDialog}
    </>
  );
};

export default PendingCard;
